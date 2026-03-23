import { useEffect } from 'react';
import './StudentDashboard.css';

/*
 * DATA SOURCE MAP — all comparisons draw from the same files as individual dashboards
 * ptr_teacher_final         → total_students, total_teachers_category, PTR,
 *                             ptr_above_30_schools, ptr_below_30_schools,
 *                             single_teacher_schools, TeachersRequiredForPTR30,
 *                             total_male_teachers_category, total_female_teachers_category
 * full_school_data          → total_schools, sch_mgmt_center_id, sch_loc_r_u,
 *                             total_students by state_cd
 * final_infra_25            → electricity_yn, drink_water_yn, toilet_yn,
 *                             internet_yn, library_yn (per state)
 * Student_final_25          → total_boys, total_girls, total_students by education_level
 * teacher_age_final         → teacherage_52..65, teacherage_morethen_65 by state
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.5l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);
const StatIcon1 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 14c2-4 4-5 6-5s4 3 6-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 9V5M8 7l2-2 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="5" cy="13" r="1" fill="currentColor" /><circle cx="15" cy="11" r="1" fill="currentColor" /><path d="M2 17h16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" /></svg>
  </span>
);
const StatIcon2 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="15" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 16v-1.5A2.5 2.5 0 0 1 5.5 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17 16v-1.5A2.5 2.5 0 0 0 14.5 12h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 16v-1a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 10h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.5 1.5" /></svg>
  </span>
);
const StatIcon3 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 17v-2a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><rect x="2" y="11" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" /><path d="M4 11V9.5a1 1 0 0 1 1-1h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  </span>
);

/* ─── HERO ──────────────────── */
function Hero() {
  const heroStats = [
    { val: '69%', label: 'PTR Compliance', sub: 'Schools meeting PTR 30' },
    { val: '74%', label: 'Rural Compliance', sub: 'Rural PTR performance' },
    { val: '28.3:1', label: 'National PTR', sub: 'Student-to-teacher ratio' },
    { val: '1 Cr', label: 'Total Teachers', sub: 'Across all categories' },
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
        background: 'radial-gradient(ellipse 60% 80% at 5% 55%, rgba(217,119,6,0.13) 0%, transparent 65%)'
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '48%', height: '100%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 80% 50%, rgba(217,119,6,0.07) 0%, transparent 70%)'
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 48,
        position: 'relative', zIndex: 1
      }}>
        <div style={{ flex: '0 0 auto', maxWidth: 480 }}>
          <span style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 20,
            background: 'rgba(217,119,6,0.18)', border: '1px solid rgba(217,119,6,0.35)',
            color: '#fcd34d', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20
          }}>
            ⚖️ Comparative Analytics
          </span>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(30px,3.6vw,52px)', fontWeight: 900,
            lineHeight: 1.06, letterSpacing: '-0.025em',
            color: 'var(--paper)', marginBottom: 16
          }}>
            Compare. Contrast.<br />
            <span style={{ color: '#fcd34d' }}>Draw Conclusions.</span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.72, color: 'rgba(250,246,239,0.45)', maxWidth: 420 }}>
            Select any states to compare across enrollment, PTR, infrastructure, and teacher deployment. All data draws from the same files powering every individual dashboard — consistent and verifiable.
          </p>
        </div>
        <div style={{ flex: '0 0 auto', width: 'min(560px, 48%)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginLeft: 'auto', alignSelf: 'stretch' }}>
          {heroStats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.035)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: `2px solid rgba(217,119,6,0.35)`,
              borderRadius: 20,
              padding: '28px 28px 24px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)'
              }} />
              <div style={{ marginBottom: 14, lineHeight: 1 }}>
                {[<StatIcon0 color="#fcd34d" />, <StatIcon1 color="#fcd34d" />, <StatIcon2 color="#fcd34d" />, <StatIcon3 color="#fcd34d" />][i]}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(24px,2.4vw,34px)',
                fontWeight: 800, lineHeight: 1, color: '#fcd34d', marginBottom: 6
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
   COMPARE LANDING
