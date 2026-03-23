/**
 * HBarChart — Recharts-compatible horizontal bar chart with hover tooltips.
 *
 * Props mirror Recharts BarChart + Bar + Tooltip:
 *   data        : array of { name, val, pct, color, note? }
 *   nameKey     : string key for the label  (default 'name')
 *   dataKey     : string key for bar width  (default 'pct')
 *   valKey      : string key for display value (default 'val')
 *   colorKey    : string key for bar color  (default 'color')
 *   barRadius   : corner radius             (default 3)
 *   barHeight   : height per bar row in px  (default 28)
 *   animDuration: ms for bar entrance anim  (default 900)
 *   nameWidth   : px reserved for label col (default 160)
 *   valWidth    : px reserved for value col (default 52)
 *   tooltipFormatter : (row) => string      (optional custom tooltip)
 *   className   : extra class on wrapper
 *   style       : extra inline style on wrapper
 *
 * Drop-in replacement path when npm is available:
 *   swap this file for a thin recharts wrapper keeping the same prop surface.
 */

import { useState, useRef, useCallback } from 'react';
import './HBarChart.css';

export default function HBarChart({
  data = [],
  nameKey   = 'name',
  dataKey   = 'pct',
  valKey    = 'val',
  colorKey  = 'color',
  barRadius = 3,
  barHeight = 28,
  animDuration = 900,
  nameWidth = 160,
  valWidth  = 52,
  tooltipFormatter,
  className = '',
  style = {},
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tooltip, setTooltip]       = useState({ visible: false, x: 0, y: 0, content: '' });
  const wrapRef = useRef(null);

  const handleMouseEnter = useCallback((e, row, idx) => {
    setHoveredIdx(idx);
    const content = tooltipFormatter
      ? tooltipFormatter(row)
      : [
          row[nameKey],
          `Value: ${row[valKey] ?? row[dataKey]}`,
          row.note ? row.note : null,
        ].filter(Boolean).join('\n');

    const rect = wrapRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 8,
      content,
    });
  }, [nameKey, valKey, dataKey, tooltipFormatter]);

  const handleMouseMove = useCallback((e) => {
    if (!tooltip.visible) return;
    const rect = wrapRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    setTooltip(t => ({ ...t, x: e.clientX - rect.left, y: e.clientY - rect.top - 8 }));
  }, [tooltip.visible]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIdx(null);
    setTooltip(t => ({ ...t, visible: false }));
  }, []);

  if (!data.length) return null;

  return (
    <div
      ref={wrapRef}
      className={`hbar-wrap ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {data.map((row, idx) => {
        const pct    = Number(row[dataKey]) || 0;
        const color  = row[colorKey] || 'var(--accent)';
        const isHov  = hoveredIdx === idx;

        return (
          <div
            key={row[nameKey] ?? idx}
            className={`hbar-row ${isHov ? 'hbar-row--hov' : ''}`}
            style={{ minHeight: barHeight }}
            onMouseEnter={e => handleMouseEnter(e, row, idx)}
          >
            {/* Label */}
            <div className="hbar-label" style={{ width: nameWidth }}>
              {row[nameKey]}
            </div>

            {/* Track + animated fill */}
            <div className="hbar-track">
              <div
                className="hbar-fill"
                style={{
                  width: `${pct}%`,
                  background: color,
                  borderRadius: barRadius,
                  opacity: hoveredIdx !== null && !isHov ? 0.55 : 1,
                  animationDuration: `${animDuration}ms`,
                }}
              />
            </div>

            {/* Value */}
            <div
              className="hbar-val"
              style={{ width: valWidth, color }}
            >
              {row[valKey] ?? `${pct}%`}
            </div>
          </div>
        );
      })}

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="hbar-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content.split('\n').map((line, i) => (
            <div key={i} className={i === 0 ? 'hbar-tt-title' : 'hbar-tt-line'}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
