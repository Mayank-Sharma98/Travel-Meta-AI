import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  CheckCircle2,
  Share2,
  Printer,
  Heart,
  CloudSun,
  ChevronDown,
  ArrowRight,
  Clock,
  UtensilsCrossed
} from 'lucide-react';

export const Planner = () => {
  const [searchParams] = useSearchParams();
  const initialDest = searchParams.get('destination') || '';
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start: 'Ranchi',
    destination: initialDest || 'Netarhat',
    days: 3,
    travelers: 2,
    budget: 8000,
    preference: 'Nature & Scenic Viewpoints',
    food_preference: 'Regional thali & local snacks'
  });

  const [activeStyle, setActiveStyle] = useState('adventure');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [expandedDays, setExpandedDays] = useState({ 1: true });
  const [saveStatus, setSaveStatus] = useState('');

  const travelStyles = [
    { id: 'adventure', label: '🏔️ Adventure', defaultDest: 'Manali, HP', pref: 'Trekking & Mountain Trails' },
    { id: 'relaxation', label: '🧘 Relaxation', defaultDest: 'Munnar, Kerala', pref: 'Tea Hills & Ayurvedic Retreat' },
    { id: 'culture', label: '🏛️ Heritage', defaultDest: 'Udaipur, Rajasthan', pref: 'Palaces, Forts & Folk Music' },
    { id: 'food', label: '🍜 Culinary', defaultDest: 'Puri, Odisha', pref: 'Coastal Seafood & Temple Sweets' },
  ];

  const handleStyleChange = (style) => {
    setActiveStyle(style.id);
    setFormData((prev) => ({
      ...prev,
      destination: style.defaultDest,
      preference: style.pref
    }));
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSaveStatus('');
    try {
      const res = await api.post('/planner', {
        ...formData,
        saveToTrips: false
      });
      setPlan(res.plan);
      // expand all days by default
      const exp = {};
      res.plan.days.forEach((d) => (exp[d.number] = true));
      setExpandedDays(exp);
    } catch (err) {
      console.error('Failed to generate plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/planner' } } });
      return;
    }

    try {
      const itinerarySummary = plan.days.map((d) => `Day ${d.number}: ${d.focus}`).join('\n');
      await api.post('/trips', {
        destination: plan.destination,
        days: plan.total_days,
        travelers: plan.travelers,
        budget: plan.total_cost,
        itinerary: itinerarySummary
      });
      setSaveStatus('✅ Saved to your My Trips dashboard!');
    } catch (err) {
      setSaveStatus('❌ Failed to save trip. Please try again.');
    }
  };

  // Generate an initial plan on first load
  useEffect(() => {
    handleGenerate();
  }, []);

  const toggleDay = (num) => {
    setExpandedDays((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Sparkles size={14} color="#e9b75e" />
            <span>AI Travel Designer</span>
          </div>
          <h1>Plan your journey effortlessly</h1>
          <p>
            Tell us your destination, travel party, and budget. Our smart planner creates an authentic, day-wise Indian travel itinerary in seconds.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.9fr)', gap: '40px', alignItems: 'start' }}>
            
            {/* Left Column: Form & Presets */}
            <div>
              <div className="info-box" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={20} color="#185b43" />
                  <span>Trip Parameters</span>
                </h3>

                {/* Travel Styles */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Travel Style Mood</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {travelStyles.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleStyleChange(s)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: activeStyle === s.id ? '1.5px solid var(--forest-800)' : '1px solid var(--ink-200)',
                          background: activeStyle === s.id ? 'var(--forest-100)' : 'var(--white)',
                          color: activeStyle === s.id ? 'var(--forest-950)' : 'var(--ink-700)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleGenerate}>
                  <div className="form-group">
                    <label className="form-label">Starting Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.start}
                      onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                      placeholder="e.g. New Delhi, Bengaluru, Ranchi"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Destination</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Darjeeling, Munnar, Udaipur"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Duration (Days)</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="14"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Travelers</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="20"
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Total Budget (₹ INR)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1000"
                      step="500"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Main Focus</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.preference}
                      onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                      placeholder="e.g. Scenic trails, temples, cafés"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Food Preference</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.food_preference}
                      onChange={(e) => setFormData({ ...formData, food_preference: e.target.value })}
                      placeholder="e.g. Pure Vegetarian, Street food, Regional Thali"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-forest w-100 btn-lg"
                    disabled={loading}
                    style={{ width: '100%', marginTop: '10px' }}
                  >
                    {loading ? (
                      <span>Crafting Itinerary...</span>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>Generate Itinerary</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Presets */}
                <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--ink-100)' }}>
                  <small style={{ color: 'var(--ink-500)', display: 'block', marginBottom: '10px', fontWeight: 600 }}>
                    ⚡ Popular Quick Presets:
                  </small>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      { name: '🏕️ Netarhat Sunset (2 Days)', d: 'Netarhat', days: 2, b: 5000 },
                      { name: '🌊 Puri Beach & Temple (3 Days)', d: 'Puri', days: 3, b: 8000 },
                      { name: '🏔️ Munnar Tea Trails (4 Days)', d: 'Munnar', days: 4, b: 14000 },
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, destination: p.d, days: p.days, budget: p.b }));
                        }}
                        style={{
                          background: 'var(--sand-100)',
                          border: '1px solid var(--ink-200)',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          color: 'var(--forest-950)'
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Itinerary Results */}
            <div>
              {loading ? (
                <div className="info-box" style={{ textAlign: 'center', padding: '80px 20px' }}>
                  <div style={{ width: '48px', height: '48px', border: '3px solid #d0ded6', borderTopColor: '#103b2d', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
                  <h3>Composing your customized trip...</h3>
                  <p style={{ color: 'var(--ink-500)', maxWidth: '400px', margin: '8px auto 0' }}>
                    Balancing travel timings, verified attraction stops, local food highlights, and budget estimates.
                  </p>
                </div>
              ) : plan ? (
                <div className="info-box" style={{ boxShadow: 'var(--shadow-xl)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--ink-100)' }}>
                    <div>
                      <div className="eyebrow">AI Generated Travel Plan</div>
                      <h2 style={{ fontSize: '2rem' }}>{plan.destination} in {plan.total_days} Days</h2>
                      <p style={{ color: 'var(--forest-700)', fontWeight: 600, fontSize: '0.95rem' }}>
                        {plan.distance} • Recommended Transport: {plan.transport}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>Total Estimated Cost</span>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--forest-950)', fontFamily: 'var(--font-ui)' }}>
                        {plan.total}
                      </div>
                      <small style={{ color: 'var(--ink-400)' }}>for {plan.travelers} traveler{plan.travelers > 1 ? 's' : ''}</small>
                    </div>
                  </div>

                  {/* Save Status alert */}
                  {saveStatus && (
                    <div style={{ padding: '12px 16px', background: saveStatus.includes('✅') ? 'var(--forest-100)' : 'var(--danger-light)', borderRadius: '10px', marginBottom: '20px', fontSize: '0.92rem', color: 'var(--forest-950)', fontWeight: 600 }}>
                      {saveStatus}
                    </div>
                  )}

                  {/* Day-by-Day Timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                    {plan.days.map((day) => (
                      <div
                        key={day.number}
                        style={{
                          background: 'var(--sand-50)',
                          borderRadius: '16px',
                          border: '1.5px solid var(--forest-100)',
                          overflow: 'hidden',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div
                          onClick={() => toggleDay(day.number)}
                          style={{
                            padding: '16px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            background: expandedDays[day.number] ? 'var(--forest-50)' : 'var(--sand-50)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--forest-800)', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                              0{day.number}
                            </span>
                            <div>
                              <h4 style={{ fontSize: '1.05rem', color: 'var(--forest-950)', margin: 0 }}>{day.title}</h4>
                              <small style={{ color: 'var(--ink-500)' }}>{day.focus}</small>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ background: 'var(--white)', border: '1px solid var(--ink-200)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--forest-800)' }}>
                              Est. ₹{day.cost.toLocaleString('en-IN')}
                            </span>
                            <ChevronDown
                              size={18}
                              style={{
                                transform: expandedDays[day.number] ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.3s ease',
                                color: 'var(--forest-700)'
                              }}
                            />
                          </div>
                        </div>

                        {expandedDays[day.number] && (
                          <div style={{ padding: '20px', borderTop: '1px solid var(--forest-100)', fontSize: '0.92rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <Clock size={16} color="#185b43" style={{ marginTop: '3px', flexShrink: 0 }} />
                              <div>
                                <b>Morning:</b> {day.morning}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <Compass size={16} color="#185b43" style={{ marginTop: '3px', flexShrink: 0 }} />
                              <div>
                                <b>Afternoon:</b> {day.afternoon}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <Sparkles size={16} color="#e9b75e" style={{ marginTop: '3px', flexShrink: 0 }} />
                              <div>
                                <b>Evening:</b> {day.evening}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', borderTop: '1px dashed var(--ink-200)', paddingTop: '10px', marginTop: '4px' }}>
                              <UtensilsCrossed size={16} color="#10b981" style={{ marginTop: '3px', flexShrink: 0 }} />
                              <div style={{ color: 'var(--ink-700)' }}>
                                <b>Recommended Food:</b> {day.food}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Travel Wisdom Tips */}
                  <div style={{ background: 'var(--forest-50)', padding: '20px', borderRadius: '16px', border: '1px solid var(--forest-100)', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--forest-950)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={18} color="#10b981" />
                      <span>Travel Wisely & Responsibly</span>
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--ink-700)' }}>
                      {plan.tips.map((tip, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#10b981' }}>✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={handleSaveTrip} className="btn btn-forest btn-lg">
                      <Heart size={18} />
                      <span>Save Itinerary in My Trips</span>
                    </button>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="btn btn-outline-forest btn-sm"
                      >
                        <Printer size={16} />
                        <span>Print</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({ title: `${plan.destination} Itinerary`, text: `Check out my ${plan.total_days}-day trip to ${plan.destination}!` });
                          } else {
                            alert('Itinerary link copied to clipboard!');
                          }
                        }}
                        className="btn btn-outline-forest btn-sm"
                      >
                        <Share2 size={16} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                </div>
              ) : null}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
