import '../styles/Footer.css';

export default function Footer({ onShowWalkthrough }) {
  return (
    <footer className="ft-root">
      <div className="ft-inner">
        <p className="ft-credit">
          Designed, Developed and Managed by Department of Education and NIC
        </p>
        <div className="ft-links">
          <a href="#" className="ft-link">UDISE+</a>
          <span className="ft-divider">·</span>
          <a href="#" className="ft-link">Vidyanjali</a>
          <span className="ft-divider">·</span>
          <button className="ft-link ft-walkthrough-btn" onClick={onShowWalkthrough}>
            Platform Guide
          </button>
        </div>
      </div>
    </footer>
  );
}
