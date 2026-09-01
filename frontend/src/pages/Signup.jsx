import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Eye, EyeOff, Lock, Mail, User, Sparkles, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, text: '', color: 'transparent' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score: 33, text: 'Weak', color: '#ef4444' };
    if (score <= 4) return { score: 66, text: 'Good', color: '#eab308' };
    return { score: 100, text: 'Strong', color: '#10b981' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please recheck.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the responsible travel community guidelines.');
      return;
    }

    setLoading(true);
    try {
      await signup(username, email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split" style={{ flexDirection: 'row-reverse' }}>
        
        {/* Right Side: Generated Himalayan Landscape Banner */}
        <div
          className="auth-banner-side"
          style={{ backgroundImage: `url('/images/signup_bg.jpg')` }}
        >
          <div className="auth-banner-overlay" />

          <div className="auth-banner-badge">
            <Sparkles size={16} />
            <span>Join 10,000+ Indian Explorers</span>
          </div>

          <div className="auth-banner-content">
            <div className="eyebrow eyebrow-light">Responsible Exploration</div>
            <h2>Travel deeper. Leave every place better.</h2>
            <p>
              Join TravelMate AI to craft personalized Indian itineraries, discover verified community stays, and calculate precise budgets.
            </p>

            <div style={{ background: 'rgba(10, 35, 28, 0.75)', backdropFilter: 'blur(12px)', padding: '18px 22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.15)', marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--gold-400)', fontSize: '1.1rem' }}>★★★★★</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>100% Free Hackathon Platform</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                "Built for how India actually travels — thoughtful, budget-aware, and safety-conscious."
              </p>
            </div>
          </div>
        </div>

        {/* Left Side: Professional Glassmorphism Signup Form */}
        <div className="auth-form-side">
          <div className="auth-card">
            
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--forest-800)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
              <Compass size={24} color="#e9b75e" />
              <span>TravelMate <em>AI</em></span>
            </Link>

            <div className="auth-header" style={{ marginBottom: '24px' }}>
              <h1>Create your free account</h1>
              <p>Start planning your next unforgettable journey across India.</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <Lock size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Choose a username (e.g. rohit_explorer)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                    autoComplete="username"
                    required
                  />
                  <User size={18} color="#889e93" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                    autoComplete="email"
                    required
                  />
                  <Mail size={18} color="#889e93" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '40px', paddingRight: '44px' }}
                    autoComplete="new-password"
                    required
                  />
                  <Lock size={18} color="#889e93" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <button
                    type="button"
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && (
                  <div className="strength-meter">
                    <div
                      className="strength-bar"
                      style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                    autoComplete="new-password"
                    required
                  />
                  <Lock size={18} color="#889e93" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '22px', fontSize: '0.85rem', color: 'var(--ink-700)' }}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ marginTop: '3px', accentColor: 'var(--forest-800)', cursor: 'pointer' }}
                />
                <label htmlFor="terms" style={{ cursor: 'pointer' }}>
                  I agree to support responsible, plastic-free tourism and adhere to local cultural customs.
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-forest w-100 btn-lg"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer-text">
              Already have an account?
              <Link to="/login">Sign in here</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
