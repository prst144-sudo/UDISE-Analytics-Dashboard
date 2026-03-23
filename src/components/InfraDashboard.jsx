import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import INFRA_DATA from '../data/infra_data.json';

/*
 * SOURCES:
 *   basic_infra_overall.csv    → electricity_yn, drink_water_yn, toilet_yn, tinkering_lab_yn
 *   cwsn_infra_overall.csv     → ramps_yn, handrails_yn, toiletb/g_cwsn_fun, cwsn_total
 *   digital_infra_overall.csv  → internet_yn, computer_yn, broadband_yn, tot_computer
 *   Health___Hygiene_infra_overall.csv  → medchk_yn, handwash_meal, handwast_toilet, water_tested_yn
 *   Green_sustainable_infra_overall.csv → water_purifier_yn, water_tested_yn, handwast_toilet, toiletg_fun
 *
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
      if (e.isIntersecting) { e.target.classList.add('visible'); animateBars(e.target); }
    }), { threshold: 0.06 });
    document.querySelectorAll('.section:not(.visible)').forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) { first.classList.add('visible'); animateBars(first); }
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

function animateBars(s) {
  s.querySelectorAll('[data-bar-w]').forEach((el, i) =>
    setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
}

/* ── Section selector config ─────────────────────────── */
const SECTIONS = [
  { key: 'basic', label: 'Basic Infrastructure' },
  { key: 'cwsn', label: 'CWSN Accessibility' },
  { key: 'digital', label: 'Digital Infrastructure' },
  { key: 'health', label: 'Health & Hygiene' },
  { key: 'green', label: 'Green & Sustainable' },
];

const SECTION_PBI = {
  basic: 'https://app.powerbi.com/view?r=eyJrIjoiZTFmOTA0ODctYjUwNS00OGE4LWE1YjEtMzRmMjI5MmFlNzdhIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9',
  cwsn: 'https://app.powerbi.com/view?r=eyJrIjoiNDY5ZDI2YjUtOGNlMy00YTY0LWI0YjUtYzZhZDhjMGE3ZDUyIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9',
  digital: 'https://app.powerbi.com/view?r=eyJrIjoiNDQ0MDBmMjQtMWZlMi00ZWQ4LWE2MjYtZWRhMmRmMDgxZGZiIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9',
  health: 'https://app.powerbi.com/view?r=eyJrIjoiZjg3NWJlZjQtYjU4YS00MjFlLWJkZDAtY2RmZTMzNWQ3MTM0IiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9',
  green: 'https://app.powerbi.com/view?r=eyJrIjoiNmY0ZTNiZDQtYTViMi00ZmRkLWE5YjAtMjcwZWUzNDVlNmYzIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9',
};

