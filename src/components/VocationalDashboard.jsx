import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import VOC_DATA from '../data/vocational_data.json';

/*
 * SOURCE: vocational_overall.csv
 * Columns: ac_year, Management, Category, School Location, Sponsorship Type,
 *   Equipment Status, Sum of e_content_availability, Sum of self_emp_10/12,
 *   Sum of placed10/12, Exposure Pre Upper - Primary Stage,
 *   Sum of Industry Training Hours, Sum of Theory Hours, Sum of Practical Hours
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
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('[data-bar-w]').forEach((el, i) =>
          setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
      }
    }), { threshold: 0.06 });
    document.querySelectorAll('.section:not(.visible)').forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) {
      first.classList.add('visible');
      first.querySelectorAll('[data-bar-w]').forEach((el, i) =>
        setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
    }
    return () => obs.disconnect();
  }, [dep]);

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

const CAT = '#059669';

export default function VocationalDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const { tab: tab, setTab: setTab, tabsRef, panelDir } = useTabSlider(['equip', 'hours']);
  useReveal(key, tab);

  const fallback = Object.keys(VOC_DATA).sort().at(-1);
  const d = (key && VOC_DATA[key]) ? VOC_DATA[key] : VOC_DATA[fallback];
  if (!d) return null;

  const {
    header, cards,
    equipRows, equipSource, equipNote,
    sponRows,  sponSource,  sponNote,
    hoursRows, hoursSource, hoursNote,
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
        <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiOTMzMjg4Y2YtNGI1NC00YzY4LTgyYzYtZDMwZTc3YTVjZDE2IiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
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
            <div className="scc-pct" style={{ color: c.color, fontSize: c.headline.length > 5 ? 28 : 40 }}>
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
            <button
              className={`sct-tab ${tab === 'equip' ? 'sct-active' : ''}`}
              onClick={() => setTab('equip')}>
              Equipment Status + Sponsorship Type
            </button>
            <button
              className={`sct-tab ${tab === 'hours' ? 'sct-active' : ''}`}
              onClick={() => setTab('hours')}>
              Training Hours Composition
            </button>
          </div>

          {/* Tab A — Equipment + Sponsorship (dual chart) */}
          {tab === 'equip' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{equipSource} · {sponSource}</div>
              <div className="td-dual-charts" style={{ marginTop: 16 }}>

                {/* Left: Equipment Status */}
                <div>
                  <div className="td-chart-subtitle">Equipment Functional Status</div>
                  <div className="states-list" style={{ marginTop: 10 }}>
                    {equipRows.map(r => (
                      <div key={r.name} className="state-row">
                        <div className="state-name" style={{ width: 164 }}>{r.name}</div>
                        <div className="state-track">
                          <div className="state-bar" data-bar-w={r.pct}
                            style={{ width: 0, background: r.color }}/>
                        </div>
                        <div className="state-val" style={{
                          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                          fontWeight: 800, color: r.color, width: 44,
                        }}>{r.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="td-chart-divider"/>

                {/* Right: Sponsorship Type */}
                <div>
                  <div className="td-chart-subtitle">Sponsorship Type</div>
                  <div className="states-list" style={{ marginTop: 10 }}>
                    {sponRows.map(r => (
                      <div key={r.name} className="state-row">
                        <div className="state-name" style={{ width: 140 }}>{r.name}</div>
                        <div className="state-track">
                          <div className="state-bar" data-bar-w={r.pct}
                            style={{ width: 0, background: r.color }}/>
                        </div>
                        <div className="state-val" style={{
                          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                          fontWeight: 800, color: r.color, width: 44,
                        }}>{r.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              <div className="scp-note">{equipNote} {sponNote}</div>
            </div>
          )}

          {/* Tab B — Training Hours Composition */}
          {tab === 'hours' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{hoursSource}</div>
              <div className="states-list" style={{ marginTop: 16 }}>
                {hoursRows.map(r => (
                  <div key={r.name} className="state-row">
                    <div className="state-name" style={{ width: 196 }}>{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct}
                        style={{ width: 0, background: r.color }}/>
                    </div>
                    <div className="state-val" style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                      fontWeight: 800, color: r.color, width: 44,
                    }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div className="scp-note">{hoursNote}</div>
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
              <span className="sic-delta-val" style={{ color: insight1.color }}>
                {insight1.delta_val}
              </span>
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
              <span className="sic-delta-val" style={{ color: insight2.color }}>
                {insight2.delta_val}
              </span>
              <span className="sic-delta-lbl">{insight2.delta_label}</span>
            </div>
          </div>

        </div>
      </div>

    </section></div>
  );
}