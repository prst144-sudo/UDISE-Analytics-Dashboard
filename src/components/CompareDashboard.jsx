import HBarChart from './HBarChart';
import { useTabSlider } from './useTabSlider';
import { useEffect, useRef, useState } from 'react';
import './StudentDashboard.css';
import './SocioDashboard.css';
import './TeacherDashboard.css';
import PTR_DATA from '../data/ptr_data.json';

function toKey(yr) { return yr ? yr.replace('–', '-') : null; }

function useReveal(dep) {
  const prev = useRef(null);
  useEffect(() => {
    const changed = prev.current !== null && prev.current !== dep;
    prev.current = dep;
    if (changed) {
      document.querySelectorAll('[data-bar-w]').forEach(el => { el.style.width = '0%'; });
      setTimeout(() => { document.querySelectorAll('[data-bar-w]').forEach((el, i) => setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90)); }, 30);
      return;
    }
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); e.target.querySelectorAll('[data-bar-w]').forEach((el, i) => setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90)); }
    }), { threshold: 0.06 });
    document.querySelectorAll('.section:not(.visible)').forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) { first.classList.add('visible'); first.querySelectorAll('[data-bar-w]').forEach((el, i) => setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 160 + i * 90)); }
    return () => obs.disconnect();
  }, [dep]);
}

const COMPARE_INPUT = {
  '2020-21': {
    ptr: 27.3,
    within30: 70.2,
    above40: 16.4,
    teachersReqL: 17.11,
    teachersExcessL: 25.92,
    singleTotalL: 1.11,
    state: { student: 50.3, school: 68.2, teacher: 50.2, female: 43.7, ptr: 27.3, within30: 71.5, singleCount: 97806, singleShare: 87.9 },
    private: { student: 36.0, school: 22.6, teacher: 37.6, female: 62.8, ptr: 26.1, within30: 69.1, singleCount: 7356, singleShare: 6.6 },
    aided: { student: 10.2, school: 5.6, teacher: 8.3, female: 43.9, ptr: 33.2, within30: 58.7, singleCount: 3982, singleShare: 3.6 },
    others: { female: 47.8, within30: 71.2, singleShare: 1.9 },
    central: { female: 45.3, within30: 54.1, singleShare: 0.0 },
  },
  '2021-22': {
    ptr: 27.9,
    within30: 68.1,
    above40: 17.6,
    teachersReqL: 18.13,
    teachersExcessL: 24.79,
    singleTotalL: 1.17,
    state: { student: 53.3, school: 68.5, teacher: 50.7, female: 44.1, ptr: 29.3, within30: 67.3, singleCount: 104400, singleShare: 89.0 },
    private: { student: 33.3, school: 22.6, teacher: 37.2, female: 63.0, ptr: 24.9, within30: 72.6, singleCount: 6914, singleShare: 5.9 },
    aided: { student: 10.2, school: 5.5, teacher: 8.4, female: 44.6, ptr: 33.9, within30: 56.3, singleCount: 3911, singleShare: 3.3 },
    others: { female: 47.6, within30: 73.6, singleShare: 1.7 },
    central: { female: 45.9, within30: 54.9, singleShare: 0.0 },
  },
  '2022-23': {
    ptr: 26.6,
    within30: 71.5,
    above40: 15.6,
    teachersReqL: 16.28,
    teachersExcessL: 27.18,
    singleTotalL: 1.18,
    state: { student: 53.4, school: 69.2, teacher: 51.0, female: 44.5, ptr: 27.8, within30: 70.7, singleCount: 105103, singleShare: 88.9 },
    private: { student: 33.4, school: 22.1, teacher: 37.2, female: 65.1, ptr: 23.9, within30: 75.6, singleCount: 7216, singleShare: 6.1 },
    aided: { student: 10.4, school: 5.6, teacher: 8.3, female: 45.4, ptr: 33.2, within30: 58.9, singleCount: 3829, singleShare: 3.2 },
    others: { female: 47.8, within30: 83.5, singleShare: 1.7 },
    central: { female: 45.9, within30: 62.6, singleShare: 0.0 },
  },
  '2023-24': {
    ptr: 25.3,
    within30: 74.8,
    above40: 13.2,
    teachersReqL: 14.03,
    teachersExcessL: 29.43,
    singleTotalL: 1.11,
    state: { student: 50.7, school: 69.0, teacher: 50.7, female: 44.9, ptr: 25.3, within30: 75.5, singleCount: 98593, singleShare: 88.8 },
    private: { student: 36.3, school: 22.5, teacher: 38.0, female: 66.4, ptr: 24.1, within30: 75.0, singleCount: 6664, singleShare: 6.0 },
    aided: { student: 10.3, school: 5.5, teacher: 7.9, female: 46.4, ptr: 32.9, within30: 59.8, singleCount: 3681, singleShare: 3.3 },
    others: { female: 48.7, within30: 84.6, singleShare: 1.8 },
    central: { female: 47.6, within30: 76.9, singleShare: 0.0 },
  },
  '2024-25': {
    ptr: 24.4,
    within30: 77.8,
    above40: 11.3,
    teachersReqL: 12.86,
    teachersExcessL: 31.77,
    singleTotalL: 1.04,
    state: { student: 48.5, school: 68.7, teacher: 50.2, female: 45.2, ptr: 23.6, within30: 79.9, singleCount: 92288, singleShare: 88.6 },
    private: { student: 38.8, school: 23.1, teacher: 39.1, female: 67.4, ptr: 24.2, within30: 74.8, singleCount: 6203, singleShare: 6.0 },
    aided: { student: 10.0, school: 5.4, teacher: 7.5, female: 47.1, ptr: 32.7, within30: 60.3, singleCount: 3869, singleShare: 3.7 },
    others: { female: 49.6, within30: 84.9, singleShare: 1.7 },
    central: { female: 48.6, within30: 82.4, singleShare: 0.0 },
  },
};

