import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export const DestinationCard = ({ destination, onSaveToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(destination.is_saved || false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    setSaving(true);
    try {
      const res = await api.post(`/destinations/${destination.id}/save`, {});
      setIsSaved(res.saved);
      if (onSaveToggle) {
        onSaveToggle(destination.id, res.saved);
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="dest-card">
      <div className="dest-card-image">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        <div className="dest-badge-rating">
          <Star size={14} fill="#e9b75e" color="#e9b75e" />
          <span>{destination.rating}</span>
        </div>

        <button
          className={`dest-save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
          disabled={saving}
          title={isSaved ? 'Remove from saved' : 'Save to my profile'}
          aria-label="Save destination"
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="dest-card-body">
        <span className="dest-tag">{destination.category}</span>

        <h3>{destination.name}</h3>

        <div className="dest-location">
          <MapPin size={14} color="#185b43" />
          <span>{destination.state}</span>
          <span style={{ margin: '0 4px', opacity: 0.4 }}>•</span>
          <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.8rem' }}>
            🌿 Eco {destination.eco_score}/100
          </span>
        </div>

        <p className="dest-description">
          {destination.description.length > 95
            ? `${destination.description.substring(0, 95)}...`
            : destination.description}
        </p>

        <div className="dest-card-footer">
          <div className="dest-price">
            Starting from
            <b>₹{destination.budget.toLocaleString('en-IN')}</b>
          </div>

          <Link to={`/destination/${destination.id}`} className="btn btn-forest btn-sm">
            <span>Explore</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};
