import { useEffect } from 'react';
import './StudentDashboard.css';

/*
 * DATA SOURCE MAP
 * full_school_data          → total_schools, sch_mgmt_center_id, sch_loc_r_u,
 *                             ptr_above_30_schools, ptr_below_30_schools, total_students
 * final_infra_25            → electricity_yn, drink_water_yn, toilet_yn, internet_yn,
 *                             library_yn, computer_yn, ramps_yn (per udise_sch_code)
 * digital_infra             → internet_yn, computer_yn, broadband_yn, tot_computer
 * MCU_school_enrolment_2024-25 → total_schools, total_mcu_schools, t_enr_mcu_sch,
 *                                school_location (rural/semi-urban/urban)
 */

/* ─── REVEAL HOOK ─────────────────────────────────── */
function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.section:not(.visible)');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animateSection(entry.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    const first = document.querySelector('.section');
    if (first) { first.classList.add('visible'); animateSection(first); }
    return () => obs.disconnect();
  }, deps);
}

function animateSection(section) {
  section.querySelectorAll('[data-bar-w]').forEach((el, i) => {
    setTimeout(() => { el.style.width = el.dataset.barW + '%'; }, 150 + i * 80);
  });
}


/* ─── STAT ICONS ───────────────── */
const StatIcon0 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 18V8l8-5 8 5v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="7" y="12" width="3" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" /><rect x="12" y="10" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  </span>
);
const StatIcon1 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 18V9M17 18V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M6 18V9M10 18V9M14 18V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M1 9h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M4 9L10 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="10" cy="6" r="1" fill="currentColor" /></svg>
  </span>
);
const StatIcon2 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M4 18v-1.5C4 13.42 6.69 11 10 11s6 2.42 6 5.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  </span>
);
const StatIcon3 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5L1.5 17h17L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 8v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="10" cy="14.5" r="0.8" fill="currentColor" /></svg>
  </span>
);

/* ─── HERO ──────────────────── */
function Hero() {
  const heroStats = [
    { val: '14.7 L', label: 'Total Schools', sub: 'Govt, aided & private' },
    { val: '73%', label: 'Govt. Schools', sub: 'Public-supported share' },
    { val: '1 L', label: 'Single-Teacher Schools', sub: 'Critical resource gap' },
    { val: '9T', label: 'Zero-Teacher Schools', sub: 'Require urgent attention' },
  ];
  return (
    <div style={{
      background: 'var(--ink)',
      padding: '72px var(--px) 72px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 5% 55%, rgba(225,29,72,0.13) 0%, transparent 65%)'
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '48%', height: '100%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 80% 50%, rgba(225,29,72,0.07) 0%, transparent 70%)'
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 48,
        position: 'relative', zIndex: 1
      }}>
        <div style={{ flex: '0 0 auto', maxWidth: 480 }}>
          <span style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 20,
            background: 'rgba(225,29,72,0.18)', border: '1px solid rgba(225,29,72,0.35)',
            color: '#fda4af', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20
          }}>
            🏫 School Analytics
          </span>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(30px,3.6vw,52px)', fontWeight: 900,
            lineHeight: 1.06, letterSpacing: '-0.025em',
            color: 'var(--paper)', marginBottom: 16
          }}>
            Schools as Platforms<br />
            <span style={{ color: '#fda4af' }}>for Equity</span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.72, color: 'rgba(250,246,239,0.45)', maxWidth: 420 }}>
            Explore how schools are distributed across management types and locations, what basic and digital infrastructure they have, and where single-teacher arrangements reveal the deepest resource gaps.
          </p>
        </div>
        <div style={{ flex: '0 0 auto', width: 'min(560px, 48%)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginLeft: 'auto', alignSelf: 'stretch' }}>
          {heroStats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.035)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: `2px solid rgba(225,29,72,0.35)`,
              borderRadius: 20,
              padding: '28px 28px 24px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)'
              }} />
              <div style={{ marginBottom: 14, lineHeight: 1 }}>
                {[<StatIcon0 color="#fda4af" />, <StatIcon1 color="#fda4af" />, <StatIcon2 color="#fda4af" />, <StatIcon3 color="#fda4af" />][i]}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(24px,2.4vw,34px)',
                fontWeight: 800, lineHeight: 1, color: '#fda4af', marginBottom: 6
              }}>{s.val}</div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 4
              }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCHOOL LANDING
