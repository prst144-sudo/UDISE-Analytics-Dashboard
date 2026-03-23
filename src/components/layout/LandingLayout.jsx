import React from 'react';
import PowerBiButton from '../ui/PowerBiButton';

/**
 * Standard layout for Landing Pages (StudentLanding, SchoolLanding, etc).
 * Replaces the massive duplicated HTML blocks across landing files.
 */
export default function LandingLayout({
  // Hero section
  heroLabel,
  heroTitle,
  heroSub,
  heroKeyStat,
  heroColor, // E.g., STU, CAT
  powerBiUrl,
  onShowPowerBi,
  // Tab selector inside the hero
  tabsComponent,
  // Main injected content strips
  children
}) {
  return (
    <div className="landing-page">
      {/* ── HERO METRICS STRIP ── */}
      <section className="section stu-hero-strip" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="stu-hero-bg" />
        <div className="stu-hero-nav">
          <div className="shn-label">{heroLabel}</div>
          <div className="shn-links">
            <PowerBiButton url={powerBiUrl} onClick={onShowPowerBi} />
          </div>
        </div>

        <div className="stu-hero-main">
          <div className="stu-hero-text">
            <h1 className="stu-hero-h1">{heroTitle}</h1>
            <p className="stu-hero-sub">{heroSub}</p>
          </div>
          <div className="stu-hero-metric">
            {heroKeyStat && (
              <>
               <div className="shm-val" style={{ color: heroColor }}>
                  {heroKeyStat.val}
                </div>
                <div className="shm-lbl">{heroKeyStat.lbl}</div>
                {heroKeyStat.note && (
                  <div className="shm-note">{heroKeyStat.note}</div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── PRIMARY TAB CONTROLS ── */}
      <div className="stu-tabs-wrap">
        {tabsComponent}
      </div>

      {/* ── CONTENT STRIPS YIELDED BY SPECIFIC LANDING COMPONENTS ── */}
      {children}
    </div>
  );
}
