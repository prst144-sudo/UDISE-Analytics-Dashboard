import { useEffect, useRef } from 'react';
import '../styles/HomeLanding.css';

const SECTIONS = [
  {
    cat: 'student',
    emoji: '🎓',
    accent: '#2563eb',
    accentLight: 'rgba(37,99,235,0.10)',
    accentBorder: 'rgba(37,99,235,0.20)',
    title: 'Student Analytics',
    headline: "Understanding India's 25 Crore Students",
    desc: 'Enrollment patterns across school categories, social groups, migration, language of instruction, dropout rates, and transition paths.',
    stats: [
      { val: '24.69 Cr', label: 'Total Enrolled' },
      { val: '0.94', label: 'GPI' },
      { val: '48.3%', label: 'Girls Share' },
    ],
    tags: [
      { label: 'Student Analytics', id: 'student-main' },
      { label: 'Socioeconomic', id: 'socio' },
      { label: 'Migration', id: 'migration' },
      { label: 'Medium of Instruction', id: 'medium' },
      { label: 'Dropout Rate', id: 'dropout' },
      { label: 'Transition Rate', id: 'transition' },
      { label: 'CWSN Students', id: 'cwsn-student' },
      { label: 'National Analytics', id: 'national' },
      { label: 'Vocational', id: 'vocational' },
      { label: 'Stream Analytics', id: 'stream' },
    ],
  },
  {
    cat: 'teacher',
    emoji: '🧑‍🏫',
    accent: '#0891b2',
    accentLight: 'rgba(8,145,178,0.10)',
    accentBorder: 'rgba(8,145,178,0.20)',
    title: 'Teacher & PTR Analytics',
    headline: "The Teachers Behind India's Classrooms",
    desc: 'Teacher deployment, student-teacher ratios, gender distribution, CWSN training coverage, and retirement pipeline pressures.',
    stats: [
      { val: '1.01 Cr', label: 'Total Teachers' },
      { val: '24.4:1', label: 'National PTR' },
      { val: '54.2%', label: 'Female Teachers' },
    ],
    tags: [
      { label: 'Teacher Analytics', id: 'teacher-main' },
      { label: 'PTR Analytics', id: 'ptr' },
      { label: 'CWSN Teachers', id: 'cwsn-teacher' },
      { label: 'Retirement', id: 'retirement' },
    ],
  },
  {
    cat: 'school',
    emoji: '🏫',
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.10)',
    accentBorder: 'rgba(99,102,241,0.20)',
    title: 'School Analytics',
    headline: 'Schools as Platforms for Equity',
    desc: 'School management types, basic and digital infrastructure, multi-class units, and single-teacher school concentrations.',
    stats: [
      { val: '14.7 L', label: 'Total Schools' },
      { val: '73%', label: 'Govt. Schools' },
      { val: '82.2%', label: 'Rural Schools' },
    ],
    tags: [
      { label: 'School Analytics', id: 'school-main' },
      { label: 'Infrastructure', id: 'infra' },
      { label: 'Multi-Class Units', id: 'multiclass' },
    ],
  },
  {
    cat: 'compare',
    emoji: '⚖️',
    accent: '#d97706',
    accentLight: 'rgba(217,119,6,0.10)',
    accentBorder: 'rgba(217,119,6,0.20)',
    title: 'Comparative Analytics',
    headline: 'Compare. Contrast. Draw Conclusions.',
    desc: 'Side-by-side state comparisons across enrollment, PTR, infrastructure, and teacher deployment. Filterable to district level.',
    stats: [
      { val: '36', label: 'States & UTs' },
      { val: '4', label: 'Comparison Views' },
      { val: '100%', label: 'Data Verifiable' },
    ],
    tags: [
      { label: 'Student Comparison', id: 'student-compare' },
      { label: 'School Comparison', id: 'school-compare' },
      { label: 'Teacher Comparison', id: 'teacher-compare' },
      { label: 'PTR Comparison', id: 'ptr-compare' },
    ],
  },
];

const PLATFORM_STATS = [
  {
    val: '24.69 Cr', label: 'Students Enrolled', sub: 'Across all school levels',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3L1 7.5L10 12L19 7.5L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M5 10v4c0 1.1 2.24 2 5 2s5-.9 5-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    val: '14.71 L', label: 'Schools', sub: 'Govt, aided & private',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 18V8l8-5 8 5v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="7" y="12" width="3" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" /><rect x="12" y="10" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    val: '1.01 Cr', label: 'Teachers', sub: 'Deployed nationally',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 17v-2a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><rect x="2" y="11" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" /><path d="M4 11V9.5a1 1 0 0 1 1-1h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    val: '2024–25', label: 'Latest Data Year', sub: 'UDISE+ official data',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 2v3M14 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="13" r="1.5" fill="currentColor" opacity="0.5" /></svg>,
  },
];

