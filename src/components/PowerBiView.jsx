import './PowerBiView.css';

/**
 * Full-page iframe wrapper for Power BI reports.
 * Receives the embed URL and a back handler from App.
 */
export default function PowerBiView({ url }) {
  return (
    <div className="pbi-view">
      <iframe
        className="pbi-iframe"
        title="Power BI Report"
        src={url}
        allowFullScreen
        frameBorder="0"
      />
    </div>
  );
}