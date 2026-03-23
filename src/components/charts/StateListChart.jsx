import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

/**
 * Custom Tooltip for StateListChart
 */
const StateTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="hbar-tooltip" style={{ display: 'block', visibility: 'visible', opacity: 1, position: 'relative' }}>
        <div className="hbar-tt-title">{label}</div>
        <div className="hbar-tt-line">Value: {data.val ?? data.pct}</div>
        {data.note && <div className="hbar-tt-line">{data.note}</div>}
        {data.scPct && data.stPct && <div className="hbar-tt-line">SC: {data.scPct} | ST: {data.stPct}</div>}
      </div>
    );
  }
  return null;
};

/**
 * Standardized State List Chart using Recharts
 * Replaces the custom HTML `.states-list` blocks seen in SocioDashboard and Dropouts.
 */
export default function StateListChart({
  data = [],
  nameKey = 'name',
  dataKey = 'pct',
  valKey = 'val',
  colorKey = 'color',
  barRadius = [0, 4, 4, 0],
  barHeight = 12,
  animDuration = 900,
  nameWidth = 140,
  className = '',
  style = {},
  showExtraLabels = false // Shows SC/ST sublabels if data supports it
}) {
  if (!data || !data.length) return null;

  const parsedData = data.map(d => ({
    ...d,
    [dataKey]: Number(d[dataKey]) || 0
  }));

  // Taller rows to accommodate extra labels if needed
  const rowHeight = showExtraLabels ? 36 : 28;
  const containerHeight = parsedData.length * rowHeight + 20;

  return (
    <div className={`states-list-chart ${className}`} style={{ height: containerHeight, width: '100%', ...style }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={parsedData}
          margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
          barSize={barHeight}
          barGap={10}
        >
          <XAxis type="number" hide domain={[0, 'dataMax']} />
          <YAxis
            type="category"
            dataKey={nameKey}
            width={nameWidth}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--ink)', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}
          />
          <Tooltip cursor={{ fill: 'transparent' }} content={<StateTooltip />} />
          <Bar
            dataKey={dataKey}
            radius={barRadius}
            animationDuration={animDuration}
            isAnimationActive={true}
            label={(props) => {
              const { x, y, width, value, payload } = props;
              const displayVal = payload[valKey] ?? `${value}%`;
              return (
                <g>
                  {/* Primary Value */}
                  <text
                    x={x + width + 10}
                    y={y + barHeight - 1} // Align to baseline manually
                    fill={payload[colorKey] || 'var(--accent)'}
                    fontSize={14}
                    fontFamily="'DM Sans', sans-serif"
                    fontWeight={800}
                    textAnchor="start"
                  >
                    {displayVal}
                  </text>
                  {/* Secondary/Sub Labels (e.g. SC/ST split) */}
                  {showExtraLabels && payload.scPct && payload.stPct && (
                    <text
                      x={x + width + 10}
                      y={y + barHeight + 12}
                      fill="var(--muted)"
                      fontSize={9}
                      letterSpacing="0.06em"
                      textAnchor="start"
                    >
                      SC {payload.scPct} · ST {payload.stPct}
                    </text>
                  )}
                  {/* Secondary single note */}
                  {!showExtraLabels && payload.note && (
                    <text
                      x={x + width + 10}
                      y={y + barHeight + 12}
                      fill="var(--muted)"
                      fontSize={9}
                      textAnchor="start"
                    >
                      {payload.note}
                    </text>
                  )}
                </g>
              );
            }}
          >
            {parsedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry[colorKey] || 'var(--accent)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
