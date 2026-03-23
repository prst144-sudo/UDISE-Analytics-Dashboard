import { useState } from 'react';
import TopNav from './components/TopNav';
import ContextBar from './components/ContextBar';
import PowerBiView from './components/PowerBiView';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import HomeLanding from './components/HomeLanding';
import StudentLanding from './components/StudentLanding';
import StudentDashboard from './components/StudentDashboard';
import SocioDashboard from './components/SocioDashboard';
import MigrationDashboard from './components/MigrationDashboard';
import MediumDashboard from './components/MediumDashboard';
import DropoutDashboard from './components/DropoutDashboard';
import TransitionDashboard from './components/TransitionDashboard';
import CwsnStudentDashboard from './components/CwsnStudentDashboard';
import NationalDashboard from './components/NationalDashboard';
import VocationalDashboard from './components/VocationalDashboard';
import StreamDashboard from './components/StreamDashboard';
import { TeacherLanding } from './components/TeacherLanding';
import TeacherDashboard from './components/TeacherDashboard';
import PtrDashboard from './components/PtrDashboard';
import CwsnTeacherDashboard from './components/CwsnTeacherDashboard';
import RetirementDashboard from './components/RetirementDashboard';
import { SchoolLanding } from './components/SchoolLanding';
import SchoolDashboard from './components/SchoolDashboard';
import InfraDashboard from './components/InfraDashboard';
import McuDashboard from './components/McuDashboard';
import { CompareLanding } from './components/CompareLanding';
import CompareDashboard from './components/CompareDashboard';
import SchoolCompareDashboard from './components/SchoolCompareDashboard';
import TeacherCompareDashboard from './components/TeacherCompareDashboard';
import PtrCompareDashboard from './components/PtrCompareDashboard';
import './styles/global.css';

const DASH_TITLES = {
  'student-main': 'Student Analytics', 'socio': 'Socioeconomic Analytics',
  'migration': 'Migration Analytics', 'medium': 'Medium of Instruction',
  'dropout': 'Dropout Rate', 'transition': 'Transition Rate',
  'cwsn-student': 'CWSN Students', 'national': 'National Analytics',
  'vocational': 'Vocational Analytics', 'stream': 'Stream Analytics',
  'teacher-main': 'Teacher Analytics', 'ptr': 'PTR Analytics',
  'cwsn-teacher': 'CWSN Analytics', 'retirement': 'Teacher Retirement',
  'infra': 'Infrastructure Analytics', 'school-main': 'School Analytics',
  'multiclass': 'Multi-Class Units', 'student-compare': 'Student Comparison Analytics',
  'school-compare': 'School Comparison Analytics', 'teacher-compare': 'Teacher Comparison Analytics',
  'ptr-compare': 'PTR Comparison Analytics',
};

const DASH_CAT = {
  'student-main': 'student', 'socio': 'student', 'migration': 'student', 'medium': 'student',
  'dropout': 'student', 'transition': 'student', 'cwsn-student': 'student', 'national': 'student',
  'vocational': 'student', 'stream': 'student', 'teacher-main': 'teacher', 'ptr': 'teacher',
  'cwsn-teacher': 'teacher', 'retirement': 'teacher', 'infra': 'school', 'school-main': 'school',
  'multiclass': 'school', 'student-compare': 'compare', 'school-compare': 'compare',
  'teacher-compare': 'compare', 'ptr-compare': 'compare',
};

const CAT_LABELS = {
  student: 'Student Centric Analytics', teacher: 'Teacher & PTR Analytics',
  school: 'School Analytics', compare: 'Comparative',
};

