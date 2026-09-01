import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Shield, Sparkles, MapPin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ background: 'var(--forest-950)', color: 'rgba(255,255,255,0.85)', padding: '70px 0 30px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          <div>
            <div className="brand-logo" style={{ marginBottom: '16px' }}>
              <Compass size={28} color="#e9b75e" />
              <span>TravelMate <em>AI</em></span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
              Discover India thoughtfully. AI-assisted itineraries, verified stays, responsible tourism scores, and instant travel companionship.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px', color: 'var(--gold-400)' }}>
                🌿 Eco-First Tourism
              </span>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.05rem', marginBottom: '18px' }}>Explore India</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <li><Link to="/explore?category=Nature" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}>🏔️ Mountain Escapes</Link></li>
              <li><Link to="/explore?category=Historical" style={{ color: 'rgba(255,255,255,0.7)' }}>🏰 Heritage & Palaces</Link></li>
              <li><Link to="/explore?category=Eco%20Tourism" style={{ color: 'rgba(255,255,255,0.7)' }}>🍃 Eco Sanctuaries</Link></li>
              <li><Link to="/explore?category=Religious" style={{ color: 'rgba(255,255,255,0.7)' }}>🛕 Spiritual Journeys</Link></li>
              <li><Link to="/map" style={{ color: 'rgba(255,255,255,0.7)' }}>🗺️ Interactive Map</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.05rem', marginBottom: '18px' }}>AI Tools</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <li><Link to="/planner" style={{ color: 'rgba(255,255,255,0.7)' }}>✨ AI Trip Designer</Link></li>
              <li><Link to="/budget" style={{ color: 'rgba(255,255,255,0.7)' }}>💰 Smart Budget Calculator</Link></li>
              <li><Link to="/safety" style={{ color: 'rgba(255,255,255,0.7)' }}>🛡️ Safety Companion & SOS</Link></li>
              <li><Link to="/chat" style={{ color: 'rgba(255,255,255,0.7)' }}>💬 24/7 Travel Chatbot</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.05rem', marginBottom: '18px' }}>Company & Safety</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <li><Link to="/about" style={{ color: 'rgba(255,255,255,0.7)' }}>About TravelMate</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact Support</Link></li>
              <li><Link to="/safety" style={{ color: 'rgba(255,255,255,0.7)' }}>Emergency Guidelines</Link></li>
              <li><Link to="/signup" style={{ color: 'var(--gold-400)', fontWeight: '600' }}>Create Free Account →</Link></li>
            </ul>
          </div>

        </div>

        <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
          <p>© 2026 TravelMate AI. Built for mindful exploration across India.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/about" style={{ color: 'inherit' }}>Privacy</Link>
            <Link to="/about" style={{ color: 'inherit' }}>Terms</Link>
            <Link to="/contact" style={{ color: 'inherit' }}>Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
