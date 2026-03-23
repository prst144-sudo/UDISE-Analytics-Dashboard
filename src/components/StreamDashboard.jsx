import HBarChart from './HBarChart';
import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import STREAM_DATA from '../data/stream_data.json';

/*
 * SOURCES: student_stream_overall + sch_stream_2325_overall
 *          + school_lab_infra_2325_overall + teacher_total_2325_overall
 * student_stream: academic_year, Class, Stream, Gender, students, Management, School Category, School Location
 * sch_stream: school_count_tot, school_count_hsec, sch_arts/sci/comer/voc/oth_stream, sch_any_stream
 * school_lab_infra: phy_lab, hem_lab, bio_lab, math_lab, lang_lab, geo_lab, comp_lab, school_count
 * selectedYear prop from App.jsx via ContextBar
 */

function toKey(yr) { return yr ? yr.replace('–', '-') : null; }

function useReveal(dep) {
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
}

export default function StreamDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const { tab: tab, setTab: setTab, tabsRef, panelDir } = useTabSlider(['stream', 'lab']);
  useReveal(key);
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

  const fallback = Object.keys(STREAM_DATA).sort().at(-1);
  const d = (key && STREAM_DATA[key]) ? STREAM_DATA[key] : STREAM_DATA[fallback];
  if (!d) return null;

  const { header, cards, chartStream, chartStreamSource, chartStreamNote,
          chartGender, chartGenderSource, chartGenderNote,
          chartLab, chartLabSource, chartLabNote,
          insight1, insight2 } = d;

  return (
    <div className="dashboard"><section className="section socio-section">
      <div className="socio-header">
        <div>
          <div className="section-label">{header.label}</div>
          <h2 className="section-headline">{header.headline}</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
        </div>
        <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiNzllMzVjMjYtODIzOC00ZWRkLTg2NmMtNTU0NDRhMzVjZTc5IiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>

          <span className="powerbi-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="3" height="10" rx="1" fill="currentColor" opacity="0.5"/><rect x="6" y="2" width="3" height="13" rx="1" fill="currentColor" opacity="0.75"/><rect x="11" y="0" width="4" height="15" rx="1" fill="currentColor"/></svg></span>
          View Full Report <span style={{ fontSize: 13, opacity: 0.7 }}>↗</span>
        </button>
      </div>

      <div className="socio-cards">{cards.map(c => (
        <div key={c.id} className="socio-cat-card" style={{ '--cat-color': c.color }}>
          <div className="scc-top-bar"/>
          <div className="scc-label" style={{ color: c.color }}>{c.label}</div>
          <div className="scc-full-label">{c.fullLabel}</div>
          <div className="scc-pct" style={{ color: c.color, fontSize: c.headline.length > 5 ? 30 : 40 }}>{c.headline}</div>
          <div className="scc-students">{c.headlineNote}</div>
          <div className="scc-bar-track"><div className="scc-bar-fill" data-bar-w={c.bar} style={{ width: 0, background: c.color }}/></div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.color, marginBottom: 10, marginTop: -2 }}>{c.barLabel}</div>
          <div className="scc-split">
            {c.split.map((s, i) => (
              <>{i > 0 && <div key={'d'+i} className="scc-split-divider"/>}
              <div key={s.lbl} className="scc-split-item">
                <span className="scc-split-val" style={s.accent ? { color: c.color, fontSize: 11 } : { fontSize: 10 }}>{s.val}</span>
                <span className="scc-split-lbl" style={{ fontSize: 7 }}>{s.lbl}</span>
              </div></>
            ))}
          </div>
          <p className="scc-note">{c.note}</p>
        </div>
      ))}</div>

      <div className="socio-bottom">
        <div className="socio-charts">
          <div className="socio-chart-tabs" ref={tabsRef}>
            <button className={`sct-tab ${tab==='stream' ? 'sct-active' : ''}`} onClick={() => setTab('stream')}>
              Student Distribution + Gender by Stream
            </button>
            <button className={`sct-tab ${tab==='lab' ? 'sct-active' : ''}`} onClick={() => setTab('lab')}>
              Lab Infrastructure Availability
            </button>
          </div>

          {tab === 'stream' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{chartStreamSource}</div>
              <div className="td-dual-charts" style={{ marginTop: 16 }}>
                <div>
                  <div className="td-chart-subtitle">Student Share by Stream</div>
                  <HBarChart data={chartStream} nameWidth={160} />
                </div>
                <div className="td-chart-divider"/>
                <div>
                  <div className="td-chart-subtitle">Female % by Stream (Gender col.)</div>
                  <HBarChart data={chartGender} nameWidth={152} />
                </div>
              </div>
              <div className="scp-note">{chartGenderNote}</div>
            </div>
          )}

          {tab === 'lab' && (
            <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
              <div className="scp-source">{chartLabSource}</div>
              <HBarChart data={chartLab} nameWidth={160} />
              <div className="scp-note">{chartLabNote}</div>
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
    </section></div>
  );
}