export default function App() {
  // isLoggedIn: null = home (pre-login), false = login page, true = logged in
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = show home first
  const [pendingDash, setPendingDash] = useState(null); // dash to go to after login
  const [pendingCat, setPendingCat] = useState(null); // cat to go to after login
  const [activeCat, setActiveCat] = useState(null);
  const [activeDash, setActiveDash] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2024\u201325');
  const [powerBiUrl, setPowerBiUrl] = useState(null);

  function goHome() {
    setActiveCat(null); setActiveDash(null); setPowerBiUrl(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Called from HomeLanding category cards — goes to login then category landing
  function requestLanding(cat) {
    if (isLoggedIn === true) {
      setActiveCat(cat); setActiveDash(null); setPowerBiUrl(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPendingCat(cat); setPendingDash(null);
      setIsLoggedIn(false); // show login
    }
  }

  // Called from HomeLanding tags — goes to login then specific dashboard
  function requestDashboard(id) {
    if (isLoggedIn === true) {
      setActiveCat(DASH_CAT[id] || activeCat); setActiveDash(id); setPowerBiUrl(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPendingDash(id); setPendingCat(null);
      setIsLoggedIn(false); // show login
    }
  }

  function showLanding(cat) {
    setActiveCat(cat); setActiveDash(null); setPowerBiUrl(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showDashboard(id) {
    setActiveCat(DASH_CAT[id] || activeCat); setActiveDash(id); setPowerBiUrl(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showPowerBi(url) { setPowerBiUrl(url); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function backFromPowerBi() { setPowerBiUrl(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function handleLogin() {
    setIsLoggedIn(true);
    if (pendingDash) {
      setActiveCat(DASH_CAT[pendingDash]); setActiveDash(pendingDash);
      setPendingDash(null);
    } else if (pendingCat) {
      setActiveCat(pendingCat);
      setPendingCat(null);
    } else {
      // Default: go to Student Overview
      setActiveCat('student');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleLogout() {
    setIsLoggedIn(null); // back to home
    setActiveCat(null); setActiveDash(null); setPowerBiUrl(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── HOME LANDING (pre-login, no auth needed) ──
  if (isLoggedIn === null) {
    return (
      <div className="app">
        <TopNav isLoggedIn={false} onGoHome={() => setIsLoggedIn(null)}
          onShowLanding={requestLanding} onShowDashboard={requestDashboard}
          onLogin={() => setIsLoggedIn(false)} />
        <main className="main-content">
          <HomeLanding onShowLanding={requestLanding} onShowDashboard={requestDashboard} />
        </main>
        <Footer />
      </div>
    );
  }

  // ── LOGIN PAGE ──
  if (isLoggedIn === false) {
    return <LoginPage onLogin={handleLogin} onBack={() => setIsLoggedIn(null)} />;
  }

  // ── LOGGED IN APP ──
  const currentCat = activeCat || 'student';
  const breadcrumbPage = activeDash ? DASH_TITLES[activeDash] : 'Overview';
  const dashProps = (year) => ({ key: year, selectedYear: year, onShowPowerBi: showPowerBi });

  return (
    <div className="app">
      <div id="scroll-progress-bar" />
      <TopNav activeCat={activeCat} activeDash={activeDash} onShowLanding={showLanding}
        onShowDashboard={showDashboard} onGoHome={goHome} isLoggedIn={true} onLogout={handleLogout} />
      {activeCat !== null && (
        <ContextBar catLabel={CAT_LABELS[currentCat]} pageLabel={breadcrumbPage}
          selectedYear={selectedYear} onYearChange={setSelectedYear} onGoHome={goHome}
          onGoLanding={() => showLanding(currentCat)} onBackFromPowerBi={backFromPowerBi}
          activeDash={activeDash} isPowerBi={!!powerBiUrl} />
      )}
      <main className="main-content">
        {!activeCat && <HomeLanding onShowLanding={showLanding} onShowDashboard={showDashboard} />}
        {powerBiUrl && <PowerBiView url={powerBiUrl} />}
        {!powerBiUrl && !activeDash && activeCat === 'student' && <StudentLanding onShowDashboard={showDashboard} />}
        {!powerBiUrl && !activeDash && activeCat === 'teacher' && <TeacherLanding onShowDashboard={showDashboard} />}
        {!powerBiUrl && !activeDash && activeCat === 'school' && <SchoolLanding onShowDashboard={showDashboard} />}
        {!powerBiUrl && !activeDash && activeCat === 'compare' && <CompareLanding onShowDashboard={showDashboard} />}
        {!powerBiUrl && activeDash === 'student-main' && <StudentDashboard  {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'socio' && <SocioDashboard    {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'migration' && <MigrationDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'medium' && <MediumDashboard   {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'dropout' && <DropoutDashboard  {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'transition' && <TransitionDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'cwsn-student' && <CwsnStudentDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'national' && <NationalDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'vocational' && <VocationalDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'stream' && <StreamDashboard   {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'teacher-main' && <TeacherDashboard  {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'ptr' && <PtrDashboard      {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'cwsn-teacher' && <CwsnTeacherDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'retirement' && <RetirementDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'school-main' && <SchoolDashboard   {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'infra' && <InfraDashboard    {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'multiclass' && <McuDashboard      {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'student-compare' && <CompareDashboard       {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'school-compare' && <SchoolCompareDashboard  {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'teacher-compare' && <TeacherCompareDashboard {...dashProps(selectedYear)} />}
        {!powerBiUrl && activeDash === 'ptr-compare' && <PtrCompareDashboard     {...dashProps(selectedYear)} />}
      </main>
      {!powerBiUrl && <Footer />}
    </div>
  );
}