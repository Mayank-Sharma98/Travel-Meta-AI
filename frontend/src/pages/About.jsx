import React from 'react';
import { Compass, Sparkles, Shield, Leaf, Heart, Code2, Database, Layers } from 'lucide-react';

export const About = () => {
  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Compass size={14} color="#e9b75e" />
            <span>About The Project</span>
          </div>
          <h1>One thoughtful place to plan Indian travel.</h1>
          <p>
            TravelMate AI was created to simplify fragmented tourism research into an intuitive, AI-guided experience designed specifically for India.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '18px' }}>Why TravelMate AI?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--ink-700)', lineHeight: '1.7', marginBottom: '16px' }}>
              Most travellers juggle 10 different tabs for train timings, blog posts, hotel reviews, and budget calculations. TravelMate AI brings discovery, maps, AI-generated day-by-day itineraries, live cost estimators, emergency SOS reminders, and responsible tourism scores into a unified platform.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            
            <div className="info-box">
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--forest-100)', color: 'var(--forest-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Leaf size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Our Mission</h3>
              <p style={{ color: 'var(--ink-500)', fontSize: '0.92rem' }}>
                Make Indian travel more accessible, safe, and culturally sustainable while empowering local indigenous economies.
              </p>
            </div>

            <div className="info-box">
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--gold-100)', color: 'var(--gold-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Layers size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Modern Stack</h3>
              <p style={{ color: 'var(--ink-500)', fontSize: '0.92rem' }}>
                React SPA, Node.js + Express backend, SQLite with fast queries, JWT security, Leaflet open-mapping, and Vite tooling.
              </p>
            </div>

            <div className="info-box">
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--forest-100)', color: 'var(--forest-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Safety & Privacy</h3>
              <p style={{ color: 'var(--ink-500)', fontSize: '0.92rem' }}>
                Zero tracking, privacy-preserving local AI fallback models, and seamless offline accessibility when roaming.
              </p>
            </div>

          </div>

          <div className="info-box" style={{ background: 'var(--forest-50)', border: '1px solid var(--forest-100)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--forest-950)' }}>
              Built for Hackathons & Real-World Scale
            </h3>
            <p style={{ color: 'var(--ink-700)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              The architecture features a decoupled service layer that allows plugging in live LLM APIs, Weather APIs, and OpenStreetMap layers without frontend refactoring.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
