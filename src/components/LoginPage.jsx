import { useState, useEffect } from 'react';
import '../styles/LoginPage.css';

const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateCaptcha() {
  const code = Array.from({ length: 5 }, () =>
    CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
  ).join('');
  return { code, answer: code };
}

export default function LoginPage({ onLogin, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username.trim()) return setError('Please enter your username.');
    if (!password) return setError('Please enter your password.');
    if (captchaInput.trim() !== captcha.answer)
      return setError('Incorrect CAPTCHA. Please try again.') || refreshCaptcha();

    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 800);
  }

  return (
    <div className="lp-root">
      {/* Background glow */}
      <div className="lp-bg-glow" />

      {/* ── TOP BAR ── */}
      <div className="lp-topbar">
        <div className="lp-topbar-brand">
          {onBack && (
            <button className="lp-back-btn" onClick={onBack}>
              ← Home
            </button>
          )}
          <span className="lp-topbar-logo">UDISE<span>+</span></span>
          <div className="lp-topbar-divider" />
          <span className="lp-topbar-sub">Analytics Platform</span>
        </div>
        <div className="lp-topbar-right">
          <div className="lp-dosel-text">
            <div className="lp-dosel-name">Department of School Education &amp; Literacy</div>
            <div className="lp-dosel-sub">Ministry of Education, Government of India</div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="lp-main">

        {/* LEFT — Branding */}
        <div className="lp-left">
          <div className="lp-left-inner">
            <div className="lp-badge">Real Time Education Analytics</div>
            <h1 className="lp-hero-h1">
              Real Time Education<br />
              Analytics for Better<br />
              <span className="lp-hero-accent">Decision Making</span>
            </h1>
            <p className="lp-hero-p">
              Explore trusted education data to track trends, compare performance,
              and improve outcomes across schools, districts, and states.
            </p>
            <div className="lp-hero-stats">
              {[
                { val: '24.69 Cr', label: 'Students' },
                { val: '14.71 L', label: 'Schools' },
                { val: '1.01 Cr', label: 'Teachers' },
              ].map(s => (
                <div key={s.label} className="lp-hero-stat">
                  <div className="lp-hero-stat-val">{s.val}</div>
                  <div className="lp-hero-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Login card */}
        <div className="lp-right">
          <div className="lp-card">
            <div className="lp-card-header">
              <h2 className="lp-card-title">Log In</h2>
            </div>

            <form className="lp-form" onSubmit={handleSubmit} noValidate>

              {/* Username */}
              <div className="lp-field">
                <label className="lp-label">Username</label>
                <div className="lp-input-wrap">
                  <svg className="lp-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <input
                    className="lp-input"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="lp-field">
                <label className="lp-label">Password</label>
                <div className="lp-input-wrap">
                  <svg className="lp-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="7" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <input
                    className="lp-input"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button type="button" className="lp-show-pass" onClick={() => setShowPass(v => !v)}>
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="lp-field">
                <label className="lp-label">Verification</label>
                <div className="lp-captcha-wrap">
                  <div className="lp-captcha-display">
                    {captcha.code.split('').map((ch, i) => (
                      <span key={i} className="lp-captcha-char" style={{
                        transform: `rotate(${(Math.random() * 14 - 7).toFixed(1)}deg)`,
                        color: ['#93c5fd', '#a5b4fc', '#5eead4', '#fcd34d', '#86efac'][i % 5],
                      }}>{ch}</span>
                    ))}
                  </div>

                </div>
                <div className="lp-input-wrap" style={{ marginTop: 8 }}>
                  <input
                    className="lp-input"
                    style={{ paddingLeft: 14 }}
                    type="text"
                    placeholder="Enter the code above"
                    value={captchaInput}
                    onChange={e => setCaptchaInput(e.target.value.toUpperCase())}
                    maxLength={5}
                    autoComplete="off"
                  />
                </div>
              </div>

              {error && <div className="lp-error">{error}</div>}

              <button className="lp-submit" type="submit" disabled={loading}>
                {loading ? 'Logging in…' : 'Log In →'}
              </button>

            </form>


          </div>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="lp-bottombar">
        <span>© 2024–25 Department of School Education &amp; Literacy, Ministry of Education, Government of India</span>
        <span>Data Source: UDISE+ Official Base Files</span>
      </div>
    </div>
  );
}