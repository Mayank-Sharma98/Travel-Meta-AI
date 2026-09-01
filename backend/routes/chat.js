import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

const DEEPSEEK_API_URL = process.env.AI_API_URL || 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = process.env.AI_MODEL || 'deepseek-chat';
const AI_TIMEOUT_MS = 15000;

const SYSTEM_PROMPT = `You are TravelMate AI, a friendly and knowledgeable travel assistant built into the TravelMate AI website.
The website helps people plan trips within India — it has an Explore page (browse destinations), an AI Planner (auto-generates day-by-day itineraries), a Map page, a Budget calculator, a Safety tips page, and this Chatbot.
Give practical, concise, and helpful answers about destinations, budgets, itineraries, local food, safety tips, eco-friendly travel, and about the website's own features when asked.
Keep replies warm, conversational, and reasonably short (a few sentences to a short paragraph, use bullet points when listing multiple items).
If asked about something completely unrelated to travel, gently steer the conversation back to travel while still being helpful.`;

// In-memory per-session chat history (keyed by a client-provided sessionId).
const sessionHistory = new Map();
const MAX_HISTORY_MESSAGES = 12;

function getHistory(sessionId) {
  if (!sessionId) return [];
  if (!sessionHistory.has(sessionId)) {
    sessionHistory.set(sessionId, []);
  }
  return sessionHistory.get(sessionId);
}

async function callDeepSeek(messages) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 500
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek API ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error('DeepSeek API returned an empty response.');
    return reply;
  } finally {
    clearTimeout(timeout);
  }
}

// ---------- Local knowledge-based fallback (used if the AI API is unreachable / out of credit) ----------

const WEBSITE_INFO = {
  explore: 'The Explore page lets you browse curated Indian destinations by state, category (Nature, Historical, Cultural, Eco Tourism, Hidden Gems...), budget, and eco-rating.',
  planner: 'The AI Planner auto-generates a day-by-day itinerary — just enter your start point, destination, number of days, travelers, and budget, and it builds a full plan with daily focus areas, food suggestions, and cost breakdowns. You can save trips to your profile if you are logged in.',
  map: 'The Map page shows destinations pinned on an interactive map so you can see how far places are from each other.',
  budget: 'The Budget page/tool helps you estimate trip costs — a good rule of thumb is roughly 35% stays, 25% transport, 20% food, 10% activities, and 10% kept as an emergency buffer.',
  safety: 'The Safety page has region-specific travel safety tips, emergency numbers, and advice for solo and first-time travelers in India.',
  chatbot: "That's me! I can answer questions about destinations, budgets, itineraries, food, and safety, right here in the chat.",
  general: 'TravelMate AI is a travel-planning platform for exploring Indian destinations, building AI-assisted itineraries, checking budgets, viewing places on a map, and getting safety tips — all in one place.'
};

async function getDestinationMatches(lowerQuery) {
  try {
    const destinations = await query.all('SELECT name, state, category, description, budget, best_time, eco_score FROM destinations');
    return destinations.filter((d) =>
      lowerQuery.includes(d.name.toLowerCase()) || lowerQuery.includes(d.state.toLowerCase())
    );
  } catch (err) {
    console.error('Fallback DB lookup failed:', err.message);
    return [];
  }
}

async function generateFallbackAnswer(originalQuery) {
  const q = originalQuery.toLowerCase();

  // Greetings first
  if (/^(hi|hello|hey|namaste|yo)\b/.test(q.trim())) {
    return 'Namaste! 🙏 Ask me about any Indian destination, a trip budget, an itinerary idea, or safety tips — I am happy to help!';
  }

  // Destination-specific answers using live DB data take priority over generic feature keywords
  const matches = await getDestinationMatches(q);
  if (matches.length > 0) {
    return matches
      .slice(0, 3)
      .map((d) => `**${d.name}, ${d.state}** (${d.category}) — ${d.description} Best time to visit: ${d.best_time}. Typical budget: ₹${d.budget.toLocaleString('en-IN')}. Eco-score: ${d.eco_score}/100.`)
      .join('\n\n');
  }

  // Website / feature questions
  if (q.includes('ai planner') || q.includes('itinerary')) return WEBSITE_INFO.planner;
  if (q.includes('map page') || q === 'map' || q.includes('the map')) return WEBSITE_INFO.map;
  if (q.includes('safety') || q.includes('safe ')) return WEBSITE_INFO.safety;
  if (q.includes('explore page') || q.includes('browse destinations')) return WEBSITE_INFO.explore;
  if (q.includes('chatbot') || q.includes('who are you') || q.includes('what can you do')) return WEBSITE_INFO.chatbot;
  if (q.includes('what is travelmate') || q.includes('about this website') || q.includes('about travelmate') || q.includes('what is this website')) {
    return WEBSITE_INFO.general;
  }

  // Budget questions
  if (q.includes('budget') || q.includes('cost') || q.includes('money') || q.includes('cheap')) {
    return WEBSITE_INFO.budget;
  }

  // Generic helpful fallback
  return `For "${originalQuery}", I would suggest planning 3–4 days with a balanced budget of ₹2,500–₹4,000/day. Choose verified eco-homestays, explore local markets, and try the region's signature dishes. You can also try the AI Planner page for a full custom itinerary, or ask me about a specific state or city!`;
}

// POST /api/chat
router.post('/', async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const trimmedMessage = message.trim();
  const history = getHistory(sessionId);
  let reply;
  let source = 'ai';

  try {
    if (!process.env.AI_API_KEY) {
      throw new Error('AI_API_KEY is not configured.');
    }
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: trimmedMessage }
    ];
    reply = await callDeepSeek(messages);
  } catch (err) {
    // Never surface this to the user — log it server-side and fall back gracefully.
    console.error('AI service unavailable, using local fallback:', err.message);
    source = 'fallback';
    reply = await generateFallbackAnswer(trimmedMessage);
  }

  // Update session history (only meaningful for real AI turns, but harmless either way)
  if (sessionId) {
    history.push({ role: 'user', content: trimmedMessage });
    history.push({ role: 'assistant', content: reply });
    while (history.length > MAX_HISTORY_MESSAGES) {
      history.shift();
    }
    sessionHistory.set(sessionId, history);
  }

  res.json({ reply, source });
});

export default router;

