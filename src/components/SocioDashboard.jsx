import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import SOCIO_DATA from '../data/socio_data.json';

/*
 * SOURCE: student_socio_state_2026
 * selectedYear prop comes from App.jsx via ContextBar dropdown (format: '2024–25').
 * Mapped to JSON key by replacing en-dash with hyphen.
 */

// Map ContextBar format '2024–25' → JSON key '2024-25'
function toJsonKey(ctxYear) {
  return ctxYear ? ctxYear.replace('–', '-') : null;
}

function useReveal(dep) {
  const prevDep = useRef(null);
  useEffect(() => {
    const isYearChange = prevDep.current !== null && prevDep.current !== dep;
    prevDep.current = dep;

    if (isYearChange) {
      document.querySelectorAll('[data-bar-w]').forEach(el => { el.style.width = '0%'; });
      setTimeout(() => {
        document.querySelectorAll('[data-bar-w]').forEach((el, i) => {
          setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90);
        });
      }, 30);
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); animateBars(e.target); }
      });
    }, { threshold: 0.06 });
    const els = document.querySelectorAll('.section:not(.visible)');
    els.forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) { first.classList.add('visible'); animateBars(first); }
    return () => obs.disconnect();
  }, [dep]);
}

function animateBars(section) {
  section.querySelectorAll('[data-bar-w]').forEach((el, i) => {
    setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90);
  });
}

