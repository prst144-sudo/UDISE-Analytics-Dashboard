import { useEffect } from 'react';
import './GenericDashboard.css';

const DASH_META = {
  'socio': {
    label: 'Socioeconomic Analytics',
    headline: 'Social Category Breakdown',
    sub: 'Enrollment analysis by SC, ST, OBC, and General categories across states and school management types.',
    content: 'socio',
  },
  'migration': {
    label: 'Migration Analytics',
    headline: 'Student Migration Patterns',
    sub: 'Inter-state and intra-state student movement data, including urban-rural migration and seasonal patterns.',
    content: 'migration',
  },
  'medium': {
    label: 'Medium of Instruction',
    headline: 'Language of Learning',
    sub: 'Enrollment by medium of instruction, including Hindi, English, and 22 scheduled languages, and how trends have shifted over time.',
    content: 'medium',
  },
  'dropout': {
    label: 'Dropout Rate Analytics',
    headline: 'Where Students Leave the System',
    sub: 'Dropout rates at Primary (Class V), Upper Primary (Class VIII), and Secondary (Class X) levels.',
    content: 'dropout',
  },
  'transition': {
    label: 'Transition Rate',
    headline: 'Class-to-Class Progression',
    sub: 'Tracking cohorts from Class I through XII and measuring how many successfully transition at each critical juncture.',
    content: 'transition',
  },
  'cwsn-student': {
    label: 'CWSN Students',
    headline: 'Children with Special Needs',
    sub: 'Enrollment of CWSN students by disability category, state, and school type.',
    content: 'cwsn',
  },
  'national': {
    label: 'National Analytics',
    headline: 'Pan-India Overview',
    sub: 'State-by-state enrollment heatmaps and national aggregate indicators.',
    content: 'national',
  },
  'vocational': {
    label: 'Vocational Analytics',
    headline: 'Skill Education Enrollment',
    sub: 'Vocational stream enrollment at secondary and higher-secondary levels, including trade-wise and gender breakdowns.',
    content: 'vocational',
  },
  'stream': {
    label: 'Stream Analytics',
    headline: 'Science, Commerce, Arts',
    sub: 'Stream selection patterns at Classes XI–XII, including gender-disaggregated analysis and state-level trends.',
    content: 'stream',
  },
  'teacher-main': { label: 'Teacher Analytics', headline: "India's 9.5 Million Teachers", sub: 'Qualification profiles, gender ratio, social category, and deployment across school management types.', content: 'teacher' },
  'ptr': { label: 'PTR Analytics', headline: 'Pupil–Teacher Ratio', sub: 'PTR by state, school type, and level. Identifying schools above and below the RTE-mandated norms.', content: 'ptr' },
  'cwsn-teacher': { label: 'CWSN Teacher Analytics', headline: 'Special Educators', sub: 'Resource teachers, special educators, and inclusion classroom support staff data across all states.', content: 'cwsn' },
  'retirement': { label: 'Teacher Retirement', headline: '5-Year Vacancy Forecast', sub: 'Projected retirements and resulting vacancies at state and district level through 2028–29.', content: 'retirement' },
  'infra': { label: 'Infrastructure Analytics', headline: 'Facilities Across 1.47M Schools', sub: 'Toilet coverage, electricity, internet access, classrooms, libraries, science labs — availability and gaps by state.', content: 'infra' },
  'school-main': { label: 'School Analytics', headline: 'School Landscape', sub: 'School count, management type distribution, level-wise breakdown, and trends over five years.', content: 'school' },
  'multiclass': { label: 'Multi Class Units', headline: 'Multi-Grade Teaching', sub: 'Schools operating multi-grade classrooms — locations, teacher burden, and learning outcome implications.', content: 'multiclass' },
  'student-compare': { label: 'Student Comparison', headline: 'Compare Student Metrics Across States', sub: 'Select two or more states to compare enrollment, gender parity, and category breakdowns side by side.', content: 'compare' },
  'school-compare': { label: 'School Comparison', headline: 'Compare School Infrastructure', sub: 'Side-by-side school infrastructure and management type comparisons across selected states.', content: 'compare' },
  'teacher-compare': { label: 'Teacher Comparison', headline: 'Compare Teacher Metrics', sub: 'Teacher density, qualification profiles, and gender ratio comparisons across states.', content: 'compare' },
  'ptr-compare': { label: 'PTR Comparison', headline: 'Compare Pupil–Teacher Ratios', sub: 'PTR rankings and trends across states with norm compliance indicators.', content: 'compare' },
};

const SOCIO_DATA = [
  { pct: '20%', label: 'Scheduled\nCaste (SC)', color: 'var(--teal)' },
  { pct: '14%', label: 'Scheduled\nTribe (ST)', color: 'var(--gold)' },
  { pct: '43%', label: 'Other Backward\nClass (OBC)', color: 'var(--accent)' },
  { pct: '23%', label: 'General\nCategory', color: 'var(--muted)' },
];

function SocioContent() {
  return (
    <div className="socio-grid">
      {SOCIO_DATA.map((s, i) => (
        <div key={i} className="socio-card">
          <div className="socio-dot" style={{ background: s.color }} />
          <div className="socio-pct" style={{ color: s.color }}>{s.pct}</div>
          <div className="socio-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

const COMPARE_STATES = ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat'];
const COMPARE_METRIC = [3.52, 2.28, 1.40, 1.13, 1.26];

function CompareContent() {
  return (
    <div className="compare-bars">
      <div className="compare-hint">Comparing top states by enrollment (crore)</div>
      {COMPARE_STATES.map((s, i) => (
        <div key={s} className="compare-row">
          <div className="compare-state">{s}</div>
          <div className="compare-track">
            <div
              className="compare-bar"
              style={{ width: `${(COMPARE_METRIC[i] / 3.52) * 100}%` }}
            />
          </div>
          <div className="compare-val">{COMPARE_METRIC[i]} Cr</div>
        </div>
      ))}
    </div>
  );
}

export default function GenericDashboard({ id, title }) {
  useEffect(() => {
    const sections = document.querySelectorAll('.section:not(.visible)');
    sections.forEach(s => s.classList.add('visible'));
  }, [id]);

  const meta = DASH_META[id] || { label: title, headline: title, sub: 'Dashboard content for ' + title };

  return (
    <div className="dashboard">
      <section className="section visible gd-section">
        <div className="section-label">{meta.label}</div>
        <h2 className="section-headline">{meta.headline}</h2>
        <p className="section-sub">{meta.sub}</p>

        {meta.content === 'socio' && <SocioContent />}
        {meta.content === 'compare' && <CompareContent />}

        {meta.content !== 'socio' && meta.content !== 'compare' && (
          <div className="gd-placeholder">
            <div className="gd-placeholder-inner">
              <div className="gd-placeholder-icon">📊</div>
              <div className="gd-placeholder-title">{title}</div>
              <div className="gd-placeholder-text">
                This dashboard is ready to receive real data. Connect your UDISE+ API endpoint to populate charts, maps, and trend visualizations here.
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-left">India's students deserve<br />better than averages.</div>
        <div className="footer-right">
          Data Source: UDISE+ 2023–24<br />
          Ministry of Education, Govt. of India
        </div>
      </footer>
    </div>
  );
}
