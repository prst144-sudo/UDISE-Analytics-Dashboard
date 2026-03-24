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
                Explore Dashboards
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

      {/* ── INSIGHT CARDS ──────────────────────────────── */}
      <div className="hl-insight-section">

        <div className="hl-insight-left">
          <div className="hl-insight-eyebrow">What Do We Do</div>
          <h2 className="hl-insight-title">Data Insights</h2>
          <p className="hl-insight-sub">Explore detailed dashboards on student performance, teacher analytics, and school &amp; infrastructure analytics.</p>
        </div>

        <div className="hl-insight-grid">
          {[
            {
              cat: 'student', color: '#2563eb', bg: 'rgba(37,99,235,0.07)',
              label: 'Student Analytics',
              desc: "Enrollment, dropout, transition, migration and socioeconomic trends across India's 25 crore students.",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 8.5L12 14L22 8.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 11.5v4c0 1.1 2.69 2 6 2s6-.9 6-2v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M22 8.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
              onclick: () => onShowLanding('student'),
            },
            {
              cat: 'teacher', color: '#0891b2', bg: 'rgba(8,145,178,0.07)',
              label: 'Teacher & PTR Analytics',
              desc: 'Teacher deployment, student-teacher ratios, CWSN training, gender distribution and retirement pipeline.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.6" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><rect x="2" y="14" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>,
              onclick: () => onShowLanding('teacher'),
            },
            {
              cat: 'school', color: '#6366f1', bg: 'rgba(99,102,241,0.07)',
              label: 'School Analytics',
              desc: 'School types, basic and digital infrastructure, multi-class units and single-teacher school concentrations.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 22V10l9-7 9 7v12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><rect x="9" y="15" width="4" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.4" /><rect x="15" y="13" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.4" /></svg>,
              onclick: () => onShowLanding('school'),
            },
            {
              cat: 'compare', color: '#d97706', bg: 'rgba(217,119,6,0.07)',
              label: 'Comparative Analytics',
              desc: 'Side-by-side state comparisons across enrollment, PTR, infrastructure and teacher deployment.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" /><rect x="9.75" y="7" width="4.5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" /><rect x="16.5" y="9.5" width="4.5" height="11.5" rx="1" stroke="currentColor" strokeWidth="1.5" /></svg>,
              onclick: () => onShowLanding('compare'),
            },
          ].map((card) => (
            <button key={card.cat} className="hl-insight-card" onClick={card.onclick}
              style={{ '--ic-color': card.color, '--ic-bg': card.bg }}>
              <div className="hl-ic-icon-wrap">
                {card.icon}
              </div>
              <div className="hl-ic-title">{card.label}</div>
              <div className="hl-ic-desc">{card.desc}</div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}