══════════════════════════════════════════════════════ */
export function SchoolLanding({ onShowDashboard }) {
  useReveal([]);

  const CAT = '#6366f1';

  return (
    <div className="dashboard">
      <Hero />

      {/* ── 01 · School Analytics ───────────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 01 · School Analytics</div>
        <h2 className="section-headline">14.7 lakh schools — 73% government-run, 1 L single-teacher</h2>
        <p className="section-sub">Government schools educate nearly three-quarters of India's children — and the vast majority of those are in rural areas. Understanding how schools are distributed, who runs them, and where the gaps are is the starting point for any serious conversation about improving access.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'Government', val: '73%', pct: 100 },
                { name: 'Private Unaided', val: '19%', pct: 26 },
                { name: 'Government Aided', val: '6%', pct: 8 },
                { name: 'Central Govt. (KVS/NVS)', val: '1%', pct: 1 },
                { name: 'Other', val: '1%', pct: 1 },
              ].map(r => (
                <div key={r.name} className="state-row">
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: CAT }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            {/* Urban vs Rural split */}
            <div style={{ marginTop: 28 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>SCHOOL COUNT BY LOCATION</div>
              <div className="states-list">
                {[
                  { name: 'Rural Schools', val: '11 L', pct: 100 },
                  { name: 'Semi-Urban Schools', val: '2.2 L', pct: 20 },
                  { name: 'Urban Schools', val: '1.5 L', pct: 14 },
                ].map(r => (
                  <div key={r.name} className="state-row">
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'rgba(225,29,72,0.65)' }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"Government schools serve 73% of children but receive a fraction of the per-student spending of private unaided schools."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('school-main')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>14.7 L</div>
              <div className="stat-card-label">Total Schools in UDISE+</div>
              <div className="stat-card-note">India has over 14 lakh schools — three-quarters of them in rural areas. Government schools account for 73% of enrollment, serving the children who depend most on public education.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>69%</div>
              <div className="stat-card-label">Schools Within PTR Norm</div>
              <div className="stat-card-note">One in four schools still has more students per teacher than the law allows — and most of those schools are in rural areas where alternatives are fewest and consequences for children are greatest.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · Infrastructure Analytics ───────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 02 · Infrastructure Analytics</div>
        <h2 className="section-headline">What does a school building actually have?</h2>
        <p className="section-sub">
          Infrastructure in India's schools has improved dramatically over the past decade. Electricity, drinking water, and toilets now cover the vast majority of schools — but digital access, science labs, and accessibility features for children with disabilities remain the unfinished chapter.
          but deeply uneven across rural, tribal, and aspirational geographies.
        </p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'Drinking Water', val: '93%', pct: 93 },
                { name: 'Electricity', val: '91%', pct: 91 },
                { name: 'Functional Toilet', val: '1 L', pct: 89 },
                { name: 'Girls\' Toilet', val: '84%', pct: 84 },
                { name: 'Library / Reading Room', val: '52%', pct: 52 },
                { name: 'Zero-Teacher Schools', val: '9T', pct: 41 },
                { name: 'Computer Lab', val: '36%', pct: 36 },
                { name: 'Ramps / Accessibility', val: '28%', pct: 28 },
              ].map(r => (
                <div key={r.name} className="state-row">
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: CAT }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"91% of schools have electricity — but 'functional electricity during school hours' in aspirational districts tells a very different story."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('infra')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>41%</div>
              <div className="stat-card-label">Schools with Internet Access</div>
              <div className="stat-card-note">Rural schools lag urban schools by over 30 percentage points on internet access. The digital divide in education is not just about devices — it is about which children get to participate in a connected world.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>28%</div>
              <div className="stat-card-label">Schools with Ramps / Accessibility</div>
              <div className="stat-card-note">Fewer than 1 in 3 schools has a ramp or accessible entry. For the 22 lakh children with physical disabilities enrolled across India, a missing ramp is not a minor inconvenience — it is the reason they may never set foot inside a school.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · Digital Infrastructure ─────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 03 · Digital Infrastructure</div>
        <h2 className="section-headline">Connected schools, disconnected districts</h2>
        <p className="section-sub">Internet and computer access in schools varies enormously — between states, between urban and rural areas, and between government and private schools. Where a school sits on the digital divide determines whether its students are prepared for an increasingly connected world.</p>
        <div className="two-col">
          <div>
            {/* Urban vs Rural digital comparison */}
            <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>URBAN SCHOOLS</div>
            <div className="states-list">
              {[
                { name: 'Zero-Teacher Schools', val: '71%', pct: 100 },
                { name: 'Broadband', val: '58%', pct: 82 },
                { name: 'Computer Lab', val: '64%', pct: 90 },
              ].map(r => (
                <div key={'u-' + r.name} className="state-row">
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: CAT }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>RURAL SCHOOLS</div>
              <div className="states-list">
                {[
                  { name: 'Zero-Teacher Schools', val: '28%', pct: 39 },
                  { name: 'Broadband', val: '16%', pct: 23 },
                  { name: 'Computer Lab', val: '21%', pct: 30 },
                ].map(r => (
                  <div key={'r-' + r.name} className="state-row">
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'rgba(225,29,72,0.45)' }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"A child in an urban school is 2.5× more likely to have internet access than a child in a rural one — the same system, a different world."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('infra')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>43 pts</div>
              <div className="stat-card-label">Urban–Rural Digital Divide</div>
              <div className="stat-card-note">
                Urban internet_yn (71%) minus rural internet_yn (28%) from digital_infra
                filtered by sch_loc_r_u. This gap has narrowed by only 6 points over 3 years —
                at current pace it will not close for another decade.
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>36%</div>
              <div className="stat-card-label">Schools with Computer Labs</div>
              <div className="stat-card-note">While the national average is 8 computers per school, that number masks enormous inequality. Many urban private schools have full computer labs while thousands of rural schools have none at all.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · Multi Class Units ──────────────────── */}
      <section className="section" style={{ borderBottom: 'none' }}>
        <div className="section-label" style={{ color: CAT }}>Section 04 · Multi Class Units</div>
        <h2 className="section-headline">One teacher, five grades — the reality of rural India</h2>
        <p className="section-sub">In thousands of schools across India, one teacher manages multiple grade levels in a single classroom — not by choice, but because there is no other teacher available. These multi-class units are concentrated in the most remote rural areas, where children have the fewest alternatives.</p>
        <div className="two-col">
          <div>
            {/* MCU by location */}
            <div className="states-list">
              {[
                { name: 'Rural MCU Schools', val: '56%', pct: 100 },
                { name: 'Semi-Urban MCU Schools', val: '30%', pct: 54 },
                { name: 'Urban MCU Schools', val: '14%', pct: 25 },
              ].map(r => (
                <div key={r.name} className="state-row">
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: CAT }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            {/* MCU concentration by state */}
            <div style={{ marginTop: 28 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>STATES WITH HIGHEST MCU CONCENTRATION</div>
              <div className="states-list">
                {[
                  { rank: '01', name: 'Rajasthan', val: '62%', pct: 100 },
                  { rank: '02', name: 'Madhya Pradesh', val: '58%', pct: 94 },
                  { rank: '03', name: 'Uttar Pradesh', val: '52%', pct: 84 },
                  { rank: '04', name: 'Bihar', val: '48%', pct: 77 },
                  { rank: '05', name: 'Odisha', val: '44%', pct: 71 },
                  { rank: '06', name: 'National Avg', val: '31%', pct: 50 },
                ].map(r => (
                  <div key={r.rank} className="state-row">
                    <div className="state-rank">{r.rank}</div>
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'rgba(225,29,72,0.65)' }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"In 12% of India's schools, a single teacher is legally responsible for all children, all subjects, and all grades simultaneously."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('multiclass')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>8.2 L</div>
              <div className="stat-card-label">Multi-Class Unit Schools</div>
              <div className="stat-card-note">
                total_mcu_schools from MCU_school_enrolment_2024-25. t_enr_mcu_sch shows
                2.4 crore students in these schools — predominantly rural, predominantly
                government-run, and predominantly serving SC/ST communities.
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>2.4 Cr</div>
              <div className="stat-card-label">Students in MCU Schools</div>
              <div className="stat-card-note">
                t_enr_mcu_sch from MCU_school_enrolment_2024-25. These 2.4 crore children
                receive multi-grade instruction daily — a condition that research consistently
                links to lower learning outcomes and higher dropout at transition points.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">A school is only as strong<br />as what happens inside it.</div>
        <div className="footer-right">
          Data Source: UDISE+ 2023–24<br />
          Ministry of Education, Govt. of India<br />
          School Analytics Landing
        </div>
      </footer>
    </div>
  );
}

export default SchoolLanding;