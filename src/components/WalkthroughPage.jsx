import '../styles/WalkthroughPage.css';

const STEPS = [
  {
    num: '01',
    title: 'Log In',
    desc: 'Open the platform and enter your username, password, and the CAPTCHA verification code. Click "Log In" to access the analytics suite.',
    tip: 'Your credentials are managed by your institution administrator.',
  },
  {
    num: '02',
    title: 'Explore the Home Landing',
    desc: 'After login, you arrive at the Student Overview. To go back to the main home screen, click the UDISE+ logo in the top-left corner. The home page shows 4 analytics domains: Students, Teachers, Schools, and Comparative.',
    tip: 'Click any domain card to jump directly to its overview.',
  },
  {
    num: '03',
    title: 'Navigate the Top Menu',
    desc: 'The top navigation bar contains four dropdown menus — Student Overview, Teacher & PTR Overview, School Overview, and Comparative Overview. Hover over any menu to see all dashboards under that category.',
    tip: 'You can navigate directly to any dashboard from the dropdown without going through the overview page.',
  },
  {
    num: '04',
    title: 'Read a Dashboard',
    desc: 'Each dashboard has a header with key stats, a tabbed chart section, and two insight cards on the right. The charts are interactive — click tabs to switch between views (e.g. by Management Type vs by School Category).',
    tip: 'The breadcrumb at the top shows where you are. Click any breadcrumb segment to navigate back.',
  },
  {
    num: '05',
    title: 'Switch Years',
    desc: 'When you are inside a specific dashboard (not on an overview page), a Year selector appears in the context bar below the top navigation. Use it to switch data between 2020–21 and 2024–25.',
    tip: 'Not all dashboards have data for all years. The selector automatically shows only available years for the current dashboard.',
  },
  {
    num: '06',
    title: 'Use the Comparative Dashboards',
    desc: 'Go to Comparative Overview to compare multiple states side by side across Student enrollment, School infrastructure, Teacher deployment, and PTR compliance. Each comparison dashboard shows the same verified data across a selectable state view.',
    tip: 'Use state comparison to identify which states are leading or lagging on key education metrics.',
  },
  {
    num: '07',
    title: 'View the Full Power BI Report',
    desc: 'Every dashboard has a "View Full Report" button in the top-right of the header. Click it to open the detailed Power BI report for that module — with full state-level drilldowns, filters, and exportable charts.',
    tip: 'Press "Back" in the breadcrumb to return from a Power BI report to the dashboard.',
  },
  {
    num: '08',
    title: 'Log Out',
    desc: 'When done, click the "Logout" button in the top-right corner of the navigation bar. You will be returned to the home landing page. Your session ends and data is no longer accessible until next login.',
    tip: 'Always log out when using a shared device.',
  },
];

export default function WalkthroughPage({ onClose }) {
  return (
    <div className="wt-root">
      <div className="wt-header">
        <div>
          <div className="wt-eyebrow">Platform Guide</div>
          <h1 className="wt-title">How to Use UDISE+ Analytics</h1>
          <p className="wt-sub">A step-by-step walkthrough of the platform — from login to exploring dashboards.</p>
        </div>
        {onClose && (
          <button className="wt-close" onClick={onClose}>← Back</button>
        )}
      </div>

      <div className="wt-steps">
        {STEPS.map((step, i) => (
          <div key={i} className="wt-step">
            <div className="wt-step-left">
              <div className="wt-step-num">{step.num}</div>
              {i < STEPS.length - 1 && <div className="wt-step-line" />}
            </div>
            <div className="wt-step-body">
              <div className="wt-step-icon">{step.icon}</div>
              <h3 className="wt-step-title">{step.title}</h3>
              <p className="wt-step-desc">{step.desc}</p>
              <div className="wt-step-tip">
                <span className="wt-tip-label">Tip</span>
                {step.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wt-footer">
        <p>For technical support, contact your institution administrator or the UDISE+ helpdesk.</p>
      </div>
    </div>
  );
}
