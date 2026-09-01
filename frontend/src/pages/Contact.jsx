import React, { useState } from 'react';
import { api } from '../api/client';
import { Mail, Send, CheckCircle2, MessageSquare, Phone, MapPin } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Mail size={14} color="#e9b75e" />
            <span>Let's Connect</span>
          </div>
          <h1>Get in Touch with TravelMate</h1>
          <p>
            Have feedback, destination suggestions, or questions about our platform? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '850px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(240px, 1fr)', gap: '36px', alignItems: 'start' }}>
            
            {/* Form */}
            <div className="info-box" style={{ boxShadow: 'var(--shadow-lg)' }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--forest-100)', color: 'var(--forest-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ marginBottom: '8px' }}>Thank you for reaching out!</h3>
                  <p style={{ color: 'var(--ink-500)', marginBottom: '20px' }}>
                    Your message has been recorded. Our team will review and respond soon.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-forest btn-sm">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="auth-error-banner" style={{ marginBottom: '16px' }}>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="e.g. priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Suggest a new destination / Feedback"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Write your thoughts or inquiries here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-forest w-100 btn-lg" disabled={loading}>
                    {loading ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Quick Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="info-box" style={{ background: 'var(--forest-50)', border: '1px solid var(--forest-100)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--forest-950)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} color="#185b43" />
                  <span>Direct Assistance</span>
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-700)', margin: 0 }}>
                  For instant travel advice or itinerary customization questions, try our 24/7 AI chatbot assistant!
                </p>
              </div>

              <div className="info-box">
                <h4 style={{ fontSize: '1.05rem', color: 'var(--forest-950)', marginBottom: '10px' }}>
                  Open Platform
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-500)', margin: 0 }}>
                  TravelMate AI is an open innovation project built for sustainable tourism across India.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