const fmtPct = (n) => `${Number(n).toFixed(1)}%`;
const fmtRatio = (n) => `${Number(n).toFixed(1)}:1`;
const fmtLakh = (n) => `${Number(n).toFixed(2)} L`;

function buildCompare(year, d) {
  const combinedStudentShare = d.state.student + d.private.student;

  const chartCross = [
    { name: 'Others', govtPct: d.others.within30, value: d.others.within30, label: fmtPct(d.others.within30) },
    { name: 'Central Government', govtPct: d.central.within30, value: d.central.within30, label: fmtPct(d.central.within30) },
    { name: 'State Government', govtPct: d.state.within30, value: d.state.within30, label: fmtPct(d.state.within30) },
    { name: 'Private Unaided', govtPct: d.private.within30, value: d.private.within30, label: fmtPct(d.private.within30) },
    { name: 'Govt. Aided', govtPct: d.aided.within30, value: d.aided.within30, label: fmtPct(d.aided.within30) },
  ].sort((a, b) => b.govtPct - a.govtPct);

  const chartGender = [
    { name: 'Private Unaided', value: d.private.female, label: fmtPct(d.private.female) },
    { name: 'Others', value: d.others.female, label: fmtPct(d.others.female) },
    { name: 'Central Government', value: d.central.female, label: fmtPct(d.central.female) },
    { name: 'Govt. Aided', value: d.aided.female, label: fmtPct(d.aided.female) },
    { name: 'State Government', value: d.state.female, label: fmtPct(d.state.female) },
  ].sort((a, b) => b.value - a.value);

  const chartSingleMgmt = [
    { name: 'State Government', value: d.state.singleShare, label: fmtPct(d.state.singleShare) },
    { name: 'Private Unaided', value: d.private.singleShare, label: fmtPct(d.private.singleShare) },
    { name: 'Govt. Aided', value: d.aided.singleShare, label: fmtPct(d.aided.singleShare) },
    { name: 'Others', value: d.others.singleShare, label: fmtPct(d.others.singleShare) },
    { name: 'Central Government', value: d.central.singleShare, label: fmtPct(d.central.singleShare) },
  ].sort((a, b) => b.value - a.value);

  return {
    header: {
      label: 'Section 04 · Management Comparison',
      headline: 'How do management types compare?',
      sub: `In ${year}, State Government and Private Unaided schools together accounted for ${fmtPct(combinedStudentShare)} of all students. Government-aided schools recorded the highest average PTR at ${fmtRatio(d.aided.ptr)}, while State Government schools accounted for ${fmtPct(d.state.singleShare)} of all single-teacher schools.`,
    },

    cards: [
      {
        id: 'state',
        color: '#d97706',
        label: 'STATE GOVT',
        fullLabel: 'State Government Schools',
        headline: fmtPct(d.state.student),
        headlineNote: 'of all students',
        bar: 100,
        barLabel: 'Student share among management types',
        split: [
          { val: fmtPct(d.state.school), lbl: 'of schools' },
          { val: fmtPct(d.state.teacher), lbl: 'of teachers' },
          { val: fmtRatio(d.state.ptr), lbl: 'PTR', accent: true },
        ],
        note: `State Government schools remain the largest part of the system, accounting for ${fmtPct(d.state.student)} of students and ${fmtPct(d.state.school)} of schools.`,
      },
      {
        id: 'private',
        color: '#f59e0b',
        label: 'PRIVATE',
        fullLabel: 'Private Unaided Schools',
        headline: fmtPct(d.private.student),
        headlineNote: 'of all students',
        bar: Number(((d.private.student / d.state.student) * 100).toFixed(1)),
        barLabel: 'Student share relative to State Government',
        split: [
          { val: fmtPct(d.private.school), lbl: 'of schools' },
          { val: fmtPct(d.private.teacher), lbl: 'of teachers' },
          { val: fmtPct(d.private.female), lbl: 'female teachers', accent: true },
        ],
        note: `Private Unaided schools account for ${fmtPct(d.private.student)} of students and record the highest female teacher share among major management types at ${fmtPct(d.private.female)}.`,
      },
      {
        id: 'aided',
        color: '#b45309',
        label: 'AIDED',
        fullLabel: 'Government-aided Schools',
        headline: fmtRatio(d.aided.ptr),
        headlineNote: 'average PTR',
        bar: 100,
        barLabel: 'Highest PTR among management types',
        split: [
          { val: fmtPct(d.aided.student), lbl: 'of students' },
          { val: fmtPct(d.aided.within30), lbl: 'within PTR 30' },
          { val: d.aided.singleCount.toLocaleString('en-IN'), lbl: 'single-teacher schools', accent: true },
        ],
        note: `Government-aided schools serve ${fmtPct(d.aided.student)} of students but record the highest average PTR at ${fmtRatio(d.aided.ptr)}.`,
      },
      {
        id: 'single',
        color: '#92400e',
        label: 'SINGLE-TEACHER',
        fullLabel: 'Single-Teacher Schools',
        headline: fmtLakh(d.singleTotalL),
        headlineNote: 'schools nationally',
        bar: d.state.singleShare,
        barLabel: 'State Government share of all single-teacher schools',
        split: [
          { val: fmtPct(d.state.singleShare), lbl: 'state govt' },
          { val: fmtPct(d.private.singleShare), lbl: 'private' },
          { val: fmtPct(d.aided.singleShare), lbl: 'aided', accent: true },
        ],
        note: `Single-teacher schools remain concentrated in the State Government system, which accounts for ${fmtPct(d.state.singleShare)} of the national total.`,
      },
    ],

    chartCross,
    chartCrossSource: 'Share of schools within PTR 30 (%) by management',
    chartCrossNote: `PTR compliance is highest in Others (${fmtPct(d.others.within30)}) and lowest in Government-aided schools (${fmtPct(d.aided.within30)}). State Government schools remain central because of their scale.`,

    chartGender,
    chartGenderSource: 'Female teacher share (%) by management',
    chartGenderNote: `Private Unaided schools record the highest female teacher share at ${fmtPct(d.private.female)}. State Government schools remain below parity at ${fmtPct(d.state.female)}.`,

    chartSingleMgmt,
    chartSingleMgmtSource: 'Share of national single-teacher schools (%) by management',
    chartSingleMgmtNote: `State Government schools account for ${fmtPct(d.state.singleShare)} of all single-teacher schools. The national total stands at ${fmtLakh(d.singleTotalL)}.`,

    chartZeroLoc: [],
    chartZeroLocSource: '',
    chartZeroLocNote: '',

    insight1: {
      color: '#d97706',
      num: fmtRatio(d.ptr),
      label: 'National PTR',
      delta_val: fmtPct(d.within30),
      delta_label: 'schools within PTR 30',
      delta_val2: fmtPct(d.above40),
      delta_label2: 'schools above PTR 40',
    },

    insight2: {
      color: '#b45309',
      num: fmtLakh(d.teachersReqL),
      label: 'Teachers Required for PTR 30',
      delta_val: fmtLakh(d.teachersExcessL),
      delta_label: 'teachers in excess elsewhere',
      delta_val2: fmtLakh(d.state.singleCount / 100000),
      delta_label2: 'state govt single-teacher schools',
    },
  };
}

