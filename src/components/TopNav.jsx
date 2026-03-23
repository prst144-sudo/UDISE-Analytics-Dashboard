import { useState, useRef, useCallback } from 'react';
import '../styles/TopNav.css';

const NAV_ITEMS = [
  {
    id: 'student',
    label: 'Student Overview',
    cat: 'cat-student',
    dotColor: 'var(--cat-student)',
    children: [
      { id: 'student-main', label: 'Student Analytics' },
      { id: 'socio', label: 'Socioeconomic Analytics' },
      { id: 'migration', label: 'Migration Analytics' },
      { id: 'medium', label: 'Medium of Instruction' },
      { id: 'dropout', label: 'Dropout Rate' },
      { id: 'transition', label: 'Transition Rate' },
      { id: 'cwsn-student', label: 'CWSN Students' },
      { id: 'national', label: 'National Analytics' },
      { id: 'vocational', label: 'Vocational Analytics' },
      { id: 'stream', label: 'Stream Analytics' },
    ],
  },
  {
    id: 'teacher',
    label: 'Teacher & PTR Overview',
    cat: 'cat-teacher',
    dotColor: 'var(--cat-teacher)',
    children: [
      { id: 'teacher-main', label: 'Teacher Analytics' },
      { id: 'ptr', label: 'PTR Analytics' },
      { id: 'cwsn-teacher', label: 'CWSN Analytics' },
      { id: 'retirement', label: 'Teacher Retirement' },
    ],
  },
  {
    id: 'school',
    label: 'School Overview',
    cat: 'cat-school',
    dotColor: 'var(--cat-school)',
    children: [
      { id: 'infra', label: 'Infrastructure Analytics' },
      { id: 'school-main', label: 'School Analytics' },
      { id: 'multiclass', label: 'Multi Class Units' },
    ],
  },
  {
    id: 'compare',
    label: 'Comparative Overview',
    cat: 'cat-compare',
    dotColor: 'var(--cat-compare)',
    children: [
      { id: 'student-compare', label: 'Student Comparison Analytics' },
      { id: 'school-compare', label: 'School Comparison Analytics' },
      { id: 'teacher-compare', label: 'Teacher Comparison Analytics' },
      { id: 'ptr-compare', label: 'PTR Comparison Analytics' },
    ],
  },
];

export default function TopNav({ activeCat, activeDash, onShowLanding, onShowDashboard, onGoHome, isLoggedIn, onLogout, onLogin }) {
  const [openId, setOpenId] = useState(null);
  const closeTimer = useRef(null);

  const handleMouseEnter = useCallback((id) => {
    clearTimeout(closeTimer.current);
    setOpenId(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenId(null), 120);
  }, []);

  return (
    <header className="topnav">
      <button className="topnav-brand" onClick={onGoHome} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <div className="topnav-logo">UDISE<span>+</span></div>
        <div className="topnav-divider" />
        <div className="topnav-subtitle">Analytics Platform</div>
      </button>

      {/* ── RIGHT SIDE ── */}
      {isLoggedIn ? (
        /* Post-login: full nav + logout */
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <ul className="topnav-items">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.id}
                className={`nav-item ${item.cat} ${activeCat && activeCat === item.id ? 'active' : ''} ${openId === item.id ? 'open' : ''}`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="nav-item-btn" onClick={() => onShowLanding(item.id)}>
                  {item.label}
                  <span className="nav-chevron" />
                </button>
                <ul className={`nav-dropdown nav-dropdown-${item.id}`}>
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        className={activeDash === child.id ? 'dd-item-active' : ''}
                        onClick={() => { onShowDashboard(child.id); setOpenId(null); }}
                      >
                        <span className="dd-dot" style={{
                          background: item.dotColor,
                          opacity: activeDash === child.id ? 1 : 0.45,
                          width: activeDash === child.id ? 7 : 6,
                          height: activeDash === child.id ? 7 : 6,
                        }} />
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button className="topnav-logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        /* Pre-login: DOSEL logo + Log In button */
        <div className="topnav-prelogin">
          <div className="topnav-dosel-text">
            Department of School Education &amp; Literacy
            <span>Ministry of Education, Government of India</span>
          </div>
          <button className="topnav-login-btn" onClick={onLogin}>Log In</button>
        </div>
      )}
    </header>
  );
}