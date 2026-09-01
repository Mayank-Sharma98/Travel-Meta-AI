import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Sparkles, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, PieChart } from 'lucide-react';

export const Budget = () => {
  const [totalBudget, setTotalBudget] = useState(15000);
  const [expenses, setExpenses] = useState({
    transport: 3500,
    stay: 5500,
    food: 3000,
    activities: 1800,
    buffer: 1200
  });

  const totalSpent = Object.values(expenses).reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);
  const remaining = totalBudget - totalSpent;
  const isOverBudget = remaining < 0;

  const handleExpenseChange = (category, value) => {
    setExpenses((prev) => ({
      ...prev,
      [category]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const categories = [
    { key: 'transport', label: '🚆 Transport & Local Commute', color: '#10b981' },
    { key: 'stay', label: '🏨 Homestays & Hotels', color: '#185b43' },
    { key: 'food', label: '🍛 Food & Regional Dining', color: '#e9b75e' },
    { key: 'activities', label: '🎟️ Entry Tickets & Local Guide', color: '#3b82f6' },
    { key: 'buffer', label: '🛡️ Emergency & Miscellaneous Buffer', color: '#8b5cf6' },
  ];

  return (
    <div>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow eyebrow-light">
            <Wallet size={14} color="#e9b75e" />
            <span>Smart Money, Better Journeys</span>
          </div>
          <h1>Live Travel Budget Calculator</h1>
          <p>
            Plan every rupee with clarity. Allocate expenses across transport, stays, authentic regional dining, and keep a reliable emergency buffer.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '40px', alignItems: 'start' }}>
            
            {/* Left Inputs */}
            <div className="info-box" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--ink-100)' }}>
                <label className="form-label" style={{ fontSize: '1rem' }}>
                  Total Available Trip Budget (₹ INR)
                </label>
                <input
                  type="number"
                  className="form-control"
                  style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--forest-950)', fontFamily: 'var(--font-ui)' }}
                  value={totalBudget}
                  step="500"
                  min="1000"
                  onChange={(e) => setTotalBudget(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Expense Allocations</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {categories.map((cat) => (
                  <div key={cat.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.92rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--forest-950)' }}>{cat.label}</span>
                      <span style={{ fontWeight: 700, color: cat.color }}>
                        ₹{expenses[cat.key].toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <input
                        type="range"
                        min="0"
                        max={totalBudget * 0.8}
                        step="100"
                        value={expenses[cat.key]}
                        onChange={(e) => handleExpenseChange(cat.key, e.target.value)}
                        style={{ flexGrow: 1, accentColor: cat.color }}
                      />
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={expenses[cat.key]}
                        onChange={(e) => handleExpenseChange(cat.key, e.target.value)}
                        style={{ width: '90px', padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--ink-200)', textAlign: 'right', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick auto-split button */}
              <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--ink-100)' }}>
                <button
                  type="button"
                  onClick={() => {
                    setExpenses({
                      transport: Math.floor(totalBudget * 0.25),
                      stay: Math.floor(totalBudget * 0.35),
                      food: Math.floor(totalBudget * 0.20),
                      activities: Math.floor(totalBudget * 0.10),
                      buffer: Math.floor(totalBudget * 0.10),
                    });
                  }}
                  className="btn btn-outline-forest btn-sm"
                >
                  <Sparkles size={14} />
                  <span>Auto-Balance Budget (Recommended 35/25/20/10/10 Ratio)</span>
                </button>
              </div>

            </div>

            {/* Right Live Summary */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="info-box" style={{ background: isOverBudget ? 'var(--danger-light)' : 'var(--forest-50)', border: `1.5px solid ${isOverBudget ? 'var(--danger)' : 'var(--forest-200)'}`, boxShadow: 'var(--shadow-xl)' }}>
                
                <div className="eyebrow" style={{ color: isOverBudget ? 'var(--danger)' : 'var(--forest-800)' }}>
                  Live Financial Estimate
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--ink-500)' }}>Total Planned Spend</span>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--forest-950)', fontFamily: 'var(--font-ui)', lineHeight: 1.1 }}>
                    ₹{totalSpent.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Progress bar visual */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--ink-700)' }}>
                    <span>Budget Utilized</span>
                    <b>{Math.round((totalSpent / (totalBudget || 1)) * 100)}%</b>
                  </div>
                  <div style={{ height: '10px', background: 'var(--white)', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                    {categories.map((c) => {
                      const pct = totalBudget > 0 ? (expenses[c.key] / totalBudget) * 100 : 0;
                      return (
                        <div
                          key={c.key}
                          style={{ width: `${pct}%`, background: c.color, height: '100%' }}
                          title={`${c.label}: ₹${expenses[c.key]}`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div style={{ padding: '16px', background: 'var(--white)', borderRadius: '14px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}>Remaining Balance</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isOverBudget ? 'var(--danger)' : '#10b981', fontFamily: 'var(--font-ui)' }}>
                    ₹{remaining.toLocaleString('en-IN')}
                  </div>
                  {isOverBudget ? (
                    <small style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
                      <AlertCircle size={14} />
                      <span>Over budget by ₹{Math.abs(remaining).toLocaleString('en-IN')}</span>
                    </small>
                  ) : (
                    <small style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
                      <CheckCircle2 size={14} />
                      <span>Comfortable buffer maintained</span>
                    </small>
                  )}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--ink-700)', lineHeight: '1.5' }}>
                  💡 <b>Pro Travel Tip:</b> Reserving 10–15% for local auto-rickshaws, chai stalls, and spontaneous museum visits prevents unexpected money stress on the road.
                </div>

                <Link to="/planner" className="btn btn-forest w-100" style={{ marginTop: '20px' }}>
                  <Sparkles size={16} />
                  <span>Build Itinerary Within This Budget</span>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
