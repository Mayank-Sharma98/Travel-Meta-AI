import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Eye, EyeOff, Lock, User, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please fill in both your username/email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (userType) => {
    if (userType === 'traveler') {
      setUsername('ananya_travels');
      setPassword('password123');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        
        {/* Left Side: Generated Indian Landscape Banner */}
        <div
          className="auth-banner-side"
          style={{ backgroundImage: `url('/images/login_bg.jpg')` }}
        >
          <div className="auth-banner-overlay" />

          <div className="auth-banner-badge">
            <Sparkles size={16} />
            <span>Intelligent Travel Companion</span>
          </div>

          <div className="auth-banner-content">
            <div className="eyebrow eyebrow-light">Welcome back</div>
            <h2>Every journey begins with a thoughtful plan.</h2>
            <p>
              Log in to retrieve your saved Indian itineraries, manage live budgets, and explore curated hidden gems.
            </p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '28px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Encrypted & Safe</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Offline Access Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Glassmorphism Form */}
        <div className="auth-form-side">
          <div className="auth-card">
            
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px', color: 'var(--forest-800)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
              <Compass size={24} color="#e9b75e" />
              <span>TravelMate <em>AI</em></span>
            </Link>

            <div className="auth-header">
              <h1>Sign in to your account</h1>
              <p>Enter your details to access your saved trips and personalized plans.</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <Lock size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username or Email
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="e.g. ananya_travels or name@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                    autoComplete="username"
                    required
                  />
                  <User size={18} color="#889e93" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" htmlFor="password" style={{ margin: 0 }}>
                    Password
                  </label>
                  <span style={{ fontSize: '0.82rem', color: 'var(--forest-700)', cursor: 'pointer' }} onClick={() => setError('Password reset is demo only. Create a new account if needed.')}>
                    Forgot password?
                  </span>
                </div>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '40px', paddingRight: '44px' }}
                    autoComplete="current-password"
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
              </div>

              <button
                type="submit"
                className="btn btn-forest w-100 btn-lg"
                disabled={loading}
                style={{ width: '100%', marginTop: '12px' }}
              >
                {loading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div style={{ marginTop: '20px', padding: '14px', background: 'var(--forest-50)', borderRadius: '12px', border: '1px dashed var(--forest-200)', fontSize: '0.85rem', color: 'var(--forest-900)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>✨ <b>Quick demo account:</b></span>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('traveler')}
                  style={{ background: 'var(--white)', border: '1px solid var(--forest-600)', color: 'var(--forest-800)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                >
                  Fill Sample
                </button>
              </div>
            </div>

            <div className="auth-footer-text">
              Don't have an account yet?
              <Link to="/signup">Create free account</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