export default function HomeLanding({ onShowLanding, onShowDashboard }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.hl-card');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = `${e.target.dataset.delay}ms`;
          e.target.classList.add('hl-card--visible');
        }
      });
    }, { threshold: 0.08 });
    cards.forEach((c, i) => {
      c.dataset.delay = i * 80;
      obs.observe(c);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hl-root">

      {/* ── HERO ───────────────────────────────────────── */}
      <div className="hl-hero" ref={heroRef}>
        <div className="hl-hero-glow" />
        <div className="hl-hero-grid-lines" />

        <div className="hl-hero-inner">
          {/* Left */}
          <div className="hl-hero-left">
            <span className="hl-badge">📊 UDISE+ Analytics Platform · 2024–25</span>
            <h1 className="hl-hero-h1">
              India's School System.<br />
              <span className="hl-hero-accent">In One Place.</span>
            </h1>
            <p className="hl-hero-p">
              A unified analytics platform built on UDISE+ data — covering 25 crore students,
              1 crore teachers, and 14.7 lakh schools across every state and union territory.
            </p>
            <div className="hl-hero-ctas">
              <button className="hl-cta-primary" onClick={() => onShowLanding('student')}>
                Explore Students →
              </button>
              <button className="hl-cta-ghost" onClick={() => onShowLanding('school')}>
                Explore Schools
              </button>
            </div>
          </div>

          {/* Right — platform stats: individual glassmorphic cards */}
          <div className="hl-hero-stats">
            {PLATFORM_STATS.map((s, i) => (
              <div key={i} className="hl-hero-stat">
                <div className="hl-hero-stat-shimmer" />
                <div className="hl-hero-stat-icon">{s.icon}</div>
                <div className="hl-hero-stat-val">{s.val}</div>
                <div className="hl-hero-stat-label">{s.label}</div>
                <div className="hl-hero-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION CARDS ──────────────────────────────── */}
      <div className="hl-cards-section">
        <div className="hl-cards-header">
          <h2 className="hl-cards-title">Choose an Analytics Domain</h2>
          <p className="hl-cards-sub">Four lenses into India's school system — each powered by the same verified UDISE+ data.</p>
        </div>

        <div className="hl-cards-grid">
          {SECTIONS.map((s, i) => (
            <button
              key={s.cat}
              className="hl-card"
              onClick={() => onShowLanding(s.cat)}
              style={{ '--card-accent': s.accent, '--card-light': s.accentLight, '--card-border': s.accentBorder }}
            >
              <div className="hl-card-top-bar" />
              <div className="hl-card-inner">
                <div className="hl-card-head">
                  <span className="hl-card-emoji">{s.emoji}</span>
                  <span className="hl-card-cat">{s.title}</span>
                </div>
                <h3 className="hl-card-h3">{s.headline}</h3>
                <p className="hl-card-desc">{s.desc}</p>

                <div className="hl-card-stats">
                  {s.stats.map((st, j) => (
                    <div key={j} className="hl-card-stat">
                      <div className="hl-card-stat-val">{st.val}</div>
                      <div className="hl-card-stat-lbl">{st.label}</div>
                    </div>
                  ))}
                </div>

                <div className="hl-card-tags">
                  {s.tags.map(t => (
                    <button
                      key={t.id}
                      className="hl-card-tag"
                      onClick={(e) => { e.stopPropagation(); onShowDashboard(t.id); }}
                    >{t.label}</button>
                  ))}
                </div>

                <div className="hl-card-cta">
                  Explore {s.title} <span>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="hl-footer">
        <div className="hl-footer-left">
          <div className="hl-footer-logo">UDISE<span>+</span></div>
          <div className="hl-footer-tagline">India's students deserve better than averages.</div>
        </div>
        <div className="hl-footer-right">
          Data Source: UDISE+ Official Base Files<br />
          Overall · Socio · MOI · Stream · Dropout · Transition: 2024–25<br />
          Migration: AY 2022–23 to 2023–24
        </div>
      </footer>
    </div>
  );
}