const COMPARE_COPY = Object.fromEntries(
  Object.entries(COMPARE_INPUT).map(([year, data]) => [year, buildCompare(year, data)])
);

export default function CompareDashboard({ selectedYear, onShowPowerBi }) {
  const key = toKey(selectedYear);
  const { tab: tab, setTab: setTab, tabsRef, panelDir } = useTabSlider(['cross', 'gender', 'single']);
  useReveal(key);

  useEffect(() => {
    const els = document.querySelectorAll('[data-bar-w]');
    els.forEach(el => { el.style.transition = 'none'; el.style.width = '0%'; });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      els.forEach((el, i) => {
        el.style.transition = '';
        setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 60 + i * 80);
      });
    }));
  }, [tab]);

  const fallback = Object.keys(PTR_DATA).sort().at(-1);
  const yr = (key && PTR_DATA[key]) ? PTR_DATA[key] : PTR_DATA[fallback];
  if (!yr) return null;

  const compare = (key && COMPARE_COPY[key]) ? COMPARE_COPY[key] : (COMPARE_COPY[fallback] || yr.compare);

  const {
    header, cards,
    chartCross, chartCrossSource, chartCrossNote,
    chartGender, chartGenderSource, chartGenderNote,
    chartSingleMgmt, chartSingleMgmtSource, chartSingleMgmtNote,
    chartZeroLoc, chartZeroLocSource, chartZeroLocNote,
    insight1, insight2
  } = compare;

  const CAT = '#d97706';

  return (
    <div className="dashboard"><section className="section socio-section">
      <div className="socio-header">
        <div>
          <div className="section-label" style={{ color: CAT }}>{header.label}</div>
          <h2 className="section-headline">{header.headline}</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>{header.sub}</p>
        </div>
        <button className="powerbi-btn" onClick={() => onShowPowerBi?.('https://app.powerbi.com/view?r=eyJrIjoiZmFhZjcwMGUtNDUxYS00YzIzLWE3OTYtMDRlNmI1MmY4OTEwIiwidCI6IjJiZDAyMzJmLWNjZTEtNDZkMS04ZWE2LTQzMTE1NTVlMzAyYiJ9')}>
          <span className="powerbi-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="3" height="10" rx="1" fill="currentColor" opacity="0.5" /><rect x="6" y="2" width="3" height="13" rx="1" fill="currentColor" opacity="0.75" /><rect x="11" y="0" width="4" height="15" rx="1" fill="currentColor" /></svg></span>
          View Full Report <span style={{ fontSize: 13, opacity: 0.7 }}>↗</span>
        </button>
      </div>
      <div className="socio-cards">{cards.map(c => (
        <div key={c.id} className="socio-cat-card" style={{ '--cat-color': c.color }}>
          <div className="scc-top-bar" /><div className="scc-label" style={{ color: c.color }}>{c.label}</div>
          <div className="scc-full-label">{c.fullLabel}</div>
          <div className="scc-pct" style={{ color: c.color, fontSize: c.headline.length > 5 ? 28 : 40 }}>{c.headline}</div>
          <div className="scc-students">{c.headlineNote}</div>
          <div className="scc-bar-track"><div className="scc-bar-fill" data-bar-w={c.bar} style={{ width: 0, background: c.color }} /></div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.color, marginBottom: 10, marginTop: -2 }}>{c.barLabel}</div>
          <div className="scc-split">{c.split.map((s, i) => (<>{i > 0 && <div key={'d' + i} className="scc-split-divider" />}<div key={s.lbl} className="scc-split-item"><span className="scc-split-val" style={s.accent ? { color: c.color, fontSize: 11 } : { fontSize: 10 }}>{s.val}</span><span className="scc-split-lbl" style={{ fontSize: 7 }}>{s.lbl}</span></div></>))}</div>
          <p className="scc-note">{c.note}</p>
        </div>
      ))}</div>
      <div className="socio-bottom">
        <div className="socio-charts">
          <div className="socio-chart-tabs" ref={tabsRef}>
            <button className={`sct-tab ${tab === 'cross' ? 'sct-active' : ''}`} onClick={() => setTab('cross')}>PTR Compliance by Management</button>
            <button className={`sct-tab ${tab === 'gender' ? 'sct-active' : ''}`} onClick={() => setTab('gender')}>Female Teacher Share by Management</button>
            <button className={`sct-tab ${tab === 'single' ? 'sct-active' : ''}`} onClick={() => setTab('single')}>Single-Teacher Schools by Management</button>
          </div>
          {tab === 'cross' && <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
            <div className="scp-source">{chartCrossSource}</div>
            <HBarChart data={chartCross} nameWidth={160} valKey="govtPct" />
            <div className="scp-note">{chartCrossNote}</div>
          </div>}
          {tab === 'gender' && <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
            <div className="scp-source">{chartGenderSource}</div>
            <HBarChart data={chartGender} nameWidth={160} />
            <div className="scp-note">{chartGenderNote}</div>
          </div>}
          {tab === 'single' && <div key={tab} className="socio-chart-panel" data-dir={panelDir}>
            <div className="scp-source">{chartSingleMgmtSource}</div>
            <HBarChart data={chartSingleMgmt} nameWidth={168} />
            <div className="scp-note">{chartSingleMgmtNote}</div>
          </div>}
        </div>
        <div className="socio-insights">
          <div className="stat-card socio-insight-card">
            <div className="sic-stripe" style={{ background: insight1.color }} />
            <div className="stat-card-num" style={{ color: insight1.color }}>{insight1.num}</div>
            <div className="stat-card-label">{insight1.label}</div>
            <div className="sic-divider" />
            <div className="sic-delta"><span className="sic-delta-val" style={{ color: insight1.color }}>{insight1.delta_val}</span><span className="sic-delta-lbl">{insight1.delta_label}</span></div>
            <div className="sic-divider" />
            <div className="sic-delta"><span className="sic-delta-val" style={{ color: insight1.color }}>{insight1.delta_val2}</span><span className="sic-delta-lbl">{insight1.delta_label2}</span></div>
          </div>
          <div className="stat-card socio-insight-card">
            <div className="sic-stripe" style={{ background: insight2.color }} />
            <div className="stat-card-num" style={{ color: insight2.color }}>{insight2.num}</div>
            <div className="stat-card-label">{insight2.label}</div>
            <div className="sic-divider" />
            <div className="sic-delta"><span className="sic-delta-val" style={{ color: insight2.color }}>{insight2.delta_val}</span><span className="sic-delta-lbl">{insight2.delta_label}</span></div>
            <div className="sic-divider" />
            <div className="sic-delta"><span className="sic-delta-val" style={{ color: insight2.color }}>{insight2.delta_val2}</span><span className="sic-delta-lbl">{insight2.delta_label2}</span></div>
          </div>
        </div>
      </div>
    </section></div>
  );
}