/**
 * Standard Insight Box component
 * Replaces the repeated `.stat-card.socio-insight-card` structure.
 */
export default function InsightCard({ insight }) {
  if (!insight) return null;

  return (
    <div className="stat-card socio-insight-card">
      <div className="sic-stripe" style={{ background: insight.color }} />
      <div className="stat-card-num" style={{ color: insight.color }}>{insight.num}</div>
      <div className="stat-card-label">{insight.label}</div>
      
      {/* Some dashboards use `note` in insight cards instead of just deltas */}
      {insight.note && <div className="stat-card-note">{insight.note}</div>}

      <div className="sic-divider" />
      
      {/* 
        Depending on the dashboard, the keys for delta values slightly differ 
        SocioDashboard uses `delta1_val`. StudentDashboard uses `delta_val`.
        We support both using fallbacks. 
      */}
      <div className="sic-delta">
        <span className="sic-delta-val" style={{ color: insight.delta1_color || insight.color }}>
          {insight.delta_val || insight.delta1_val}
        </span>
        <span className="sic-delta-lbl">
          {insight.delta_label || insight.delta1_label}
        </span>
      </div>
      
      <div className="sic-divider" />
      
      <div className="sic-delta">
        <span className="sic-delta-val" style={{ color: insight.delta2_color || insight.color }}>
          {insight.delta_val2 || insight.delta2_val}
        </span>
        <span className="sic-delta-lbl">
          {insight.delta_label2 || insight.delta2_label}
        </span>
      </div>
    </div>
  );
}