export default function SocioDashboard({ selectedYear, onShowPowerBi }) {
  const jsonKey = toJsonKey(selectedYear);
  const { tab: localTab, setTab: setLocalTab, tabsRef, panelDir } = useTabSlider(['gpi', 'level']);
  useReveal(jsonKey);
  // Animate bars on tab change
  useEffect(() => {
    // Two-frame sequence: reset → paint → animate (avoids browser batching)
    const els = document.querySelectorAll('[data-bar-w]');
    els.forEach(el => { el.style.transition = 'none'; el.style.width = '0%'; });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      els.forEach((el, i) => {
        el.style.transition = '';
        setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 60 + i * 80);
      });
    }));
  }, [localTab]);

  const d = jsonKey ? SOCIO_DATA[jsonKey] : null;

  // Fallback to latest available year if key not found
  const fallbackKey = Object.keys(SOCIO_DATA).sort().at(-1);
  const data = d ?? SOCIO_DATA[fallbackKey];
  if (!data) return null;

  const { header, cards, chartGpi, chartGpiNote, chartGpiSource,
          chartLevel, chartLevelNote, chartLevelSource, insight1, insight2 } = data;

  return (
    <div className="dashboard">
      <section className="section socio-section">

        {/* ── HEADER ──────────────────────────────────── */}
        <div className="socio-header">
          <div>
            <div className="section-label">{header.label}</div>
            <h2 className="section-headline">{header.headline}</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
          </div>
          <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiYTg2NWIxYWItMjU1Yi00MmM2LTliYjgtZGQzZjA3YTFkMzM0IiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
            <span className="powerbi-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="5" width="3" height="10" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="6" y="2" width="3" height="13" rx="1" fill="currentColor" opacity="0.75"/>
                <rect x="11" y="0" width="4" height="15" rx="1" fill="currentColor"/>
              </svg>
            </span>
            View Full Report
            <span style={{ fontSize: 13, opacity: 0.7 }}>↗</span>
          </button>
        </div>

        {/* ── 4 CATEGORY CARDS ────────────────────────── */}
        <div className="socio-cards">
          {cards.map(cat => (
            <div key={cat.id} className="socio-cat-card"
              style={{ '--cat-color': cat.color }}
            >
              <div className="scc-top-bar" />
              <div className="scc-label" style={{ color: cat.color }}>{cat.label}</div>
              <div className="scc-full-label">{cat.fullLabel}</div>
              <div className="scc-pct" style={{ color: cat.color }}>{cat.pct}</div>
              <div className="scc-students">{cat.students}</div>

              <div className="scc-bar-track">
                <div className="scc-bar-fill" data-bar-w={cat.bar}
                  style={{ width: 0, background: cat.color }} />
              </div>

              <div className="scc-split">
                <div className="scc-split-item">
                  <span className="scc-split-val">{cat.boys}</span>
                  <span className="scc-split-lbl">Boys</span>
                </div>
                <div className="scc-split-divider" />
                <div className="scc-split-item">
                  <span className="scc-split-val">{cat.girls}</span>
                  <span className="scc-split-lbl">Girls</span>
                </div>
                <div className="scc-split-divider" />
                <div className="scc-split-item">
                  <span className="scc-split-val" style={{ color: cat.color }}>{cat.gpi}</span>
                  <span className="scc-split-lbl">GPI</span>
                </div>
              </div>

              <p className="scc-note">{cat.note}</p>
            </div>
          ))}
        </div>

        {/* ── BOTTOM: chart panel + 2 insight cards ────── */}
        <div className="socio-bottom">

          {/* LEFT — tabbed chart */}
          <div className="socio-charts">
            <div className="socio-chart-tabs" ref={tabsRef}>
              <button
                className={`sct-tab ${localTab === 'gpi' ? 'sct-active' : ''}`}
                onClick={() => setLocalTab('gpi')}
              >
                Gender Parity Index by Category
              </button>
              <button
                className={`sct-tab ${localTab === 'level' ? 'sct-active' : ''}`}
                onClick={() => setLocalTab('level')}
              >
                SC + ST Share by Education Level
              </button>
            </div>

            {/* Chart A: GPI by category */}
            {localTab === 'gpi' && (
              <div key={localTab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{chartGpiSource}</div>
                <div className="states-list" style={{ marginTop: 16 }}>
                  {chartGpi.map(r => (
                    <div key={r.name} className="state-row">
                      <div className="state-name" style={{ width: 90 }}>{r.name}</div>
                      <div className="state-track">
                        <div className="state-bar" data-bar-w={r.pct}
                          style={{ width: 0, background: r.color }} />
                      </div>
                      <div className="state-val"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 800, color: r.color, width: 52 }}>
                        {r.val}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="scp-note">{chartGpiNote}</div>
              </div>
            )}

            {/* Chart B: SC+ST share by education level */}
            {localTab === 'level' && (
              <div key={localTab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{chartLevelSource}</div>
                <div className="states-list" style={{ marginTop: 16 }}>
                  {chartLevel.map(r => (
                    <div key={r.name} className="state-row">
                      <div className="state-name" style={{ width: 120 }}>{r.name}</div>
                      <div className="state-track">
                        <div className="state-bar" data-bar-w={r.pct}
                          style={{ width: 0, background: r.color }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: 88, flexShrink: 0 }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 800, color: r.color }}>{r.val}</span>
                        <span style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.06em' }}>SC {r.scPct} · ST {r.stPct}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="scp-note">{chartLevelNote}</div>
              </div>
            )}
          </div>

          {/* RIGHT — 2 insight stat cards */}
          <div className="socio-insights">

            <div className="stat-card socio-insight-card">
              <div className="sic-stripe" style={{ background: insight1.color }} />
              <div className="stat-card-num" style={{ color: insight1.color }}>{insight1.num}</div>
              <div className="stat-card-label">{insight1.label}</div>
              <div className="sic-divider" />
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight1.delta1_color }}>{insight1.delta1_val}</span>
                <span className="sic-delta-lbl">{insight1.delta1_label}</span>
              </div>
              <div className="sic-divider" />
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight1.delta2_color }}>{insight1.delta2_val}</span>
                <span className="sic-delta-lbl">{insight1.delta2_label}</span>
              </div>
            </div>

            <div className="stat-card socio-insight-card">
              <div className="sic-stripe" style={{ background: insight2.color }} />
              <div className="stat-card-num" style={{ color: insight2.color }}>{insight2.num}</div>
              <div className="stat-card-label">{insight2.label}</div>
              <div className="sic-divider" />
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight2.delta1_color }}>{insight2.delta1_val}</span>
                <span className="sic-delta-lbl">{insight2.delta1_label}</span>
              </div>
              <div className="sic-divider" />
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight2.delta2_color }}>{insight2.delta2_val}</span>
                <span className="sic-delta-lbl">{insight2.delta2_label}</span>
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}