import nicLogoSvg from '../nic-logo.svg';
import '../styles/Footer.css';

// Placeholder links — user will provide actual URLs
const MAIN_LINKS = [
  { label: 'Home' },
  { label: 'About UDISE+' },
  { label: 'Get UDISE Code' },
  { label: 'Data Capture Formats' },
  { label: 'Publications & Statistics' },
  { label: "FAQ's" },
  { label: 'Contact Us' },
];

const OTHER_LINKS = [
  { label: 'Digital Repository' },
  { label: 'Department of School Education & Literacy' },
  { label: 'School GIS' },
  { label: 'Ministry of Education' },
  { label: 'Click Here For UDISE+ 2018–19' },
  { label: 'Click here for UDISE+ 2019–20 for all States/UT' },
];

const POLICY_LINKS = [
  { label: 'Website Policy' },
  { label: 'Site Map' },
];

export default function Footer() {
  return (
    <footer className="ft-root">
      <div className="ft-inner">

        {/* Col 1 — Main */}
        <div className="ft-col">
          <div className="ft-col-title">Main</div>
          <ul className="ft-links">
            {MAIN_LINKS.map(l => (
              <li key={l.label}>
                <a href="#" className="ft-link">
                  <span className="ft-arrow">→</span> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2 — Other Links */}
        <div className="ft-col">
          <div className="ft-col-title">Other Links</div>
          <ul className="ft-links">
            {OTHER_LINKS.map(l => (
              <li key={l.label}>
                <a href="#" className="ft-link">
                  <span className="ft-arrow">→</span> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Website Policy */}
        <div className="ft-col">
          <div className="ft-col-title">Website Policy</div>
          <ul className="ft-links">
            {POLICY_LINKS.map(l => (
              <li key={l.label}>
                <a href="#" className="ft-link">
                  <span className="ft-arrow">→</span> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — NIC info */}
        <div className="ft-col ft-col-logos">
          <img src={nicLogoSvg} alt="National Informatics Centre" className="ft-nic-logo" />
          <p className="ft-nic-desc">
            This site is designed, developed, maintained and hosted by National Informatics Centre (NIC),
            Ministry of Electronics &amp; Information Technology. This Website belongs to Department of
            School Education &amp; Literacy, Ministry of Education, Government of India.
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <span>v22.0711.22</span>
        <span className="ft-bottom-divider">·</span>
        <span>Data Source: UDISE+ Official Base Files · 2024–25</span>
        <span className="ft-bottom-divider">·</span>
        <span>© Department of School Education &amp; Literacy, Ministry of Education, Government of India</span>
      </div>
    </footer>
  );
}