import nicLogo from '../nic-logo.png';
import '../styles/Footer.css';

export default function Footer({ onShowWalkthrough }) {
  return (
    <footer className="ft-root">
      <div className="ft-inner">
        <div className="ft-left">
          <img src={nicLogo} alt="National Informatics Centre" className="ft-nic-logo" />
          <p className="ft-credit">
            Designed, Developed and Managed by Department of Education and NIC
          </p>
        </div>
        <div className="ft-links">
          <a href="https://udiseplus.gov.in" target="_blank" rel="noopener noreferrer" className="ft-link">UDISE+</a>
          <span className="ft-divider">·</span>
          <a href="https://vidyanjali.education.gov.in" target="_blank" rel="noopener noreferrer" className="ft-link">Vidyanjali</a>
          <span className="ft-divider">·</span>
          <button className="ft-link ft-walkthrough-btn" onClick={onShowWalkthrough}>Platform Guide</button>
        </div>
      </div>
    </footer>
  );
}