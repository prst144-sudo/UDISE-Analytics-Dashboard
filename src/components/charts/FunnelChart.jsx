import React from 'react';
import { FunnelChart as ReFunnelChart, Funnel, Tooltip, Cell, LabelList } from 'recharts';

/**
 * Standard Tooltip for Funnels
 */
const FunnelTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="hbar-tooltip" style={{ display: 'block', visibility: 'visible', opacity: 1, position: 'relative' }}>
        <div className="hbar-tt-title" style={{ color: data.color || 'var(--ink)' }}>{data.name}</div>
        <div className="hbar-tt-line">Value: {data.val}</div>
      </div>
    );
  }
  return null;
};

/**
 * FunnelChart Wrapper replacing custom HTML funnels
 */
export default function FunnelChart({
  data = [],
  dataKey = 'pct', // Base widths on percentage
  nameKey = 'name',
  className = '',
  width = 500,
  height = 360,
}) {
  if (!data || !data.length) return null;

  // Convert string percentages to numbers for Recharts calculations
  const parsedData = data.map(d => ({
    ...d,
    [dataKey]: Number(d[dataKey]) || 0
  }));

  return (
    <div className={`funnel-wrap-std ${className}`} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ReFunnelChart width={width} height={height}>
        <Tooltip content={<FunnelTooltip />} />
        <Funnel
          dataKey={dataKey}
          data={parsedData}
          isAnimationActive={true}
          animationDuration={800}
        >
          {/* Custom label to show original pre-formatted string value e.g '100%' instead of 100 */}
          <LabelList
            position="center"
            fill="#fff"
            stroke="none"
            dataKey="val"
            style={{ fontWeight: 700, fontFamily: "'DM Sans', sans-serif", fontSize: 22 }}
          />
          {parsedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || 'var(--accent)'} />
          ))}
        </Funnel>
      </ReFunnelChart>
    </div>
  );
}
