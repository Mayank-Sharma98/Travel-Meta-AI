import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Compass } from 'lucide-react';
import { api } from '../api/client';

// One sessionId per browser tab/load, so the backend can keep short conversational context.
const sessionId = (() => {
  const existing = sessionStorage.getItem('travelmate_chat_session');
  if (existing) return existing;
  const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  sessionStorage.setItem('travelmate_chat_session', id);
  return id;
})();

export const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! 🙏 I am your TravelMate AI assistant. Ask me about Indian hidden gems, weekend budget trips, local food, or travel advice!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await api.post('/chat', { message: userText, sessionId });
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      // This only triggers if the backend itself is unreachable (e.g. server not running).
      // Normal AI hiccups are already handled gracefully on the backend and never reach here.
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "I couldn't reach the TravelMate server. Please make sure the backend is running and try again." }
      ]);
      console.error('Chat error details:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const sampleQuestions = [
    'What can I explore in Jharkhand?',
    '3-day budget plan for Udaipur?',
    'Top experiences in Munnar, Kerala?',
    'How should I budget my next trip?'
  ];

  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Bot size={14} color="#e9b75e" />
            <span>AI Travel Assistant</span>
          </div>
          <h1>Ask TravelMate Anything</h1>
          <p>
            Get instant local tips, packing suggestions, regional cuisine highlights, and custom recommendations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          
          {/* Quick chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q);
                }}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--forest-200)',
                  color: 'var(--forest-800)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'var(--transition-fast)'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Window Container */}
          <div className="info-box" style={{ height: '520px', display: 'flex', flexDirection: 'column', padding: '24px', boxShadow: 'var(--shadow-xl)' }}>
            
            {/* Messages Scroll Area */}
            <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '6px', marginBottom: '16px' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  {m.sender === 'bot' && (
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'var(--forest-100)', color: 'var(--forest-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={18} />
                    </div>
                  )}

                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: '16px',
                      background: m.sender === 'user' ? 'var(--forest-800)' : 'var(--sand-100)',
                      color: m.sender === 'user' ? 'var(--white)' : 'var(--ink-900)',
                      fontSize: '0.94rem',
                      lineHeight: '1.5',
                      boxShadow: 'var(--shadow-sm)',
                      borderBottomRightRadius: m.sender === 'user' ? '4px' : '16px',
                      borderBottomLeftRadius: m.sender === 'bot' ? '4px' : '16px'
                    }}
                  >
                    {m.text}
                  </div>

                  {m.sender === 'user' && (
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'var(--gold-400)', color: 'var(--forest-950)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <User size={18} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'var(--forest-100)', color: 'var(--forest-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={18} />
                  </div>
                  <div style={{ padding: '12px 18px', background: 'var(--sand-100)', borderRadius: '16px', color: 'var(--ink-500)', fontSize: '0.85rem' }}>
                    TravelMate AI is thinking...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Ask about a destination, food, budget, or safety..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: '12px 16px' }}
              />
              <button type="submit" className="btn btn-forest" style={{ padding: '0 20px' }}>
                <Send size={18} />
              </button>
            </form>

          </div>
        </div>
      </section>
    </div>
  );
};
