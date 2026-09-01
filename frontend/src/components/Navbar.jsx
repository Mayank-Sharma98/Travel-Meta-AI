import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Menu, X, User, LogOut, Heart, MapPin, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
            <Compass size={28} color="#e9b75e" />
            <span>TravelMate <em>AI</em></span>
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/explore" className="nav-link" onClick={() => setMobileOpen(false)}>
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/planner" className="nav-link" onClick={() => setMobileOpen(false)}>
                AI Planner
              </NavLink>
            </li>
            <li>
              <NavLink to="/map" className="nav-link" onClick={() => setMobileOpen(false)}>
                Map
              </NavLink>
            </li>
            <li>
              <NavLink to="/budget" className="nav-link" onClick={() => setMobileOpen(false)}>
                Budget
              </NavLink>
            </li>
            <li>
              <NavLink to="/safety" className="nav-link" onClick={() => setMobileOpen(false)}>
                Safety
              </NavLink>
            </li>
            <li>
              <NavLink to="/chat" className="nav-link" onClick={() => setMobileOpen(false)}>
                Chatbot
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link" onClick={() => setMobileOpen(false)}>
                About
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink to="/profile" className="nav-link" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={16} />
                    <span>My Trips ({user.username})</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light btn-sm"
                    style={{ padding: '6px 14px' }}
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="btn btn-gold btn-sm"
                    onClick={() => setMobileOpen(false)}
                    style={{ padding: '8px 18px' }}
                  >
                    <Sparkles size={15} />
                    <span>Sign up</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
