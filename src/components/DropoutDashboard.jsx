import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import DROPOUT_DATA from '../data/dropout_data.json';

/*
 * SOURCE: Drop_Transition_NEP_File.csv
 * Boys, Girls, Total = Dropout rates · Class = education stage
 * Socioeconomic Class = Gen/OBC/SC/ST · State = ALL INDIA (district-level aggregated)
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
  // Animate bars whenever the active tab changes
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
function animateBars(section) {
  section.querySelectorAll('[data-bar-w]').forEach((el, i) =>
    setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
}

const CAT = '#6366f1';

export default function DropoutDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const { tab: tab, setTab: setTab, tabsRef, panelDir } = useTabSlider(['class', 'soc']);
  useReveal(key, tab);

  const fallback = Object.keys(DROPOUT_DATA).sort().at(-1);
  const d = (key && DROPOUT_DATA[key]) ? DROPOUT_DATA[key] : DROPOUT_DATA[fallback];
  if (!d) return null;

  const { header, cards, chartDropClassRows, chartDropClassSource, chartDropClassNote,
          chartDropSoc, chartDropSocSource, chartDropSocNote, insight1, insight2 } = d;

  return (
    <div className="dashboard">
      <section className="section socio-section">

        <div className="socio-header">
          <div>
            <div className="section-label" style={{ color: CAT }}>{header.label}</div>
            <h2 className="section-headline">{header.headline}</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
          </div>
          <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiZGE2N2M0ZGMtMDAzOS00OWQyLTljZjgtMzBjZjIyMDBiY2YzIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
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
              <div className="scc-top-bar" />
              <div className="scc-label" style={{ color: c.color }}>{c.label}</div>
              <div className="scc-full-label">{c.fullLabel}</div>
              <div className="scc-pct" style={{ color: c.color, fontSize: c.headline.length > 5 ? 28 : 40 }}>
                {c.headline}
              </div>
              <div className="scc-students">{c.headlineNote}</div>
              <div className="scc-bar-track">
                <div className="scc-bar-fill" data-bar-w={c.bar} style={{ width: 0, background: c.color }} />
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:'0.12em',
                            textTransform:'uppercase', color:c.color, marginBottom:10, marginTop:-2 }}>
                {c.barLabel}
              </div>
              <div className="scc-split">
                {c.split.map((s, i) => (
                  <>
                    {i > 0 && <div key={'d'+i} className="scc-split-divider" />}
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

        <div className="socio-bottom">
          <div className="socio-charts">
            <div className="socio-chart-tabs" ref={tabsRef}>
              <button className={`sct-tab ${tab === 'class' ? 'sct-active' : ''}`}
                onClick={() => setTab('class')}>Dropout by Class / NEP Stage</button>
              <button className={`sct-tab ${tab === 'soc' ? 'sct-active' : ''}`}
                onClick={() => setTab('soc')}>Secondary Dropout by Socioeconomic Class</button>
            </div>

            {tab === 'class' && (
              <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{chartDropClassSource}</div>
                <div style={{ marginTop: 16 }}>
                  {chartDropClassRows.map(r => (
                    <div key={r.name} style={{ marginBottom: 18 }}>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
                                    color:'var(--ink)', marginBottom:6 }}>{r.name}</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                        {[
                          { lbl:'Overall', val:r.val,   pct:r.pct      },
                          { lbl:'Boys',    val:r.boys,  pct:r.boysPct  },
                          { lbl:'Girls',   val:r.girls, pct:r.girlsPct },
                        ].map(row => (
                          <div key={row.lbl} style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <div style={{ width:60, fontFamily:"'DM Sans',sans-serif",
                                          fontSize:9, color:'var(--muted)' }}>{row.lbl}</div>
                            <div style={{ flex:1, height:12, background:'var(--warm)',
                                          borderRadius:2, overflow:'hidden' }}>
                              <div data-bar-w={row.pct}
                                style={{ width:0, height:'100%', background:r.color, borderRadius:2,
                                         transition:'width 1.8s cubic-bezier(0.16,1,0.3,1)', opacity:0.85 }} />
                            </div>
                            <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:700,
                                          color:r.color, width:50, textAlign:'right' }}>{row.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="scp-note">{chartDropClassNote}</div>
              </div>
            )}

            {tab === 'soc' && (
              <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{chartDropSocSource}</div>
                <div className="states-list" style={{ marginTop: 16 }}>
                  {chartDropSoc.map(r => (
                    <div key={r.name} className="state-row">
                      <div className="state-name" style={{ width: 88 }}>{r.name}</div>
                      <div className="state-track">
                        <div className="state-bar" data-bar-w={r.pct} style={{ width:0, background:r.color }} />
                      </div>
                      <div className="state-val"
                        style={{ fontFamily:"'DM Sans', sans-serif", fontSize:15, fontWeight:800,
                                 color:r.color, width:52 }}>{r.val}</div>
                    </div>
                  ))}
                </div>
                <div className="scp-note">{chartDropSocNote}</div>
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

      </section>
    </div>
  );
}