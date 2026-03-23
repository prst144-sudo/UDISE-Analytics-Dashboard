import HBarChart from './HBarChart';
import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import SCHOOL_DATA from '../data/school_data.json';

/*
 * SOURCE: full_school_data_overall__1_.csv
 * Columns: total_schools, ptr_above/below_30_schools, total_male/female_students,
 *          total_male/female_teachers_category, total_students, total_teachers_category,
 *          Management, School Category, School Location
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
function animateBars(s) {
  s.querySelectorAll('[data-bar-w]').forEach((el, i) =>
    setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90));
}

const CAT = '#6366f1';

export default function SchoolDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const { tab: activeTab, setTab: setActiveTab, tabsRef, panelDir } = useTabSlider(['mgmt', 'ptr']);
  useReveal(key, activeTab);

  const fallback = Object.keys(SCHOOL_DATA).sort().at(-1);
  const d = (key && SCHOOL_DATA[key]) ? SCHOOL_DATA[key] : SCHOOL_DATA[fallback];
  if (!d) return null;

  const { header, cards, mgmtCountRows, mgmtEnrolRows, mgmtSource, mgmtNote,
          ptrLocRows, ptrCatRows, ptrSource, ptrNote, insight1, insight2 } = d;

  return (
    <div className="dashboard">
      <section className="section socio-section">

        {/* ── HEADER ──────────────────────────────────── */}
        <div className="socio-header">
          <div>
            <div className="section-label" style={{ color: CAT }}>{header.label}</div>
            <h2 className="section-headline">{header.headline}</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
          </div>
          <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiYjczNzQ1MmYtODZiNi00NzAzLTg5NTctMTc3NjNmY2QyNTZiIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
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
          {cards.map(card => (
            <div key={card.id} className="socio-cat-card" style={{ '--cat-color': card.color }}>
              <div className="scc-top-bar" />
              <div className="scc-label" style={{ color: card.color }}>{card.label}</div>
              <div className="scc-full-label">{card.fullLabel}</div>
              <div className="scc-pct"
                style={{ color: card.color, fontSize: card.headline.length > 5 ? 32 : 40 }}>
                {card.headline}
              </div>
              <div className="scc-students">{card.headlineNote}</div>
              <div className="scc-bar-track">
                <div className="scc-bar-fill" data-bar-w={card.bar}
                  style={{ width: 0, background: card.color }} />
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: card.color, marginBottom: 10, marginTop: -2,
              }}>{card.barLabel}</div>
              <div className="scc-split">
                {card.split.map((s, i) => (
                  <>
                    {i > 0 && <div key={'d' + i} className="scc-split-divider" />}
                    <div key={s.lbl} className="scc-split-item">
                      <span className="scc-split-val"
                        style={s.accent ? { color: card.color, fontSize: 12 } : { fontSize: 11 }}>
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

        {/* ── BOTTOM ──────────────────────────────────── */}
        <div className="socio-bottom">

          {/* LEFT — charts */}
          <div className="socio-charts">
            <div className="socio-chart-tabs" ref={tabsRef}>
              <button className={`sct-tab ${activeTab === 'mgmt' ? 'sct-active' : ''}`}
                onClick={() => setActiveTab('mgmt')}>
                Schools by Management Type
              </button>
              <button className={`sct-tab ${activeTab === 'ptr' ? 'sct-active' : ''}`}
                onClick={() => setActiveTab('ptr')}>
                PTR Compliance by Location &amp; Category
              </button>
            </div>

            {/* CHART A — Management breakdown */}
            {activeTab === 'mgmt' && (
              <div key={activeTab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{mgmtSource}</div>
                <div className="td-dual-charts" style={{ marginTop: 16 }}>
                  <div>
                    <div className="td-chart-subtitle">School Count Share</div>
                    <HBarChart data={mgmtCountRows} nameWidth={160} />
                  </div>
                  <div className="td-chart-divider" />
                  <div>
                    <div className="td-chart-subtitle">Student Enrollment Share</div>
                    <HBarChart data={mgmtEnrolRows} nameWidth={160} />
                  </div>
                </div>
                <div className="scp-note">{mgmtNote}</div>
              </div>
            )}

            {/* CHART B — PTR by location + category */}
            {activeTab === 'ptr' && (
              <div key={activeTab} className="socio-chart-panel" data-dir={panelDir}>
                <div className="scp-source">{ptrSource}</div>
                <div className="td-dual-charts" style={{ marginTop: 16 }}>
                  <div>
                    <div className="td-chart-subtitle">Compliance by Location</div>
                    <HBarChart data={ptrLocRows} nameWidth={160} />
                  </div>
                  <div className="td-chart-divider" />
                  <div>
                    <div className="td-chart-subtitle">Compliance by School Category</div>
                    <HBarChart data={ptrCatRows} nameWidth={160} />
                  </div>
                </div>
                <div className="scp-note">{ptrNote}</div>
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