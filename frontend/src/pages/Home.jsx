import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DestinationCard } from '../components/DestinationCard';
import { api } from '../api/client';
import {
  Sparkles,
  ArrowRight,
  Leaf,
  ShieldCheck,
  MapPin,
  Route,
  Wallet,
  Map as MapIcon,
  ShieldAlert,
  Star,
  CheckCircle2,
  ChevronDown,
  CloudSun,
  Droplets,
  Wind,
  Globe2,
  Utensils
} from 'lucide-react';

export const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await api.get('/destinations?limit=4');
        setDestinations(data.destinations || []);
      } catch (err) {
        console.error('Failed to load featured destinations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const faqs = [
    {
      q: 'Do I need an account to plan a trip?',
      a: 'No. You can build and preview a complete day-wise itinerary without signing in. Create a free account only when you want to save it to My Trips dashboard.'
    },
    {
      q: 'Is TravelMate AI free to use?',
      a: 'Yes! TravelMate AI is a 100% free open platform. Planning, budgeting, and exploring destinations does not require any payment or subscription.'
    },
    {
      q: 'How does the AI itinerary work?',
      a: 'Our smart algorithm calculates realistic day-wise time allocations, food stops, heritage walking routes, and budget estimates tailored to your travel style.'
    },
    {
      q: 'Can I use the Safety Companion for any destination in India?',
      a: 'Yes. The Safety Companion provides national helplines (112, 100, 108), essential safety checklists, and offline emergency guidance wherever you travel.'
    }
  ];

  return (
    <div>
      {/* Hero Section with Generated Panoramic Banner */}
      <section
        className="hero"
        style={{ backgroundImage: `url('/images/hero_bg.jpg')` }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow eyebrow-light">
              <Sparkles size={14} color="#e9b75e" />
              <span>India, Intelligently Explored</span>
            </div>

            <h1>
              Explore more. <br />
              <span>Travel smarter.</span>
            </h1>

            <p>
              Plan meaningful Indian journeys with AI-powered itineraries, smart budgets, verified local experiences, and safety-first travel guidance.
            </p>

            <div className="hero-actions">
              <Link to="/planner" className="btn btn-gold btn-lg">
                <Sparkles size={18} />
                <span>Plan My Trip Free</span>
              </Link>
              <Link to="/explore" className="btn btn-outline-light btn-lg">
                <span>Explore Destinations</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="hero-trust">
              <span>
                <Leaf size={18} color="#10b981" />
                Responsible Tourism
              </span>
              <span>
                <ShieldCheck size={18} color="#e9b75e" />
                Safety-Aware Planning
              </span>
              <span>
                <MapPin size={18} color="#10b981" />
                India-First Discovery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Panel */}
      <section className="quick-actions-bar">
        <div className="container">
          <div className="quick-actions-panel">
            <Link to="/planner" className="quick-action-item">
              <div className="quick-action-icon">
                <Route size={24} />
              </div>
              <div className="quick-action-text">
                <b>AI Itinerary</b>
                <small>Build a day-by-day travel plan</small>
              </div>
            </Link>

            <Link to="/budget" className="quick-action-item">
              <div className="quick-action-icon">
                <Wallet size={24} />
              </div>
              <div className="quick-action-text">
                <b>Budget Calculator</b>
                <small>Plan every rupee confidently</small>
              </div>
            </Link>

            <Link to="/map" className="quick-action-item">
              <div className="quick-action-icon">
                <MapIcon size={24} />
              </div>
              <div className="quick-action-text">
                <b>Interactive Map</b>
                <small>Explore destinations visually</small>
              </div>
            </Link>

            <Link to="/safety" className="quick-action-item">
              <div className="quick-action-icon">
                <ShieldAlert size={24} />
              </div>
              <div className="quick-action-text">
                <b>Safety Companion</b>
                <small>Emergency SOS & offline tips</small>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading text-center">
            <div className="eyebrow">How TravelMate Works</div>
            <h2>Three steps to your next trip</h2>
            <p>No messy spreadsheets or 20 open browser tabs. Just choose where you want to go and let the planner handle the rest.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="info-box" style={{ position: 'relative', overflow: 'hidden' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--forest-100)', position: 'absolute', top: '16px', right: '20px', lineHeight: 1 }}>01</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--forest-100)', color: 'var(--forest-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Tell us your trip</h3>
              <p style={{ color: 'var(--ink-500)', fontSize: '0.95rem' }}>
                Pick your destination, dates, travel style (Adventure, Food, Culture, or Relaxation), and available budget.
              </p>
            </div>

            <div className="info-box" style={{ position: 'relative', overflow: 'hidden' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--forest-100)', position: 'absolute', top: '16px', right: '20px', lineHeight: 1 }}>02</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-100)', color: 'var(--gold-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Get an instant plan</h3>
              <p style={{ color: 'var(--ink-500)', fontSize: '0.95rem' }}>
                Our algorithm creates a day-wise itinerary with morning/evening activities, food stops, timing, and realistic cost breakdown.
              </p>
            </div>

            <div className="info-box" style={{ position: 'relative', overflow: 'hidden' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--forest-100)', position: 'absolute', top: '16px', right: '20px', lineHeight: 1 }}>03</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--forest-100)', color: 'var(--forest-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Save and travel</h3>
              <p style={{ color: 'var(--ink-500)', fontSize: '0.95rem' }}>
                Save your plan to My Trips, check local live weather, track your expenses, and explore with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section section-sand">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div>
              <div className="eyebrow">Curated for You</div>
              <h2>Popular escapes, made effortless</h2>
              <p style={{ color: 'var(--ink-500)', maxWidth: '540px' }}>
                From peaceful hill mornings in Netarhat to golden beaches in Puri, discover hand-picked places for your next getaway.
              </p>
            </div>
            <Link to="/explore" className="btn btn-outline-forest">
              <span>View all destinations</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #d0ded6', borderTopColor: '#103b2d', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              <p style={{ color: 'var(--ink-500)' }}>Loading destinations...</p>
            </div>
          ) : (
            <div className="destination-grid">
              {destinations.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="section section-forest">
        <div className="container">
          <div className="section-heading text-center">
            <div className="eyebrow eyebrow-light">Hackathon Impact Dashboard</div>
            <h2 style={{ color: 'var(--white)' }}>Everything a better trip needs, in one place</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>
              Built to demonstrate the comprehensive scope and depth of an intelligent Indian travel ecosystem.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', padding: '32px 20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Globe2 size={36} color="#e9b75e" style={{ margin: '0 auto 14px' }} />
              <strong style={{ display: 'block', fontSize: '2.4rem', color: 'var(--white)', fontFamily: 'var(--font-ui)' }}>50+</strong>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem' }}>Curated Destinations</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', padding: '32px 20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Utensils size={36} color="#10b981" style={{ margin: '0 auto 14px' }} />
              <strong style={{ display: 'block', fontSize: '2.4rem', color: 'var(--white)', fontFamily: 'var(--font-ui)' }}>100+</strong>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem' }}>Local Food & Stays</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', padding: '32px 20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Sparkles size={36} color="#e9b75e" style={{ margin: '0 auto 14px' }} />
              <strong style={{ display: 'block', fontSize: '2.4rem', color: 'var(--white)', fontFamily: 'var(--font-ui)' }}>AI</strong>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem' }}>Smart Trip Planning</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', padding: '32px 20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ShieldCheck size={36} color="#10b981" style={{ margin: '0 auto 14px' }} />
              <strong style={{ display: 'block', fontSize: '2.4rem', color: 'var(--white)', fontFamily: 'var(--font-ui)' }}>Safe</strong>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem' }}>24/7 Travel Assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Live Weather Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            <div style={{ background: 'linear-gradient(135deg, var(--forest-900) 0%, var(--forest-800) 100%)', color: 'var(--white)', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="eyebrow eyebrow-light">Go Beyond The Checklist</div>
                <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '16px' }}>Travel deeper, leave lighter.</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
                  Discover authentic regional cuisines, indigenous handicrafts, secret waterfalls, and eco-friendly home stays that directly empower local communities.
                </p>
              </div>
              <Link to="/explore" className="btn btn-gold" style={{ alignSelf: 'flex-start' }}>
                <Sparkles size={16} />
                <span>Discover Hidden Gems</span>
              </Link>
            </div>

            <div className="info-box" style={{ background: 'var(--forest-50)', border: '1.5px solid var(--forest-100)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div className="eyebrow">Demo Live Weather</div>
                  <h3 style={{ fontSize: '1.5rem' }}>Today in Netarhat, JH</h3>
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e9b75e', boxShadow: 'var(--shadow-sm)' }}>
                  <CloudSun size={28} />
                </div>
              </div>

              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--forest-950)', fontFamily: 'var(--font-ui)', lineHeight: 1, marginBottom: '8px' }}>
                22°C
              </div>
              <p style={{ color: 'var(--forest-700)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '20px' }}>
                Pleasant & Breezy · Optimal sunset viewing
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--forest-200)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-700)', fontSize: '0.92rem' }}>
                  <Droplets size={18} color="#185b43" />
                  <span>Humidity: <b>55%</b></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-700)', fontSize: '0.92rem' }}>
                  <Wind size={18} color="#185b43" />
                  <span>Wind: <b>10 km/h</b></span>
                </div>
              </div>

              <small style={{ color: 'var(--ink-500)', fontSize: '0.8rem', display: 'block' }}>
                💡 Weather service fallback layer automatically updates conditions for any selected destination.
              </small>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-sand">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            <div>
              <div className="eyebrow">Good to know</div>
              <h2>Frequently asked questions</h2>
              <p style={{ color: 'var(--ink-500)', marginTop: '12px', marginBottom: '24px' }}>
                Need help planning your trip or have questions about how our AI and budgets work? We've got you covered.
              </p>
              <Link to="/contact" className="btn btn-forest">
                <span>Have more questions? Contact Us</span>
              </Link>
            </div>

            <div>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="info-box"
                  style={{ marginBottom: '12px', padding: '20px 24px', cursor: 'pointer', transition: 'var(--transition-fast)' }}
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--forest-950)' }}>{faq.q}</h4>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: activeFaq === index ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease',
                        color: 'var(--forest-700)',
                        flexShrink: 0
                      }}
                    />
                  </div>
                  {activeFaq === index && (
                    <p style={{ color: 'var(--ink-500)', fontSize: '0.95rem', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--ink-100)', lineHeight: '1.6' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--forest-950) 0%, var(--forest-800) 100%)', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="eyebrow eyebrow-light">The journey starts here</div>
          <h2 style={{ color: 'var(--white)', fontSize: '2.6rem', marginBottom: '16px' }}>Less scrolling. More exploring.</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', marginBottom: '32px' }}>
            Build your personalized Indian itinerary in seconds with a smarter, safer, and budget-friendly companion.
          </p>
          <Link to="/signup" className="btn btn-gold btn-lg">
            <span>Start Planning Free</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
};
