import { useEffect, useRef } from 'react';
import './LandingPage.css';

export default function LandingPage({
  cat, badge, titleLine1, titleLine2, description,
  stats, modules, onShowDashboard, ctaLabel = 'Open Dashboard'
}) {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('lp-section-visible');
          // animate bars inside this section
          e.target.querySelectorAll('[data-bar-w]').forEach((el, i) => {
            setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 150 + i * 80);
          });
        }
      }),
      { threshold: 0.06 }
    );
    sectionsRef.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [modules]);

  return (
    <div className={`landing-page lp-${cat}`}>

      {/* ══ HERO ══ */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <span className="lp-badge">{badge}</span>
          <h1 className="lp-title">
            {titleLine1}<br />
            <span className="lp-title-accent">{titleLine2}</span>
          </h1>
          <p className="lp-desc">{description}</p>
          <div className="lp-hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="lp-hstat">
                <span className="lp-hstat-val">{s.val}</span>
                <span className="lp-hstat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MODULE SECTIONS ══ */}
      {modules.map((mod, i) => (
        <section
          key={mod.id}
          className={`lp-section ${i % 2 === 0 ? 'lp-section-light' : 'lp-section-warm'}`}
          ref={el => sectionsRef.current[i] = el}
        >
          <div className={`lp-section-inner ${mod.statCard ? 'lp-has-card' : ''}`}>

            {/* LEFT — content + chart */}
            <div className="lp-section-left">
              <div className="lp-sec-label">
                Section {String(i + 1).padStart(2, '0')} · {mod.title.toUpperCase()}
              </div>
              <h2 className="lp-sec-headline">{mod.headline || mod.title}</h2>
              <p className="lp-sec-desc">{mod.brief}</p>

              <div className="lp-chart">
                {mod.chartType === 'funnel'     && <FunnelChart     bars={mod.chartData} />}
                {mod.chartType === 'horizontal' && <HorizontalChart bars={mod.chartData} />}
                {mod.chartType === 'split'      && <SplitChart      bars={mod.chartData} />}
              </div>

              {mod.quote && (
                <div className="lp-pullquote">
                  <span className="lp-pullquote-bar" />
                  <div className="lp-pullquote-body">
                    <p className="lp-pullquote-text">"{mod.quote.text}"</p>
                    <span className="lp-pullquote-src">{mod.quote.src}</span>
                  </div>
                </div>
              )}

              <button className="lp-sec-cta" onClick={() => onShowDashboard(mod.id)}>
                {ctaLabel} <span className="lp-cta-arrow">→</span>
              </button>
            </div>

            {/* RIGHT — stat card (mirrors screenshot exactly) */}
            {mod.statCard && (
              <aside className="lp-section-right">
                <div className="lp-stat-card">
                  <span className="lp-stat-card-val">{mod.statCard.val}</span>
                  <span className="lp-stat-card-label">{mod.statCard.label}</span>
                  <p className="lp-stat-card-desc">{mod.statCard.desc}</p>
                </div>
              </aside>
            )}
          </div>
        </section>
      ))}

      <footer className="footer">
        <div className="footer-left">Data that drives better decisions.</div>
        <div className="footer-right">
          UDISE+ Analytics Platform · Ministry of Education, Govt. of India
        </div>
      </footer>
    </div>
  );
}

/* ══ FUNNEL CHART ══ */
function FunnelChart({ bars }) {
  return (
    <div className="chart-funnel">
      {bars.map((b, i) => (
        <div key={i} className="cfunnel-row">
          <span className="cfunnel-lbl">{b.label}</span>
          <div className="cfunnel-track">
            <div
              className={`cfunnel-fill cfunnel-fill-${i}`}
              data-bar-w={b.pct}
              style={{ width: 0 }}
            >
              <span className="cfunnel-inner-val">{b.students}</span>
            </div>
            <span className="cfunnel-side-val">{b.val}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══ HORIZONTAL CHART ══ */
function HorizontalChart({ bars }) {
  return (
    <div className="chart-horizontal">
      {bars.map((b, i) => (
        <div key={i} className="choriz-row">
          <span className="choriz-lbl">{b.label}</span>
          <div className="choriz-track">
            <div
              className="choriz-fill"
              data-bar-w={b.pct}
              style={{ width: 0 }}
            />
          </div>
          <span className="choriz-val">{b.val}</span>
        </div>
      ))}
    </div>
  );
}

/* ══ SPLIT CHART ══ */
function SplitChart({ bars }) {
  return (
    <div className="chart-split">
      {bars.map((b, i) => (
        <div key={i} className="csplit-row">
          <span className="csplit-lbl">{b.label}</span>
          <div className="csplit-bars">
            <div
              className="csplit-seg csplit-left"
              data-bar-w={b.left.pct}
              style={{ width: 0 }}
            >
              <span className="csplit-seg-val">{b.left.label} {b.left.val}</span>
            </div>
            <div
              className="csplit-seg csplit-right"
              data-bar-w={b.right.pct}
              style={{ width: 0 }}
            >
              <span className="csplit-seg-val">{b.right.label} {b.right.val}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}