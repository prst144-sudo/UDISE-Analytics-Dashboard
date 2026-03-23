export default function PowerBiButton({ url, onClick }) {
  if (!url && !onClick) return null;

  return (
    <button
      className="powerbi-btn"
      onClick={() => {
        if (onClick) return onClick(url);
        window.open(url, '_blank');
      }}
    >
      <span className="powerbi-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="5" width="3" height="10" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="6" y="2" width="3" height="13" rx="1" fill="currentColor" opacity="0.75" />
          <rect x="11" y="0" width="4" height="15" rx="1" fill="currentColor" />
        </svg>
      </span>
      View Full Report
      <span style={{ fontSize: 13, opacity: 0.7 }}>↗</span>
    </button>
  );
}
