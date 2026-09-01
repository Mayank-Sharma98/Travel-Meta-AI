import express from 'express';
import { query } from '../config/db.js';
import { optionalAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

export const generateItinerary = (data) => {
  const { start = 'Home', destination = 'India', days = 3, travelers = 1, budget = 5000, preference = 'Sightseeing', food_preference = 'Regional Specialities' } = data;

  const numDays = Math.min(Math.max(parseInt(days) || 3, 1), 14);
  const numTravelers = Math.max(parseInt(travelers) || 1, 1);
  const totalBudget = Math.max(parseInt(budget) || 5000, 1000);
  const dailyBudget = Math.floor(totalBudget / numDays);

  const itineraryDays = [];
  const focusTemplates = [
    'Arrival, landmark walk, old quarter stroll & local evening market',
    'Signature heritage monuments, scenic viewpoints & authentic sunset experience',
    'Hidden scenic trails, spiritual hubs & cultural artisan village workshop',
    'Adventure excursions, water/mountain outdoor activities & bonfire dinner',
    'Slow mornings, café hopping, souvenir hunting & peaceful departure'
  ];

  for (let i = 1; i <= numDays; i++) {
    const focusIndex = (i - 1) % focusTemplates.length;
    const focus = focusTemplates[focusIndex];

    itineraryDays.push({
      number: i,
      title: `Day ${i}: ${i === 1 ? 'Arrival & Discovery' : i === numDays ? 'Farewell & Return' : 'Deep Exploration'}`,
      focus,
      time: '08:30 AM – 07:30 PM',
      morning: `Explore key iconic spots of ${destination} & morning breakfast walk`,
      afternoon: `Visit local cultural hubs, artisan markets & regional lunch stop`,
      evening: `Sunset viewpoint, street food tasting & authentic leisure time`,
      food: food_preference || 'Regional thali & local snacks',
      cost: dailyBudget,
      stay_recommendation: 'Eco-certified verified homestay / boutique hotel'
    });
  }

  return {
    destination,
    start,
    days: itineraryDays,
    total_days: numDays,
    travelers: numTravelers,
    total: `₹${totalBudget.toLocaleString('en-IN')}`,
    total_cost: totalBudget,
    distance: 'Approx. 180–350 km (scenic route)',
    transport: 'Train, electric bus, or verified shared cab',
    preference,
    tips: [
      'Book verified eco-stays in advance before arrival.',
      'Keep government ID and emergency contact numbers offline.',
      'Respect regional traditions, local heritage, and avoid single-use plastic.',
      'Carry refillable water bottles and keep cash handy for village markets.'
    ]
  };
};

// POST /api/planner
router.post('/', optionalAuthMiddleware, async (req, res) => {
  try {
    const { start, destination, days, travelers, budget, preference, food_preference, saveToTrips } = req.body;

    if (!destination) {
      return res.status(400).json({ error: 'Destination is required.' });
    }

    const plan = generateItinerary({
      start,
      destination,
      days: parseInt(days) || 3,
      travelers: parseInt(travelers) || 1,
      budget: parseInt(budget) || 5000,
      preference,
      food_preference
    });

    // If user is authenticated and saveToTrips is true, save in SQLite
    let savedTripId = null;
    if (req.user && (saveToTrips === true || saveToTrips === 'true')) {
      const itinerarySummary = plan.days.map((d) => `Day ${d.number}: ${d.focus}`).join('\n');
      const tripRes = await query.run(
        `INSERT INTO trips (user_id, destination, days, travelers, budget, itinerary)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.id, destination, plan.total_days, plan.travelers, plan.total_cost, itinerarySummary]
      );
      savedTripId = tripRes.lastID;
    }

    res.json({ plan, savedTripId });
  } catch (err) {
    console.error('Planner error:', err);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

export default router;
