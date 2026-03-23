import React from 'react';

/**
 * A standardized metric card with a large headline, progress bar, and split data points.
 * Expects the standard UDISE+ JSON format for a `card`.
 */
export default function StatCard({ card }) {
  if (!card) return null;

  return (
    <div className="socio-cat-card" style={{ '--cat-color': card.color }}>
      <div className="scc-top-bar" />
      <div className="scc-label" style={{ color: card.color }}>{card.label}</div>
      <div className="scc-full-label">{card.fullLabel}</div>
      
      <div
        className="scc-pct"
        style={{ color: card.color, fontSize: card.headline && card.headline.length > 5 ? 28 : 40 }}
      >
        {card.headline}
      </div>
      
      {/* For Student Dashboards it's usually `headlineNote`, but sometimes `students` fallback */}
      <div className="scc-students">{card.headlineNote || card.students}</div>
      
      {/* Data bar track logic */}
      <div className="scc-bar-track">
        <div
          className="scc-bar-fill"
          data-bar-w={card.bar}
          style={{ width: 0, background: card.color }}
        />
      </div>

      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 9,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: card.color,
        marginBottom: 10,
        marginTop: -2
      }}>
        {card.barLabel}
      </div>
      
      <div className="scc-split">
        {/*
          SocioDashboard uses split objects directly as keys or hardcoded.
          Student/Teacher/School dashboards use an array:
          card.split = [{ lbl: 'Boys', val: '43%', accent: true }, ...]
        */}
        {Array.isArray(card.split) ? (
          card.split.map((s, i) => (
            <React.Fragment key={s.lbl}>
              {i > 0 && <div className="scc-split-divider" />}
              <div className="scc-split-item">
                <span
                  className="scc-split-val"
                  style={s.accent ? { color: card.color, fontSize: 11 } : { fontSize: 10 }}
                >
                  {s.val}
                </span>
                <span className="scc-split-lbl" style={{ fontSize: 7 }}>{s.lbl}</span>
              </div>
            </React.Fragment>
          ))
        ) : (
          /* Fallback for legacy format in SocioDashboard */
          <>
            <div className="scc-split-item">
              <span className="scc-split-val">{card.boys}</span>
              <span className="scc-split-lbl">Boys</span>
            </div>
            <div className="scc-split-divider" />
            <div className="scc-split-item">
              <span className="scc-split-val">{card.girls}</span>
              <span className="scc-split-lbl">Girls</span>
            </div>
            <div className="scc-split-divider" />
            <div className="scc-split-item">
              <span className="scc-split-val" style={{ color: card.color }}>{card.gpi}</span>
              <span className="scc-split-lbl">GPI</span>
            </div>
          </>
        )}
      </div>

      <p className="scc-note">{card.note}</p>
    </div>
  );
}
