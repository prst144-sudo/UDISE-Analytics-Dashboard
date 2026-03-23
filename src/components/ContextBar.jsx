import './ContextBar.css';

// All available years in display format (en-dash)
const ALL_YEARS = ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'];

const DASH_YEARS = {
  'student-main': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'socio': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'medium': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'cwsn-student': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'national': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'stream': ['2024–25', '2023–24'],
  'dropout': ['2024–25', '2023–24', '2022–23', '2021–22'],
  'transition': ['2024–25', '2023–24', '2022–23', '2021–22'],
  'vocational': ['2024–25', '2023–24', '2022–23'],
  'migration': ['2023–24', '2022–23'],
  'teacher-main': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'ptr': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'cwsn-teacher': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'retirement': ['2024–25', '2023–24'],
  'school-main': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'infra': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'multiclass': ['2024–25'],
  'student-compare': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'school-compare': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'teacher-compare': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
  'ptr-compare': ['2024–25', '2023–24', '2022–23', '2021–22', '2020–21'],
};

export default function ContextBar({
  catLabel, pageLabel,
  selectedYear, onYearChange,
  onGoHome, onGoLanding,
  onBackFromPowerBi,
  activeDash,
  isPowerBi,
}) {
  const isOnDash = pageLabel !== 'Overview';

  const availableYears = (activeDash && DASH_YEARS[activeDash])
    ? DASH_YEARS[activeDash]
    : ALL_YEARS;

  const effectiveYear = availableYears.includes(selectedYear)
    ? selectedYear
    : availableYears[0];

  if (effectiveYear !== selectedYear) {
    setTimeout(() => onYearChange(effectiveYear), 0);
  }

  return (
    <div className="context-bar">
      <nav className="breadcrumb" aria-label="breadcrumb">

        {/* ── Back button — shown inside Power BI view ── */}
        {isPowerBi && (
          <button className="bc-back-btn" onClick={onBackFromPowerBi} title="Back to dashboard">
            <span className="bc-back-arrow">‹</span>
            Back
          </button>
        )}

        <button className="bc-link" onClick={onGoHome}>UDISE+</button>
        <span className="bc-sep">/</span>

        <button
          className={`bc-link ${!isOnDash && !isPowerBi ? 'bc-link-active' : ''}`}
          onClick={onGoLanding}
        >
          {catLabel}
        </button>

        {isOnDash && (
          <>
            <span className="bc-sep">/</span>
            <button
              className={`bc-link ${!isPowerBi ? 'bc-link-active' : ''}`}
              onClick={isPowerBi ? onBackFromPowerBi : undefined}
              style={!isPowerBi ? { cursor: 'default' } : undefined}
            >
              {pageLabel}
            </button>
          </>
        )}

        {isPowerBi && (
          <>
            <span className="bc-sep">/</span>
            <span className="bc-current bc-powerbi">
              Power BI Report
            </span>
          </>
        )}
      </nav>

      <div className="context-controls">
        {/* Hide year selector on overview pages and while viewing Power BI */}
        {!isPowerBi && isOnDash && (
          <div className="ctx-select-wrap">
            <span className="ctx-label">Year</span>
            <select
              className="ctx-select"
              value={effectiveYear}
              onChange={e => onYearChange(e.target.value)}
            >
              {availableYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}