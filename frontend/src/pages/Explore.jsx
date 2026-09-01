import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { DestinationCard } from '../components/DestinationCard';
import { api } from '../api/client';
import { Search, SlidersHorizontal, MapPin, Sparkles, Compass, Mountain, Umbrella, Landmark, TreePine, RotateCcw } from 'lucide-react';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryQ = searchParams.get('q') || '';
  const queryCategory = searchParams.get('category') || '';
  const queryState = searchParams.get('state') || '';

  const [searchInput, setSearchInput] = useState(queryQ);

  useEffect(() => {
    // Fetch filter categories and states
    const fetchMeta = async () => {
      try {
        const meta = await api.get('/destinations/meta');
        setCategories(meta.categories || []);
        setStates(meta.states || []);
      } catch (err) {
        console.error('Failed to load filter meta:', err);
      }
    };
    fetchMeta();
  }, []);

  useEffect(() => {
    const fetchFilteredDestinations = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (queryQ) params.append('q', queryQ);
        if (queryCategory) params.append('category', queryCategory);
        if (queryState) params.append('state', queryState);

        const data = await api.get(`/destinations?${params.toString()}`);
        setDestinations(data.destinations || []);
      } catch (err) {
        console.error('Failed to load destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredDestinations();
  }, [queryQ, queryCategory, queryState]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      newParams.set('q', searchInput.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleStateChange = (state) => {
    const newParams = new URLSearchParams(searchParams);
    if (state) {
      newParams.set('state', state);
    } else {
      newParams.delete('state');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const moods = [
    { name: 'Nature', label: 'Hill Stations', icon: Mountain, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
    { name: 'Cultural', label: 'Beaches & Coast', icon: Umbrella, img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Historical', label: 'Royal Heritage', icon: Landmark, img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80' },
    { name: 'Eco Tourism', label: 'Eco Trails', icon: TreePine, img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div>
      {/* Header Banner */}
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Compass size={14} color="#e9b75e" />
            <span>Discover India</span>
          </div>
          <h1>Find your next story</h1>
          <p>
            From misty tea gardens in Darjeeling to the boulder-strewn heritage of Hampi, browse destinations picked for every mood and budget.
          </p>
        </div>
      </section>

      {/* Browse By Mood */}
      <section className="section section-sand" style={{ padding: '50px 0' }}>
        <div className="container">
          <div className="section-heading text-center" style={{ marginBottom: '32px' }}>
            <div className="eyebrow">Browse by mood</div>
            <h2 style={{ fontSize: '2rem' }}>What kind of journey are you craving?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {moods.map((m) => {
              const Icon = m.icon;
              const isActive = queryCategory === m.name;
              return (
                <div
                  key={m.name}
                  onClick={() => handleCategoryChange(isActive ? '' : m.name)}
                  style={{
                    position: 'relative',
                    height: '140px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 0 3px var(--gold-500)' : 'var(--shadow-md)',
                    transition: 'var(--transition-smooth)'
                  }}
                  className="mood-card-item"
                >
                  <img
                    src={m.img}
                    alt={m.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isActive
                        ? 'linear-gradient(180deg, rgba(16, 59, 45, 0.4) 0%, rgba(16, 59, 45, 0.95) 100%)'
                        : 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '16px',
                      color: 'var(--white)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', fontFamily: 'var(--font-ui)' }}>
                      <Icon size={18} color="#e9b75e" />
                      <span>{m.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search & Filter Panel */}
      <section className="section">
        <div className="container">
          <div className="info-box" style={{ marginBottom: '40px' }}>
            <form onSubmit={handleSearchSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto', gap: '16px', alignItems: 'flex-end' }}>
                
                <div>
                  <label className="form-label">Search</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search places, states, vibes..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      style={{ paddingLeft: '38px' }}
                    />
                    <Search size={18} color="#889e93" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={queryCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">State / Region</label>
                  <select
                    className="form-select"
                    value={queryState}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    <option value="">All States</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-forest" style={{ whiteSpace: 'nowrap' }}>
                    <Search size={16} />
                    <span>Search</span>
                  </button>
                  {(queryQ || queryCategory || queryState) && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="btn btn-outline-forest"
                      title="Reset all filters"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                </div>

              </div>
            </form>
          </div>

          {/* Results Count Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>
              {loading ? 'Finding destinations...' : `Showing ${destinations.length} Destination${destinations.length === 1 ? '' : 's'}`}
            </h2>
            {(queryQ || queryCategory || queryState) && (
              <span style={{ fontSize: '0.88rem', color: 'var(--ink-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={14} color="#185b43" />
                <span>Filters Active</span>
              </span>
            )}
          </div>

          {/* Destination Grid / Loading / Empty */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #d0ded6', borderTopColor: '#103b2d', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              <p style={{ color: 'var(--ink-500)' }}>Curating recommendations...</p>
            </div>
          ) : destinations.length > 0 ? (
            <div className="destination-grid">
              {destinations.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          ) : (
            <div className="info-box" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🧭</div>
              <h3 style={{ marginBottom: '8px' }}>No destinations matched your criteria</h3>
              <p style={{ color: 'var(--ink-500)', maxWidth: '420px', margin: '0 auto 20px' }}>
                Try adjusting your search terms or clearing the active filters to see all available destinations across India.
              </p>
              <button onClick={clearFilters} className="btn btn-forest btn-sm">
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Region Showcase */}
      <section className="section section-sand">
        <div className="container">
          <div className="section-heading text-center">
            <div className="eyebrow">Popular Regions</div>
            <h2>Explore India by State</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { state: 'Rajasthan', desc: 'Forts, Palaces & Desert Nights', img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80' },
              { state: 'Kerala', desc: 'Backwaters, Tea Hills & Spices', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80' },
              { state: 'Himachal Pradesh', desc: 'Alpine Rivers & Snowy Peaks', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
              { state: 'Jharkhand', desc: 'Waterfalls, Sunsets & Nature', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
            ].map((r) => (
              <div
                key={r.state}
                onClick={() => handleStateChange(r.state)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '180px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <img src={r.img} alt={r.state} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(6, 24, 19, 0.9) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px', color: 'var(--white)' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>{r.state}</h4>
                  <small style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>{r.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Planner CTA */}
      <section className="section section-forest" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="eyebrow eyebrow-light">Can't decide?</div>
          <h2 style={{ color: 'var(--white)', fontSize: '2.4rem', marginBottom: '14px' }}>Let the AI planner craft your trip</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '28px' }}>
            Answer a few quick questions about duration and budget, and get a complete customized itinerary in seconds.
          </p>
          <Link to="/planner" className="btn btn-gold btn-lg">
            <Sparkles size={18} />
            <span>Try AI Trip Planner</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
