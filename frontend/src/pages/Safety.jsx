import React, { useState } from 'react';
import { Shield, ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, HeartPulse, Sparkles } from 'lucide-react';

export const Safety = () => {
  const [sosModal, setSosModal] = useState(false);

  const emergencyNumbers = [
    { label: 'National Emergency Helpline', num: '112', desc: 'Unified 24/7 all-in-one emergency service across India' },
    { label: 'Police Assistance', num: '100', desc: 'Direct regional law enforcement & patrol' },
    { label: 'Medical Ambulance', num: '108', desc: 'Emergency ambulance & trauma medical support' },
    { label: 'Women Travel Helpline', num: '1091', desc: 'Dedicated 24/7 safety helpline for women travellers' },
    { label: 'Tourist Helpline (Incredible India)', num: '1363', desc: 'Multi-lingual tourist assistance & guidance' },
    { label: 'Railway Security (RPF)', num: '139', desc: 'On-board train emergency & assistance' },
  ];

  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Shield size={14} color="#e9b75e" />
            <span>Travel With Confidence</span>
          </div>
          <h1>Safety & Emergency Companion</h1>
          <p>
            Stay prepared on every journey. Access national Indian emergency helplines, essential offline safety checklists, and verified travel guidance.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '32px', marginBottom: '40px', alignItems: 'stretch' }}>
            
            {/* Checklist Box */}
            <div className="info-box" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="#10b981" />
                <span>Pre-Travel Safety Checklist</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem', color: 'var(--ink-700)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                  <div>
                    <b>Share Live Itinerary:</b> Always send your accommodation name, train/flight details, and daily plan to a trusted friend or family member.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                  <div>
                    <b>Offline Identification Copies:</b> Keep digital photos of your Aadhaar/Passport/Driving License in an offline vault and a physical paper copy in your bag.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                  <div>
                    <b>Verified Transport Only:</b> Use registered prepaid taxi booths, official railway apps (IRCTC), or verified app-based aggregators at railway stations.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                  <div>
                    <b>Weather & Altitude Alerts:</b> Check regional meteorological warnings (IMD) before trekking in the Himalayas or coastal visits during monsoons.
                  </div>
                </div>
              </div>
            </div>

            {/* SOS Trigger Card */}
            <div style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)', color: 'var(--white)', padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 16px 36px rgba(185, 28, 28, 0.3)' }}>
              <div>
                <div className="eyebrow eyebrow-light" style={{ color: '#fca5a5' }}>
                  Demo Interface
                </div>
                <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '12px' }}>
                  Emergency SOS Broadcast
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  In production environments, this connects to emergency responders and broadcasts live GPS coordinates to nominated family members.
                </p>
              </div>

              <button
                onClick={() => setSosModal(true)}
                className="btn btn-lg"
                style={{ background: 'var(--white)', color: '#991b1b', fontWeight: 700, alignSelf: 'flex-start', marginTop: '24px' }}
              >
                <ShieldAlert size={20} />
                <span>Simulate Emergency SOS</span>
              </button>
            </div>

          </div>

          {/* National Helplines Grid */}
          <div className="section-heading" style={{ marginBottom: '24px' }}>
            <div className="eyebrow">National Directory</div>
            <h2>Key Indian Emergency Numbers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {emergencyNumbers.map((e, idx) => (
              <div key={idx} className="info-box" style={{ borderLeft: '4px solid var(--forest-700)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <b style={{ color: 'var(--forest-950)', fontSize: '0.95rem' }}>{e.label}</b>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--forest-800)', fontFamily: 'var(--font-ui)' }}>
                    {e.num}
                  </span>
                </div>
                <p style={{ color: 'var(--ink-500)', fontSize: '0.85rem', margin: 0 }}>
                  {e.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SOS Modal Dialog */}
      {sosModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="info-box" style={{ maxWidth: '460px', width: '100%', textAlign: 'center', animation: 'fadeIn 0.25s ease' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <AlertTriangle size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Emergency Protocol Activated (Demo)</h3>
            <p style={{ color: 'var(--ink-500)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: '1.5' }}>
              In an actual emergency in India, please dial <b>112</b> directly from your phone. GPS coordinates (22.5° N, 82.5° E) would be dispatched to trusted contacts.
            </p>
            <button onClick={() => setSosModal(false)} className="btn btn-forest w-100">
              Understood / Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
