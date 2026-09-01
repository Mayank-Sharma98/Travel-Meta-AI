import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { DestinationCard } from '../components/DestinationCard';
import {
  User,
  MapPin,
  Calendar,
  Wallet,
  Trash2,
  Sparkles,
  Heart,
  Route,
  ArrowRight,
  Compass
} from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' or 'saved'

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tripsRes, savedRes] = await Promise.all([
        api.get('/trips'),
        api.get('/destinations/user/saved')
      ]);
      setTrips(tripsRes.trips || []);
      setSavedPlaces(savedRes.saved || []);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm('Are you sure you want to remove this saved trip?')) return;

    try {
      await api.delete(`/trips/${tripId}`);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err) {
      console.error('Failed to delete trip:', err);
    }
  };

  const handleSavedToggle = (destId, isSaved) => {
    if (!isSaved) {
      setSavedPlaces((prev) => prev.filter((p) => p.id !== destId));
    }
  };

  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <User size={14} color="#e9b75e" />
            <span>Your Personal Travel Hub</span>
          </div>
          <h1>Namaste, {user?.username}</h1>
          <p>
            Manage your saved day-by-day itineraries, track your upcoming travel budgets, and revisit bookmarked destinations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid var(--ink-200)', paddingBottom: '12px' }}>
            <button
              onClick={() => setActiveTab('trips')}
              style={{
                background: activeTab === 'trips' ? 'var(--forest-800)' : 'transparent',
                color: activeTab === 'trips' ? 'var(--white)' : 'var(--ink-700)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'var(--transition-fast)'
              }}
            >
              <Route size={16} />
              <span>My Planned Trips ({trips.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              style={{
                background: activeTab === 'saved' ? 'var(--forest-800)' : 'transparent',
                color: activeTab === 'saved' ? 'var(--white)' : 'var(--ink-700)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'var(--transition-fast)'
              }}
            >
              <Heart size={16} />
              <span>Saved Places ({savedPlaces.length})</span>
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #d0ded6', borderTopColor: '#103b2d', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              <p style={{ color: 'var(--ink-500)' }}>Loading your dashboard...</p>
            </div>
          ) : activeTab === 'trips' ? (
            /* Trips List */
            trips.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {trips.map((trip) => (
                  <div key={trip.id} className="info-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--forest-800)', boxShadow: 'var(--shadow-md)' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <span className="dest-tag" style={{ marginBottom: '6px' }}>SAVED ITINERARY</span>
                          <h3 style={{ fontSize: '1.35rem', color: 'var(--forest-950)' }}>{trip.destination}</h3>
                        </div>
                        <button
                          onClick={() => handleDeleteTrip(trip.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                          title="Delete trip"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.88rem', color: 'var(--ink-500)', marginBottom: '16px' }}>
                        <span>📅 {trip.days} Days</span>
                        <span>👥 {trip.travelers} Traveler{trip.travelers > 1 ? 's' : ''}</span>
                        <span>💰 ₹{trip.budget.toLocaleString('en-IN')}</span>
                      </div>

                      {trip.itinerary && (
                        <div style={{ background: 'var(--sand-50)', padding: '12px 14px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--ink-700)', maxHeight: '100px', overflowY: 'auto', whiteSpace: 'pre-line', marginBottom: '16px' }}>
                          {trip.itinerary}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--ink-100)' }}>
                      <small style={{ color: 'var(--ink-400)' }}>
                        Created on {new Date(trip.created_at).toLocaleDateString()}
                      </small>
                      <Link
                        to={`/planner?destination=${encodeURIComponent(trip.destination)}`}
                        className="btn btn-outline-forest btn-sm"
                      >
                        <span>Re-plan</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="info-box" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '14px' }}>🗺️</div>
                <h3 style={{ marginBottom: '8px' }}>No saved itineraries yet</h3>
                <p style={{ color: 'var(--ink-500)', maxWidth: '420px', margin: '0 auto 20px' }}>
                  Use our AI Travel Designer to generate a customized day-by-day itinerary and save it here.
                </p>
                <Link to="/planner" className="btn btn-gold btn-lg">
                  <Sparkles size={18} />
                  <span>Plan Your First Trip</span>
                </Link>
              </div>
            )
          ) : (
            /* Saved Places */
            savedPlaces.length > 0 ? (
              <div className="destination-grid">
                {savedPlaces.map((place) => (
                  <DestinationCard
                    key={place.id}
                    destination={{ ...place, is_saved: true }}
                    onSaveToggle={handleSavedToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="info-box" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '14px' }}>❤️</div>
                <h3 style={{ marginBottom: '8px' }}>No saved destinations yet</h3>
                <p style={{ color: 'var(--ink-500)', maxWidth: '420px', margin: '0 auto 20px' }}>
                  Browse our curated collection of Indian destinations and tap the heart icon to save places you love.
                </p>
                <Link to="/explore" className="btn btn-forest btn-lg">
                  <Compass size={18} />
                  <span>Explore Destinations</span>
                </Link>
              </div>
            )
          )}

        </div>
      </section>
    </div>
  );
};
