import HBarChart from './HBarChart';
import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import PTR_DATA from '../data/ptr_data.json';

/*
 * SOURCE: ptr_teacher_final_overall.csv
 * selectedYear prop comes from App.jsx via ContextBar dropdown (format: '2024–25').
 * Mapped to JSON key '2024-25' by replacing en-dash with hyphen.
 * Data is in PTR_DATA[key].teacher
 */

function toJsonKey(ctxYear) {
  return ctxYear ? ctxYear.replace('–', '-') : null;
}

function animateBars(container) {
  (container || document).querySelectorAll('[data-bar-w]').forEach((el, i) => {
    setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90);
  });
}

function useReveal(dep) {
  const prevDep = useRef(null);
  useEffect(() => {
    const isYearChange = prevDep.current !== null && prevDep.current !== dep;
    prevDep.current = dep;

    if (isYearChange) {
      document.querySelectorAll('[data-bar-w]').forEach(el => { el.style.width = '0%'; });
      setTimeout(() => { animateBars(document); }, 30);
      return;
    }

    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        animateBars(e.target);
      }
    }), { threshold: 0.06 });
    document.querySelectorAll('.section:not(.visible)').forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) { first.classList.add('visible'); animateBars(first); }
    return () => obs.disconnect();
  }, [dep]);
}

const CAT = '#0891b2';

export default function TeacherDashboard({ selectedYear, onShowPowerBi }) {
  const jsonKey = toJsonKey(selectedYear);
  const { tab: tab, setTab: setTab, tabsRef, panelDir } = useTabSlider(['ptr', 'deficit']);
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
  }, [tab]);

  const d = jsonKey ? PTR_DATA[jsonKey] : null;
  const fallbackKey = Object.keys(PTR_DATA).sort().at(-1);
  const yearData = (d ?? PTR_DATA[fallbackKey]);
  if (!yearData || !yearData.teacher) return null;

  const {
    header, cards,
    chartCat, chartCatSource, chartCatNote,
    chartDeficitMgmt, chartDeficitMgmtSource, chartDeficitMgmtNote,
    insight1, insight2,
  } = yearData.teacher;

  return (
    <div className="dashboard">
      <section className="section socio-section">
        <div className="socio-header">
          <div>
            <div className="section-label" style={{ color: CAT }}>{header.label}</div>
            <h2 className="section-headline">{header.headline}</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
          </div>
          <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiOWY0YmE3ZDUtM2VmMy00N2Q1LWJhZDItN2JlMTM3ZDE4MTQzIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
            <span className="powerbi-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="5" width="3" height="10" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="6" y="2" width="3" height="13" rx="1" fill="currentColor" opacity="0.75"/>
                <rect x="11" y="0" width="4" height="15" rx="1" fill="currentColor"/>
              </svg>
            </span>
            View Full Report <span style={{ fontSize: 13, opacity: 0.7 }}>↗</span>
          </button>
        </div>

        <div className="socio-cards">
          {cards.map(c => (
            <div key={c.id} className="socio-cat-card" style={{ '--cat-color': c.color }}>
              <div className="scc-top-bar"/>
              <div className="scc-label" style={{ color: c.color }}>{c.label}</div>
              <div className="scc-full-label">{c.fullLabel}</div>
              <div className="scc-pct" style={{ color: c.color, fontSize: c.headline.length > 5 ? 28 : 40 }}>
                {c.headline}
              </div>
              <div className="scc-students">{c.headlineNote}</div>
              <div className="scc-bar-track">
                <div className="scc-bar-fill" data-bar-w={c.bar} style={{ width: 0, background: c.color }}/>
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.color, marginBottom: 10, marginTop: -2 }}>
                {c.barLabel}
              </div>
              <div className="scc-split">
                {c.split.map((s, i) => (
                  <>
                    {i > 0 && <div key={'d' + i} className="scc-split-divider"/>}
                    <div key={s.lbl} className="scc-split-item">
                      <span className="scc-split-val" style={s.accent ? { color: c.color, fontSize: 11 } : { fontSize: 10 }}>
                        {s.val}
                      </span>
                      <span className="scc-split-lbl" style={{ fontSize: 7 }}>{s.lbl}</span>
                    </div>
                  </>
                ))}
              </div>
              <p className="scc-note">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="socio-bottom">
          <div className="socio-charts">
            <div className="socio-chart-tabs" ref={tabsRef}>
              <button className={`sct-tab ${tab === 'ptr' ? 'sct-active' : ''}`} onClick={() => setTab('ptr')}>
                PTR by School Category
              </button>
              <button className={`sct-tab ${tab === 'deficit' ? 'sct-active' : ''}`} onClick={() => setTab('deficit')}>
                Teacher Deficit by Management Type
              </button>
            </div>

            {tab === 'ptr' && (
              <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{chartCatSource}</div>
                <HBarChart data={chartCat} nameWidth={160} />
                <div className="scp-note">{chartCatNote}</div>
              </div>
            )}

            {tab === 'deficit' && (
              <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{chartDeficitMgmtSource}</div>
                <HBarChart data={chartDeficitMgmt} nameWidth={168} />
                <div className="scp-note">{chartDeficitMgmtNote}</div>
              </div>
            )}
          </div>

          <div className="socio-insights">
            <div className="stat-card socio-insight-card">
              <div className="sic-stripe" style={{ background: insight1.color }}/>
              <div className="stat-card-num" style={{ color: insight1.color }}>{insight1.num}</div>
              <div className="stat-card-label">{insight1.label}</div>
              <div className="sic-divider"/>
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight1.color }}>{insight1.delta_val}</span>
                <span className="sic-delta-lbl">{insight1.delta_label}</span>
              </div>
              <div className="sic-divider"/>
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight1.color }}>{insight1.delta_val2}</span>
                <span className="sic-delta-lbl">{insight1.delta_label2}</span>
              </div>
            </div>

            <div className="stat-card socio-insight-card">
              <div className="sic-stripe" style={{ background: insight2.color }}/>
              <div className="stat-card-num" style={{ color: insight2.color }}>{insight2.num}</div>
              <div className="stat-card-label">{insight2.label}</div>
              <div className="sic-divider"/>
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight2.color }}>{insight2.delta_val}</span>
                <span className="sic-delta-lbl">{insight2.delta_label}</span>
              </div>
              <div className="sic-divider"/>
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight2.color }}>{insight2.delta_val2}</span>
                <span className="sic-delta-lbl">{insight2.delta_label2}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}