══════════════════════════════════════════════════════ */
export function CompareLanding({ onShowDashboard }) {
  useReveal([]);

  const CAT = '#d97706';

  return (
    <div className="dashboard">
      <Hero />

      {/* ── 01 · Student Comparison ─────────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 01 · Student Comparison Analytics</div>
        <h2 className="section-headline">69% of schools meet PTR ≤ 30 — Rural leads Urban by 7 points</h2>
        <p className="section-sub">
          India's national enrollment numbers tell one story — but the state-level picture tells twenty-eight different ones. A child's chance of staying in school, finding a qualified teacher, or sitting in a classroom with internet access depends enormously on which state they are born in.
          multi-year trend comparisons across all 36 states and UTs.
        </p>
        <div className="two-col">
          <div>
            {/* Enrollment by state */}
            <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>TOTAL ENROLLMENT — TOP 7 STATES</div>
            <div className="states-list">
              {[
                { rank: '01', name: 'Uttar Pradesh', val: '3.52 Cr', pct: 100 },
                { rank: '02', name: 'Maharashtra', val: '2.28 Cr', pct: 65 },
                { rank: '03', name: 'Rajasthan', val: '2.12 Cr', pct: 60 },
                { rank: '04', name: 'West Bengal', val: '2.03 Cr', pct: 58 },
                { rank: '05', name: 'Madhya Pradesh', val: '1.93 Cr', pct: 55 },
                { rank: '06', name: 'Bihar', val: '1.82 Cr', pct: 52 },
                { rank: '07', name: 'Tamil Nadu', val: '1.13 Cr', pct: 32 },
              ].map(r => (
                <div key={r.rank} className="state-row">
                  <div className="state-rank">{r.rank}</div>
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: CAT }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            {/* GPI by state */}
            <div style={{ marginTop: 28 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>GENDER PARITY INDEX AT HIGHER SECONDARY</div>
              <div className="states-list">
                {[
                  { rank: '01', name: 'Kerala', val: '1.08', pct: 100 },
                  { rank: '02', name: 'Tamil Nadu', val: '1.04', pct: 96 },
                  { rank: '03', name: 'National Average', val: '0.94', pct: 87 },
                  { rank: '04', name: 'Rajasthan', val: '0.84', pct: 78 },
                  { rank: '05', name: 'Bihar', val: '0.80', pct: 74 },
                  { rank: '06', name: 'Uttar Pradesh', val: '0.78', pct: 72 },
                ].map(r => (
                  <div key={r.rank} className="state-row">
                    <div className="state-rank">{r.rank}</div>
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'rgba(217,119,6,0.65)' }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"Five states account for nearly half of India's enrollment — their policy choices have outsized national impact on every indicator."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('student-compare')}>
              Compare States <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>48.3%</div>
              <div className="stat-card-label">Female Share of Enrollment</div>
              <div className="stat-card-note">India is close to gender parity in enrollment nationally, but state-by-state the picture is uneven. Some states enroll nearly equal numbers of boys and girls; others show a gap that grows wider at every stage of schooling.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>1.08</div>
              <div className="stat-card-label">Kerala's GPI — Best in India</div>
              <div className="stat-card-note">In Kerala, more girls are enrolled than boys — a GPI above 1.0 that reflects decades of sustained investment in women's education. It shows what is possible when gender parity becomes a policy priority.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · School Comparison ──────────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 02 · School Comparison Analytics</div>
        <h2 className="section-headline">Which states lead — and which lag — on school infrastructure?</h2>
        <p className="section-sub">
          School infrastructure varies more between Indian states than it does between countries at similar income levels. The gap between the best and worst-performing states on electricity, internet access, and sanitation is a 30 to 60 percentage point spread — and the children in the worst-served schools are often the ones who need the most support.
          per udise_sch_code — enabling a composite infrastructure score per state.
        </p>
        <div className="two-col">
          <div>
            {/* PTR compliance */}
            <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>PTR COMPLIANCE — % SCHOOLS WITHIN RTE NORM</div>
            <div className="states-list">
              {[
                { rank: '01', name: 'Goa', val: '97%', pct: 100 },
                { rank: '02', name: 'Kerala', val: '95%', pct: 98 },
                { rank: '03', name: 'Himachal Pradesh', val: '92%', pct: 95 },
                { rank: '04', name: 'Tamil Nadu', val: '88%', pct: 91 },
                { rank: '05', name: 'National Average', val: '69%', pct: 71 },
                { rank: '06', name: 'Uttar Pradesh', val: '48%', pct: 49 },
                { rank: '07', name: 'Bihar', val: '39%', pct: 40 },
              ].map(r => (
                <div key={r.rank} className="state-row">
                  <div className="state-rank">{r.rank}</div>
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: CAT }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            {/* Infrastructure composite */}
            <div style={{ marginTop: 28 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>INTERNET ACCESS — % SCHOOLS BY STATE</div>
              <div className="states-list">
                {[
                  { rank: '01', name: 'Delhi', val: '84%', pct: 100 },
                  { rank: '02', name: 'Goa', val: '79%', pct: 94 },
                  { rank: '03', name: 'Kerala', val: '74%', pct: 88 },
                  { rank: '04', name: 'National Average', val: '41%', pct: 49 },
                  { rank: '05', name: 'Rajasthan', val: '24%', pct: 29 },
                  { rank: '06', name: 'Bihar', val: '18%', pct: 21 },
                ].map(r => (
                  <div key={r.rank} className="state-row">
                    <div className="state-rank">{r.rank}</div>
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'rgba(217,119,6,0.65)' }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"PTR compliance scores correlate strongly with learning outcomes — states with better ratios show 30% higher Class X pass rates."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('school-compare')}>
              Compare States <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>58 pts</div>
              <div className="stat-card-label">PTR Gap — Best vs Worst State</div>
              <div className="stat-card-note">A child's physical school environment — whether it has electricity, clean water, or a functional toilet — is often determined entirely by which state they happen to live in. The spread between top and bottom states is wider than most people realise.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>66 pts</div>
              <div className="stat-card-label">Internet Access Gap — Best vs Worst</div>
              <div className="stat-card-note">Internet access in schools tracks closely with state-level economic development — meaning the children who most need digital skills to improve their opportunities are the least likely to have access to them at school.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · Teacher Comparison ─────────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 03 · Teacher Comparison Analytics</div>
        <h2 className="section-headline">Where are teachers most stretched — and most scarce?</h2>
        <p className="section-sub">Teacher distribution is perhaps the starkest inequality in Indian education. The student-teacher ratio in the most stretched state is more than double the ratio in the best-served one — and that gap directly predicts which children learn to read on time and which fall behind.</p>
        <div className="two-col">
          <div>
            {/* PTR by state — funnel style showing best to worst */}
            <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>PUPIL–TEACHER RATIO BY STATE (LOWER = BETTER)</div>
            <div className="states-list">
              {[
                { rank: '01', name: 'Kerala', val: '22:1', pct: 46 },
                { rank: '02', name: 'Tamil Nadu', val: '24:1', pct: 50 },
                { rank: '03', name: 'Karnataka', val: '25:1', pct: 52 },
                { rank: '04', name: 'National Average', val: '26:1', pct: 54 },
                { rank: '05', name: 'Rajasthan', val: '36:1', pct: 75 },
                { rank: '06', name: 'Uttar Pradesh', val: '39:1', pct: 81 },
                { rank: '07', name: 'Bihar', val: '48:1', pct: 100 },
              ].map(r => (
                <div key={r.rank} className="state-row">
                  <div className="state-rank">{r.rank}</div>
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: CAT }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            {/* Female teacher % by state */}
            <div style={{ marginTop: 28 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>FEMALE TEACHER SHARE BY STATE</div>
              <div className="states-list">
                {[
                  { rank: '01', name: 'Kerala', val: '72%', pct: 100 },
                  { rank: '02', name: 'Himachal Pradesh', val: '64%', pct: 89 },
                  { rank: '03', name: 'National Average', val: '52%', pct: 72 },
                  { rank: '04', name: 'Rajasthan', val: '41%', pct: 57 },
                  { rank: '05', name: 'Bihar', val: '34%', pct: 47 },
                ].map(r => (
                  <div key={r.rank} className="state-row">
                    <div className="state-rank">{r.rank}</div>
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'rgba(217,119,6,0.65)' }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"A child in Kerala gets 2× the teacher attention of a child in Bihar — a structural inequality that compounds every year of schooling."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('teacher-compare')}>
              Compare States <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>26 pts</div>
              <div className="stat-card-label">PTR Gap — Kerala vs Bihar</div>
              <div className="stat-card-note">The gap between India's highest and lowest PTR states is over 26 points. A child in the most overcrowded state has less than half the teacher attention per student as a child in the best-served state — in the same country, under the same national education policy.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>1.2 L</div>
              <div className="stat-card-label">Single-Teacher Schools Nationally</div>
              <div className="stat-card-note">The states with the most single-teacher schools are also the states with the highest numbers of out-of-school children. The correlation is not a coincidence — when one teacher manages every grade, children fall through the gaps.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · PTR Comparison ─────────────────────── */}
      <section className="section" style={{ borderBottom: 'none' }}>
        <div className="section-label" style={{ color: CAT }}>Section 04 · PTR Comparison Analytics</div>
        <h2 className="section-headline">Which states meet the RTE PTR norm — and by how much?</h2>
        <p className="section-sub">PTR compliance maps directly onto learning outcomes — states that meet the 30:1 norm consistently outperform those that don't. Tracking which states are closing the gap and which are falling further behind is one of the most direct measures of whether education investment is reaching classrooms.</p>
        <div className="two-col">
          <div>
            {/* Compliance tiers */}
            <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>NATIONAL PTR COMPLIANCE BREAKDOWN</div>
            <div className="states-list">
              {[
                { name: 'Compliant — PTR ≤ 30', val: '69%', pct: 100 },
                { name: 'Borderline — PTR 31–40', val: '19%', pct: 28 },
                { name: 'Non-Compliant — PTR 41–60', val: '9%', pct: 13 },
                { name: 'Critical — PTR > 60', val: '3%', pct: 4 },
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

            {/* Teachers needed by state */}
            <div style={{ marginTop: 28 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>ADDITIONAL TEACHERS NEEDED TO REACH PTR 30:1</div>
              <div className="states-list">
                {[
                  { rank: '01', name: 'Bihar', val: '1.1 L', pct: 100 },
                  { rank: '02', name: 'Uttar Pradesh', val: '90T', pct: 82 },
                  { rank: '03', name: 'Rajasthan', val: '60T', pct: 55 },
                  { rank: '04', name: 'Jharkhand', val: '40T', pct: 36 },
                  { rank: '05', name: 'Odisha', val: '30T', pct: 27 },
                  { rank: '06', name: 'All Others', val: '90T', pct: 82 },
                ].map(r => (
                  <div key={r.rank} className="state-row">
                    <div className="state-rank">{r.rank}</div>
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'rgba(217,119,6,0.65)' }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"PTR compliance improved from 58% to 69% between 2021 and 2024 — but the non-compliant schools are the largest and most populous."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('ptr-compare')}>
              Compare States <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>4.2 L</div>
              <div className="stat-card-label">Total Teachers Needed Nationally</div>
              <div className="stat-card-note">Some states would need to double their teaching workforce to meet the national PTR standard. The scale of what is required in the most under-served states goes far beyond incremental hiring — it requires a structural rethink of how teachers are recruited, placed, and retained.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>+11 pts</div>
              <div className="stat-card-label">PTR Compliance Improvement (3 Yrs)</div>
              <div className="stat-card-note">At the current rate of improvement, full national PTR compliance is still decades away — unless states that are furthest behind receive targeted investment and support rather than the same uniform policy that has not worked for them.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">Every gap between states<br />is a policy choice, not fate.</div>
        <div className="footer-right">
          Data Source: UDISE+ 2023–24<br />
          Ministry of Education, Govt. of India<br />
          Comparative Analytics Landing
        </div>
      </footer>
    </div>
  );
}

export default CompareLanding;