import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { api } from '../api/client';
import { MapPin, Navigation, Star, ArrowUpRight, Compass } from 'lucide-react';

// Custom Map Marker Icon Fix for Leaflet in React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Fly-to controller component
const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 9, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

export const MapPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await api.get('/destinations');
        setDestinations(data.destinations || []);
      } catch (err) {
        console.error('Failed to load map points:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Compass size={14} color="#e9b75e" />
            <span>Geographic Discovery</span>
          </div>
          <h1>Explore on the Interactive Map</h1>
          <p>
            Locate pristine hill stations, sacred heritage landmarks, and vibrant coastal escapes across India.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(280px, 1fr)', gap: '28px', alignItems: 'stretch' }}>
            
            {/* Map Canvas Container */}
            <div style={{ height: '620px', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid rgba(16,59,45,0.1)', position: 'relative' }}>
              <MapContainer
                center={[22.5, 82.5]}
                zoom={5}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {selectedCenter && <MapController center={selectedCenter} />}

                {destinations.map((d) => (
                  <Marker
                    key={d.id}
                    position={[d.latitude, d.longitude]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div style={{ padding: '4px', maxWidth: '220px' }}>
                        <img
                          src={d.image}
                          alt={d.name}
                          style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                        />
                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#103b2d' }}>{d.name}</h4>
                        <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: '#576d62' }}>{d.state} • ★ {d.rating}</p>
                        <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#2d4036' }}>
                          {d.description.substring(0, 60)}...
                        </p>
                        <Link
                          to={`/destination/${d.id}`}
                          style={{
                            display: 'block',
                            background: '#103b2d',
                            color: '#fff',
                            textAlign: 'center',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                          }}
                        >
                          View Details →
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Side list of destinations */}
            <div className="info-box" style={{ maxHeight: '620px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Navigation size={18} color="#185b43" />
                <span>Featured Places ({destinations.length})</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-500)', marginBottom: '16px' }}>
                Click any place to fly directly to its location on the map.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {destinations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedCenter([d.latitude, d.longitude])}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'var(--sand-50)',
                      border: '1px solid var(--ink-100)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'var(--transition-fast)'
                    }}
                    className="map-list-item"
                  >
                    <img
                      src={d.image}
                      alt={d.name}
                      style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <b style={{ color: 'var(--forest-950)', fontSize: '0.92rem', display: 'block' }}>{d.name}</b>
                      <small style={{ color: 'var(--ink-500)' }}>{d.state} • ₹{d.budget}</small>
                    </div>
                    <span style={{ color: 'var(--forest-700)' }}>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