/* ── Grouped multi-indicator bar row ─────────────────── */
function GroupedRow({ row, indicators }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11, fontWeight: 600, color: 'var(--ink)', marginBottom: 6,
      }}>
        {row.name}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {indicators.map(ind => {
          const pct = row[ind.key] ?? 0;
          const val = row[ind.key + 'Val'] ?? `${pct}%`;
          return (
            <div key={ind.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: 2,
                background: ind.color, flexShrink: 0,
              }} />
              <div style={{
                flex: 1, height: 12, background: 'var(--warm)',
                borderRadius: 2, overflow: 'hidden',
              }}>
                <div
                  data-bar-w={pct}
                  style={{
                    width: 0, height: '100%',
                    background: ind.color,
                    borderRadius: 2,
                    transition: 'width 1.8s cubic-bezier(0.16,1,0.3,1)',
                    opacity: 0.85,
                  }}
                />
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 700, color: ind.color,
                width: 34, textAlign: 'right', flexShrink: 0,
              }}>{val}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function InfraDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const [section, setSection] = useState('basic');
  const { tab: activeTab, setTab: setActiveTab, tabsRef, panelDir } = useTabSlider(['mgmt', 'category']);

  // Combine both tab vars for animation
  const tabCombo = `${section}-${activeTab}`;
  useReveal(key, tabCombo);

  const fallback = Object.keys(INFRA_DATA).sort().at(-1);
  const yearData = (key && INFRA_DATA[key]) ? INFRA_DATA[key] : INFRA_DATA[fallback];
  if (!yearData) return null;

  const d = yearData[section];
  if (!d) return null;

  const {
    header, indicators, cards,
    mgmtComparison, mgmtSource, mgmtNote,
    categoryRows, catSource, catNote,
    insight1, insight2,
  } = d;

  const CAT = '#6366f1';

  return (
    <div className="dashboard">
      <section className="section socio-section" style={{ paddingTop: 24 }}>

        {/* ── SECTION SWITCHER ───────────────────────── */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap',
          marginBottom: 24, paddingBottom: 16,
          borderBottom: '1px solid var(--rule)',
        }}>
          {SECTIONS.map(s => (
            <button
              key={s.key}
              onClick={() => { setSection(s.key); setActiveTab('mgmt'); }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: section === s.key ? 700 : 500,
                letterSpacing: '0.06em',
                padding: '6px 14px', borderRadius: 4, border: 'none',
                cursor: 'pointer',
                background: section === s.key ? CAT : 'var(--warm)',
                color: section === s.key ? '#fff' : 'var(--muted)',
                transition: 'all 0.2s ease',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* ── HEADER ──────────────────────────────────── */}
        <div className="socio-header">
          <div>
            <div className="section-label" style={{ color: CAT }}>{header.label}</div>
            <h2 className="section-headline">{header.headline}</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
          </div>
          <button className="powerbi-btn" onClick={() => onShowPowerBi?.(SECTION_PBI[section])}>
            <span className="powerbi-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="5" width="3" height="10" rx="1" fill="currentColor" opacity="0.5" />
                <rect x="6" y="2" width="3" height="13" rx="1" fill="currentColor" opacity="0.75" />
                <rect x="11" y="0" width="4" height="15" rx="1" fill="currentColor" />
              </svg>
            </span>
            View Full Report
            <span style={{ fontSize: 13, opacity: 0.7 }}>↗</span>
          </button>
        </div>

        {/* ── 4 INDICATOR CARDS ───────────────────────── */}
        <div className="socio-cards">
          {cards.map(card => (
            <div key={card.id} className="socio-cat-card"
              style={{ '--cat-color': card.color }}>
              <div className="scc-top-bar" />
              <div className="scc-label" style={{ color: card.color }}>{card.label}</div>
              <div className="scc-full-label">{card.fullLabel}</div>
              <div className="scc-pct" style={{ color: card.color }}>{card.headline}</div>
              <div className="scc-students">{card.headlineNote}</div>

              <div className="scc-bar-track">
                <div className="scc-bar-fill" data-bar-w={card.bar}
                  style={{ width: 0, background: card.color }} />
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: card.color, marginBottom: 0, marginTop: 2,
              }}>{card.barLabel}</div>

              <div className="scc-split">
                {card.split.map((s, i) => (
                  <>
                    {i > 0 && <div key={'d' + i} className="scc-split-divider" />}
                    <div key={s.lbl} className="scc-split-item">
                      <span className="scc-split-val"
                        style={s.accent ? { color: card.color, fontSize: 11 } : { fontSize: 11 }}>
                        {s.val}
                      </span>
                      <span className="scc-split-lbl" style={{ fontSize: 7 }}>{s.lbl}</span>
                    </div>
                  </>
                ))}
              </div>
              <p className="scc-note">{card.note}</p>
            </div>
          ))}
        </div>

        {/* ── BOTTOM: chart + 2 insight cards ─────────── */}
        <div className="socio-bottom">

          {/* LEFT — tabbed charts */}
          <div className="socio-charts">

            {/* Indicator legend */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
              {indicators.map(ind => (
                <div key={ind.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 2, background: ind.color,
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                    color: 'var(--muted)', letterSpacing: '0.06em',
                  }}>{ind.label}</span>
                </div>
              ))}
            </div>

            <div className="socio-chart-tabs" ref={tabsRef}>
              <button className={`sct-tab ${activeTab === 'mgmt' ? 'sct-active' : ''}`}
                onClick={() => setActiveTab('mgmt')}>
                Coverage by Management Type
              </button>
              <button className={`sct-tab ${activeTab === 'category' ? 'sct-active' : ''}`}
                onClick={() => setActiveTab('category')}>
                Coverage by School Category
              </button>
            </div>

            {/* CHART A — by management */}
            {activeTab === 'mgmt' && (
              <div key={tabCombo} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{mgmtSource}</div>
                <div style={{ marginTop: 20 }}>
                  {mgmtComparison.map(row => (
                    <GroupedRow key={row.name} row={row} indicators={indicators} />
                  ))}
                </div>
                <div className="scp-note">{mgmtNote}</div>
              </div>
            )}

            {/* CHART B — by school category */}
            {activeTab === 'category' && (
              <div key={tabCombo} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{catSource}</div>
                <div style={{ marginTop: 20 }}>
                  {categoryRows.map(row => (
                    <GroupedRow key={row.name} row={row} indicators={indicators} />
                  ))}
                </div>
                <div className="scp-note">{catNote}</div>
              </div>
            )}
          </div>

          {/* RIGHT — 2 insight cards */}
          <div className="socio-insights">

            <div className="stat-card socio-insight-card">
              <div className="sic-stripe" style={{ background: insight1.color }} />
              <div className="stat-card-num" style={{ color: insight1.color }}>{insight1.num}</div>
              <div className="stat-card-label">{insight1.label}</div>
              <div className="stat-card-note">{insight1.note}</div>
              <div className="sic-divider" />
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight1.color }}>
                  {insight1.delta_val}
                </span>
                <span className="sic-delta-lbl">{insight1.delta_label}</span>
              </div>
            </div>

            <div className="stat-card socio-insight-card">
              <div className="sic-stripe" style={{ background: insight2.color }} />
              <div className="stat-card-num" style={{ color: insight2.color }}>{insight2.num}</div>
              <div className="stat-card-label">{insight2.label}</div>
              <div className="stat-card-note">{insight2.note}</div>
              <div className="sic-divider" />
              <div className="sic-delta">
                <span className="sic-delta-val" style={{ color: insight2.color }}>
                  {insight2.delta_val}
                </span>
                <span className="sic-delta-lbl">{insight2.delta_label}</span>
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}