import React from 'react';
import PowerBiButton from '../ui/PowerBiButton';
import StatCard from '../ui/StatCard';
import InsightCard from '../ui/InsightCard';

/**
 * Standard Layout wrapper for all Dashboards
 */
export default function DashboardLayout({
  header,
  powerBiUrl,
  cards,
  insights,
  chartCatColor = 'var(--accent)',
  onShowPowerBi,
  children
}) {
  return (
    <div className="dashboard">
      <section className="section socio-section">

        {/* ── HEADER ──────────────────────────────────── */}
        <div className="socio-header">
          <div>
            <div className="section-label" style={{ color: chartCatColor }}>
              {header.label}
            </div>
            <h2 className="section-headline">{header.headline}</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              {header.sub}
            </p>
          </div>
          <PowerBiButton url={powerBiUrl} onClick={onShowPowerBi} />
        </div>

        {/* ── METRIC STAT CARDS ───────────────────────── */}
        <div className="socio-cards">
          {cards && cards.map(c => (
            <StatCard key={c.id || c.label} card={c} />
          ))}
        </div>

        {/* ── BOTTOM: CHARTS + INSIGHTS ───────────────── */}
        <div className="socio-bottom">
          {/* Left panel containing charts (yielded by children) */}
          <div className="socio-charts">
            {children}
          </div>

          {/* Right panel containing insight cards */}
          <div className="socio-insights">
            {insights && insights[0] && <InsightCard insight={insights[0]} />}
            {insights && insights[1] && <InsightCard insight={insights[1]} />}
          </div>
        </div>
      </section>
    </div>
  );
}
