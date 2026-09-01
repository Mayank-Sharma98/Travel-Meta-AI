import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  MapPin,
  Star,
  Calendar,
  Leaf,
  CloudSun,
  Droplets,
  Wind,
  Heart,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const DestinationDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/destinations/${id}`);
        setDestination(data.destination);
        setWeather(data.weather);
        setIsSaved(data.destination.is_saved || false);
      } catch (err) {
        console.error('Failed to load destination:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleSaveToggle = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/destination/${id}` } } });
      return;
    }

    setSaving(true);
    try {
      const res = await api.post(`/destinations/${id}/save`, {});
      setIsSaved(res.saved);
      setToastMsg(res.message);
      setTimeout(() => setToastMsg(''), 3500);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #d0ded6', borderTopColor: '#103b2d', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--ink-500)' }}>Unfolding destination details...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <h2>Destination not found</h2>
        <p style={{ color: 'var(--ink-500)', marginBottom: '24px' }}>The place you are looking for might have been moved or updated.</p>
        <Link to="/explore" className="btn btn-forest">Back to Explore</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Toast notification */}
      {toastMsg && (
        <div style={{ position: 'fixed', top: '90px', right: '24px', zIndex: 1100, background: 'var(--forest-900)', color: 'var(--white)', padding: '14px 20px', borderRadius: '12px', boxShadow: 'var(--shadow-xl)', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(233,183,94,0.3)', animation: 'fadeIn 0.3s ease' }}>
          <Sparkles size={18} color="#e9b75e" />
          <span style={{ fontSize: '0.92rem' }}>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <section className="page-head">
        <div className="container">
          <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold-400)', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 600 }}>
            <ArrowLeft size={16} />
            <span>Back to All Destinations</span>
          </Link>
          <div className="eyebrow eyebrow-light">
            <span>{destination.category}</span>
            <span>•</span>
            <span>{destination.state}</span>
          </div>
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(300px, 1fr)', gap: '48px', alignItems: 'start' }}>
            
            {/* Left Narrative Column */}
            <div>
              <div style={{ borderRadius: '20px', overflow: 'hidden', height: '420px', marginBottom: '32px', boxShadow: 'var(--shadow-lg)' }}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>About {destination.name}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--ink-700)', lineHeight: '1.7', marginBottom: '28px' }}>
                {destination.description} Discover hidden viewpoints, taste traditional homemade thalis, support authentic tribal and village artisans, and leave every sacred landscape cleaner than you found it.
              </p>

              <div className="info-box" style={{ marginBottom: '32px', background: 'var(--forest-50)', border: '1px solid var(--forest-100)' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--forest-950)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Leaf size={20} color="#10b981" />
                  <span>Travel Essentials & Eco Score</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ background: 'var(--white)', padding: '16px', borderRadius: '12px', border: '1px solid var(--forest-100)' }}>
                    <small style={{ color: 'var(--ink-500)', display: 'block', marginBottom: '4px' }}>Best Time to Visit</small>
                    <b style={{ color: 'var(--forest-950)', fontSize: '0.95rem' }}>{destination.best_time}</b>
                  </div>
                  <div style={{ background: 'var(--white)', padding: '16px', borderRadius: '12px', border: '1px solid var(--forest-100)' }}>
                    <small style={{ color: 'var(--ink-500)', display: 'block', marginBottom: '4px' }}>Eco Tourism Score</small>
                    <b style={{ color: '#10b981', fontSize: '1.1rem' }}>{destination.eco_score}/100</b>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: 'var(--ink-700)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Carry a refillable water bottle; minimize single-use plastics.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Respect local heritage attire at temples and cultural monuments.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Book verified local guides for forest and valley walking trails.</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to={`/planner?destination=${encodeURIComponent(destination.name)}`} className="btn btn-gold btn-lg">
                  <Sparkles size={18} />
                  <span>Generate Itinerary for {destination.name}</span>
                </Link>
                <Link to="/map" className="btn btn-outline-forest btn-lg">
                  <MapPin size={18} />
                  <span>View on Map</span>
                </Link>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <aside style={{ position: 'sticky', top: '100px' }}>
              <div className="info-box" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--ink-100)' }}>
                  At a glance
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>Budget Estimate</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--forest-950)', fontFamily: 'var(--font-ui)' }}>
                    ₹{destination.budget.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--ink-500)' }}>/ person avg</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gold-100)', color: 'var(--gold-600)', padding: '4px 10px', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Star size={16} fill="currentColor" />
                    <span>{destination.rating} / 5.0</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>Community rating</span>
                </div>

                {/* Weather card */}
                {weather && (
                  <div style={{ background: 'var(--forest-50)', padding: '16px', borderRadius: '14px', marginBottom: '24px', border: '1px solid var(--forest-100)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--forest-800)', letterSpacing: '0.05em' }}>
                        Current Weather
                      </span>
                      <CloudSun size={20} color="#e9b75e" />
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--forest-950)', fontFamily: 'var(--font-ui)' }}>
                      {weather.temperature}
                    </div>
                    <div style={{ color: 'var(--forest-700)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                      {weather.condition}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-500)', borderTop: '1px solid var(--forest-200)', paddingTop: '8px' }}>
                      <span>Humidity: {weather.humidity}</span>
                      <span>Wind: {weather.wind}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSaveToggle}
                  disabled={saving}
                  className={`btn w-100 btn-lg ${isSaved ? 'btn-outline-forest' : 'btn-forest'}`}
                  style={{ width: '100%', marginBottom: '12px' }}
                >
                  <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                  <span>{isSaved ? 'Saved in My Profile' : 'Save to My Trips'}</span>
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-400)', margin: 0 }}>
                  🔒 Fast, secure & offline ready
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
};
