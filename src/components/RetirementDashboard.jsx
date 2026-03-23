import HBarChart from './HBarChart';
import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import RETIRE_DATA from '../data/retirement_data.json';

/*
 * SOURCE: teacher_retirement_overall.csv
 * Columns: Academic Year, Management, School Category, Nature of Appointment,
 *   Sum of teacherage_52 … teacherage_65, Sum of teacherage_morethen_65,
 *   Sum of Total Teachers, Total School
 * key={selectedYear} + selectedYear prop wired in App.jsx
 */

function toKey(yr) { return yr ? yr.replace('–', '-') : null; }

function useReveal(dep, tab) {
  const prev = useRef(null);
  useEffect(() => {
    const changed = prev.current !== null && prev.current !== dep;
    prev.current = dep;
    if (changed) {
      document.querySelectorAll('[data-bar-w]').forEach(el => { el.style.width = '0%'; });
      setTimeout(() => {
        document.querySelectorAll('[data-bar-w]').forEach((el, i) =>
          setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
      }, 30);
      return;
    }
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible');
        e.target.querySelectorAll('[data-bar-w]').forEach((el,i) =>
          setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
      }
    }), { threshold: 0.06 });
    document.querySelectorAll('.section:not(.visible)').forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) { first.classList.add('visible'); first.querySelectorAll('[data-bar-w]').forEach((el,i) => setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90)); }
    return () => obs.disconnect();
  }, [dep]);

  // Animate bars whenever tab changes
  useEffect(() => {
    if (tab === undefined) return;
    const els = document.querySelectorAll('[data-bar-w]');
    els.forEach(el => { el.style.transition = 'none'; el.style.width = '0%'; });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      els.forEach((el, i) => {
        el.style.transition = '';
        setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 60 + i * 80);
      });
    }));
  }, [tab]);
}

const CAT = '#d97706';

export default function RetirementDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const { tab: tab, setTab: setTab, tabsRef, panelDir } = useTabSlider(['age', 'cat', 'mgmt']);
  useReveal(key, tab);

  const fallback = Object.keys(RETIRE_DATA).sort().at(-1);
  const d = (key && RETIRE_DATA[key]) ? RETIRE_DATA[key] : RETIRE_DATA[fallback];
  if (!d) return null;

  const {
    header, cards,
    ageBands, ageBandsSource, ageBandsNote,
    catRetireRows, catRetireSource, catRetireNote,
    mgmtRetireRows, mgmtRetireSource, mgmtRetireNote,
    insight1, insight2,
  } = d;

  return (
    <div className="dashboard"><section className="section socio-section">

      {/* ── HEADER ──────────────────────────────────── */}
      <div className="socio-header">
        <div>
          <div className="section-label" style={{ color: CAT }}>{header.label}</div>
          <h2 className="section-headline">{header.headline}</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
        </div>
        <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiMDYyYjYxYWQtZjgxYS00ZGY1LTkyYTMtM2NlMDU3OWVhYjQ3IiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
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

      {/* ── 4 CARDS ─────────────────────────────────── */}
      <div className="socio-cards">
        {cards.map(c => (
          <div key={c.id} className="socio-cat-card" style={{ '--cat-color': c.color }}>
            <div className="scc-top-bar"/>
            <div className="scc-label" style={{ color: c.color }}>{c.label}</div>
            <div className="scc-full-label">{c.fullLabel}</div>
            <div className="scc-pct" style={{ color: c.color, fontSize: c.headline.length > 5 ? 30 : 40 }}>
              {c.headline}
            </div>
            <div className="scc-students">{c.headlineNote}</div>
            <div className="scc-bar-track">
              <div className="scc-bar-fill" data-bar-w={c.bar} style={{ width: 0, background: c.color }}/>
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 9,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: c.color, marginBottom: 10, marginTop: -2,
            }}>{c.barLabel}</div>
            <div className="scc-split">
              {c.split.map((s, i) => (
                <>
                  {i > 0 && <div key={'d' + i} className="scc-split-divider"/>}
                  <div key={s.lbl} className="scc-split-item">
                    <span className="scc-split-val"
                      style={s.accent ? { color: c.color, fontSize: 11 } : { fontSize: 10 }}>
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

      {/* ── BOTTOM ──────────────────────────────────── */}
      <div className="socio-bottom">

        {/* LEFT — tabbed charts */}
        <div className="socio-charts">
          <div className="socio-chart-tabs" ref={tabsRef}>
            <button className={`sct-tab ${tab === 'age'  ? 'sct-active' : ''}`} onClick={() => setTab('age')}>
              Teacher Age Profile (All Bands)
            </button>
            <button className={`sct-tab ${tab === 'cat'  ? 'sct-active' : ''}`} onClick={() => setTab('cat')}>
              Retirement Wave by School Category
            </button>
            <button className={`sct-tab ${tab === 'mgmt' ? 'sct-active' : ''}`} onClick={() => setTab('mgmt')}>
              Retirement Wave by Management
            </button>
          </div>

          {/* Chart A — age bands */}
          {tab === 'age' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{ageBandsSource}</div>
              <HBarChart data={ageBands} nameWidth={160} />
              <div className="scp-note">{ageBandsNote}</div>
            </div>
          )}

          {/* Chart B — by school category */}
          {tab === 'cat' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{catRetireSource}</div>
              <HBarChart data={catRetireRows} nameWidth={164} />
              <div className="scp-note">{catRetireNote}</div>
            </div>
          )}

          {/* Chart C — by management */}
          {tab === 'mgmt' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{mgmtRetireSource}</div>
              <HBarChart data={mgmtRetireRows} nameWidth={164} />
              <div className="scp-note">{mgmtRetireNote}</div>
            </div>
          )}
        </div>

        {/* RIGHT — 2 insight cards */}
        <div className="socio-insights">

          <div className="stat-card socio-insight-card">
            <div className="sic-stripe" style={{ background: insight1.color }}/>
            <div className="stat-card-num" style={{ color: insight1.color }}>{insight1.num}</div>
            <div className="stat-card-label">{insight1.label}</div>
            <div className="stat-card-note">{insight1.note}</div>
            <div className="sic-divider"/>
            <div className="sic-delta">
              <span className="sic-delta-val" style={{ color: insight1.color }}>{insight1.delta_val}</span>
              <span className="sic-delta-lbl">{insight1.delta_label}</span>
            </div>
          </div>

          <div className="stat-card socio-insight-card">
            <div className="sic-stripe" style={{ background: insight2.color }}/>
            <div className="stat-card-num" style={{ color: insight2.color }}>{insight2.num}</div>
            <div className="stat-card-label">{insight2.label}</div>
            <div className="stat-card-note">{insight2.note}</div>
            <div className="sic-divider"/>
            <div className="sic-delta">
              <span className="sic-delta-val" style={{ color: insight2.color }}>{insight2.delta_val}</span>
              <span className="sic-delta-lbl">{insight2.delta_label}</span>
            </div>
          </div>

        </div>
      </div>

    </section></div>
  );
}