import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import MIGRATION_DATA from '../data/migration_data.json';

/*
 * SOURCE: migration_student_overall.csv
 * Columns used:
 *   Sum of Total Students       → total migrant count per combination
 *   Migration Type              → Intra-District / Intra-State Inter-District / Inter-State
 *   From/To School Location     → Rural / Urban (location flow)
 *   From/To Management          → school management type flow
 *   From/To BPL Yes/No          → school-level BPL student counts (ratio applied)
 *   From/To CWSN Yes/No         → school-level CWSN student counts (ratio applied)
 *
 * key={selectedYear} + selectedYear prop wired in App.jsx
 */

function toKey(yr) { return yr ? yr.replace('\u2013', '-') : null; }

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
    const obs = new IntersectionObserver(entries =>
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); animateBars(e.target); }
      }),
      { threshold: 0.06 }
    );
    document.querySelectorAll('.section:not(.visible)').forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) { first.classList.add('visible'); animateBars(first); }
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

function animateBars(s) {
  s.querySelectorAll('[data-bar-w]').forEach((el, i) =>
    setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
}

const CAT = '#2563eb';

export default function MigrationDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const { tab: tab, setTab: setTab, tabsRef, panelDir } = useTabSlider(['loc', 'mgmt']);
  useReveal(key, tab);

  const fallback = Object.keys(MIGRATION_DATA).sort().at(-1);
  const d = (key && MIGRATION_DATA[key]) ? MIGRATION_DATA[key] : MIGRATION_DATA[fallback];
  if (!d) return null;

  const {
    header, cards,
    locationRows, locationSource, locationNote,
    mgmtRows, mgmtSource, mgmtNote,
    insight1, insight2,
  } = d;

  return (
    <div className="dashboard"><section className="section socio-section">

      <div className="socio-header">
        <div>
          <div className="section-label" style={{ color: CAT }}>{header.label}</div>
          <h2 className="section-headline">{header.headline}</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
        </div>
        <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiODU2ZGZiMWItNWNhZC00NmQ3LWFjZmUtOTQyMmUxZmE4YTIwIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
          <span className="powerbi-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="3" height="10" rx="1" fill="currentColor" opacity="0.5"/><rect x="6" y="2" width="3" height="13" rx="1" fill="currentColor" opacity="0.75"/><rect x="11" y="0" width="4" height="15" rx="1" fill="currentColor"/></svg></span>
          View Full Report <span style={{ fontSize: 13, opacity: 0.7 }}>&#8599;</span>
        </button>
      </div>

      <div className="socio-cards">
        {cards.map(card => (
          <div key={card.id} className="socio-cat-card" style={{ '--cat-color': card.color }}>
            <div className="scc-top-bar" />
            <div className="scc-label" style={{ color: card.color }}>{card.label}</div>
            <div className="scc-full-label">{card.fullLabel}</div>
            <div className="scc-pct" style={{ color: card.color, fontSize: card.headline.length > 5 ? 28 : 40 }}>{card.headline}</div>
            <div className="scc-students">{card.headlineNote}</div>
            <div className="scc-bar-track"><div className="scc-bar-fill" data-bar-w={card.bar} style={{ width: 0, background: card.color }} /></div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: card.color, marginBottom: 10, marginTop: -2 }}>{card.barLabel}</div>
            <div className="scc-split">
              {card.split.map((s, i) => (
                <>
                  {i > 0 && <div key={'d'+i} className="scc-split-divider" />}
                  <div key={s.lbl} className="scc-split-item">
                    <span className="scc-split-val" style={s.accent ? { color: card.color, fontSize: 11 } : { fontSize: 10 }}>{s.val}</span>
                    <span className="scc-split-lbl" style={{ fontSize: 7 }}>{s.lbl}</span>
                  </div>
                </>
              ))}
            </div>
            <p className="scc-note">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="socio-bottom">
        <div className="socio-charts">
          <div className="socio-chart-tabs" ref={tabsRef}>
            <button className={`sct-tab ${tab==='loc'?'sct-active':''}`} onClick={()=>setTab('loc')}>Migration by School Location Movement</button>
            <button className={`sct-tab ${tab==='mgmt'?'sct-active':''}`} onClick={()=>setTab('mgmt')}>Management Type Shift (Origin &#8594; Destination)</button>
          </div>

          {tab === 'loc' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{locationSource}</div>
              <div className="states-list" style={{ marginTop: 16 }}>
                {locationRows.map(r => (
                  <div key={r.name} className="state-row" style={{ alignItems: 'flex-start', paddingBottom: 6 }}>
                    <div className="state-name" style={{ width: 148 }}>{r.name}</div>
                    <div style={{ flex: 1 }}>
                      <div className="state-track"><div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: r.color }} /></div>
                      {r.note && <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 3 }}>{r.note}</div>}
                    </div>
                    <div className="state-val" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 800, color: r.color, width: 44 }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div className="scp-note">{locationNote}</div>
            </div>
          )}

          {tab === 'mgmt' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{mgmtSource}</div>
              <div className="states-list" style={{ marginTop: 16 }}>
                {mgmtRows.map(r => (
                  <div key={r.name} className="state-row">
                    <div className="state-name" style={{ width: 168 }}>{r.name}</div>
                    <div className="state-track"><div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: r.color }} /></div>
                    <div className="state-val" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 800, color: r.color, width: 44 }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div className="scp-note">{mgmtNote}</div>
            </div>
          )}
        </div>

        <div className="socio-insights">
          <div className="stat-card socio-insight-card">
            <div className="sic-stripe" style={{ background: insight1.color }} />
            <div className="stat-card-num" style={{ color: insight1.color }}>{insight1.num}</div>
            <div className="stat-card-label">{insight1.label}</div>
            <div className="stat-card-note">{insight1.note}</div>
            <div className="sic-divider" />
            <div className="sic-delta">
              <span className="sic-delta-val" style={{ color: insight1.color }}>{insight1.delta_val}</span>
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
              <span className="sic-delta-val" style={{ color: insight2.color }}>{insight2.delta_val}</span>
              <span className="sic-delta-lbl">{insight2.delta_label}</span>
            </div>
          </div>
        </div>
      </div>

    </section></div>
  );
}