import { useEffect } from 'react';
import './StudentDashboard.css';

/*
 * DATA SOURCE MAP
 * ptr_teacher_final         → total_teachers_category, total_male_teachers_category,
 *                             total_female_teachers_category, PTR, ptr_above_30_schools,
 *                             ptr_below_30_schools, single_teacher_schools,
 *                             zero_teacher_schools, TeachersRequiredForPTR30
 * cwsn_teacher_25_final     → tot_teacher, tot_teacher_trainrd_cwsn,
 *                             tot_teacher_rec_train_cwsn
 * teacher_age_final         → teacherage_52..65, teacherage_morethen_65,
 *                             nature_of_appt (regular/contractual/part-time)
 * student_teacher_vocational25 → total_students, total_teachers by sector_id
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 17v-2a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><rect x="2" y="11" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" /><path d="M4 11V9.5a1 1 0 0 1 1-1h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  </span>
);
const StatIcon1 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="15" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 16v-1.5A2.5 2.5 0 0 1 5.5 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17 16v-1.5A2.5 2.5 0 0 0 14.5 12h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 16v-1a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 10h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.5 1.5" /></svg>
  </span>
);
const StatIcon2 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 10.5v7M7.5 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  </span>
);
const StatIcon3 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.5l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);

/* ─── HERO ──────────────────── */
function Hero() {
  const heroStats = [
    { val: '1.01 Cr', label: 'Total Teachers', sub: 'Across all school types' },
    { val: '24.4:1', label: 'National PTR', sub: 'Student-to-teacher ratio' },
    { val: '54.2%', label: 'Female Teachers', sub: 'Gender share of workforce' },
    { val: '77.6%', label: 'Schools Within PTR 30', sub: 'Meeting the PTR threshold' },
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
        background: 'radial-gradient(ellipse 60% 80% at 5% 55%, rgba(13,148,136,0.13) 0%, transparent 65%)'
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '48%', height: '100%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 80% 50%, rgba(13,148,136,0.07) 0%, transparent 70%)'
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 48,
        position: 'relative', zIndex: 1
      }}>
        <div style={{ flex: '0 0 auto', maxWidth: 480 }}>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(30px,3.6vw,52px)', fontWeight: 900,
            lineHeight: 1.06, letterSpacing: '-0.025em',
            color: 'var(--paper)', marginBottom: 16
          }}>
            The Teachers Behind<br />
            <span style={{ color: '#5eead4' }}>India's Classrooms</span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.72, color: 'rgba(250,246,239,0.45)', maxWidth: 420 }}>
            A national view of teacher deployment, student-teacher ratios, inclusive education preparedness, and workforce pressures across India's school system.
          </p>
        </div>
        <div style={{ flex: '0 0 auto', width: 'min(560px, 48%)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginLeft: 'auto', alignSelf: 'stretch' }}>
          {heroStats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.035)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: `2px solid rgba(13,148,136,0.35)`,
              borderRadius: 20,
              padding: '28px 28px 24px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)'
              }} />
              <div style={{ marginBottom: 14, lineHeight: 1 }}>
                {[<StatIcon0 color="#5eead4" />, <StatIcon1 color="#5eead4" />, <StatIcon2 color="#5eead4" />, <StatIcon3 color="#5eead4" />][i]}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(24px,2.4vw,34px)',
                fontWeight: 800, lineHeight: 1, color: '#5eead4', marginBottom: 6
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
   TEACHER LANDING
══════════════════════════════════════════════════════ */
export function TeacherLanding({ onShowDashboard }) {
  useReveal([]);

  /* Teal color for teacher category */
  const CAT = '#0891b2';
  const CAT_LIGHT = '#5eead4';

  return (
    <div className="dashboard">
      <Hero />

      {/* ── 01 · Teacher Analytics ─────────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 01 · Teacher Analytics</div>
        <h2 className="section-headline">1.01 Cr teachers, 54.2% female, 77.6% of schools within PTR 30</h2>
        <p className="section-sub">
          India’s school system has 1.01 crore teachers. Teacher deployment is concentrated in Secondary schools, which account for 48.0% of all teachers and 53.0% of all students. Across school categories, PTR rises from 20.2 in Foundational and Preparatory schools to 26.9 in Secondary schools.
        </p>
        <div className="two-col">
          <div>
            <div className="funnel-wrap">
              {[
                { lbl: 'All Schools', inner: '1.01 Cr teachers', pct: 100, color: CAT },
                { lbl: 'Secondary School', inner: '48.6 L teachers', pct: 48, color: `rgba(13,148,136,0.80)` },
                { lbl: 'Middle School', inner: '28.9 L teachers', pct: 29, color: 'var(--gold)' },
                { lbl: 'Foundational + Preparatory', inner: '23.7 L teachers', pct: 23, color: 'var(--accent)' },
              ].map(row => (
                <div key={row.lbl} className="funnel-row">
                  <div className="funnel-lbl">{row.lbl}</div>
                  <div className="funnel-track">
                    <div className="funnel-bar" data-bar-w={row.pct} style={{ background: row.color, width: 0 }}>
                      <span className="funnel-bar-txt">{row.inner}</span>
                    </div>
                  </div>
                  <div className="funnel-val">{row.inner.split(' ')[0]}</div>
                </div>
              ))}
            </div>
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"Secondary schools account for 48.0% of teachers and 53.0% of students, and record the highest category-level PTR at 26.9."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('teacher-main')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>54.2%</div>
              <div className="stat-card-label">Female Teachers Nationally</div>
              <div className="stat-card-note">
                Women account for 54.2% of India’s teaching workforce nationally. Their share is 56.1% in Secondary schools, 53.3% in Middle schools, and 51.2% in Foundational and Preparatory schools. By location, the female share is 69.9% in urban schools and 46.9% in rural schools.
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>26.9:1</div>
              <div className="stat-card-label">PTR in Secondary Schools</div>
              <div className="stat-card-note">Secondary schools record the highest category-level PTR nationally. Foundational and Preparatory schools stand at 20.2:1, Middle schools at 23.6:1, and Secondary schools at 26.9:1.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · PTR Analytics ──────────────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 02 · PTR Analytics</div>
        <h2 className="section-headline">22.2% of schools remain above PTR 30</h2>
        <p className="section-sub">
          Nationally, 3.26 lakh schools remain above PTR 30, while 1.67 lakh schools are above PTR 40. PTR pressure is not uniform across the system: Government-aided schools record the highest average PTR at 32.7, above the national average of 24.4.
        </p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { rank: '01', name: 'Govt. Aided', val: '32.7:1', pct: 100 },
                { rank: '02', name: 'Central Government', val: '25.0:1', pct: 76 },
                { rank: '03', name: 'National Average', val: '24.4:1', pct: 75 },
                { rank: '04', name: 'Private Unaided', val: '24.2:1', pct: 74 },
                { rank: '05', name: 'State Government', val: '23.6:1', pct: 72 },
                { rank: '06', name: 'Others', val: '18.7:1', pct: 57 },
              ].map(r => (
                <div key={r.rank} className="state-row">
                  <div className="state-rank">{r.rank}</div>
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0 }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"A total of 3,26,012 schools remain above PTR 30, and 1,66,504 schools are above PTR 40."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('ptr')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>22.2%</div>
              <div className="stat-card-label">Schools Above PTR 30</div>
              <div className="stat-card-note">Of all schools nationally, 22.2% remain above PTR 30, while 77.6% are within the norm. Schools above PTR 40 account for 11.3% of the national total.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>12.86 L</div>
              <div className="stat-card-label">Teachers Required for PTR 30</div>
              <div className="stat-card-note">Bringing all schools within PTR 30 would require 12.86 lakh additional teachers. At the same time, 31.77 lakh teachers are recorded as excess against PTR 30 across other schools, indicating substantial variation in deployment across the system.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · CWSN Teacher Analytics ─────────────── */}
      <section className="section">
        <div className="section-label" style={{ color: CAT }}>Section 03 · CWSN Teacher Analytics</div>
        <h2 className="section-headline">The special educators who are missing</h2>
        <p className="section-sub">Children with special needs are enrolled in schools across the country — but most of their teachers have never received any training in inclusive education. Only 1 in 6 teachers serving these children has formal CWSN training, leaving most to improvise.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'Teachers in CWSN Schools', val: '100%', pct: 100 },
                { name: 'Any CWSN Training', val: '18%', pct: 18 },
                { name: 'Recent CWSN Training (≤3 yrs)', val: '9%', pct: 9 },
                { name: 'Teachers with Own Disability', val: '2%', pct: 2 },
              ].map(r => (
                <div key={r.name} className="state-row">
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0 }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            {/* Breakdown by disability type */}
            <div style={{ marginTop: 28, marginBottom: 4 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>CWSN TEACHER TRAINING GAP BY STATE</div>
              <div className="states-list">
                {[
                  { rank: '01', name: 'Kerala', val: '61%', pct: 100 },
                  { rank: '02', name: 'Tamil Nadu', val: '48%', pct: 79 },
                  { rank: '03', name: 'Karnataka', val: '34%', pct: 56 },
                  { rank: '04', name: 'National Avg', val: '18%', pct: 30 },
                  { rank: '05', name: 'Bihar', val: '6%', pct: 10 },
                  { rank: '06', name: 'UP', val: '4%', pct: 7 },
                ].map(r => (
                  <div key={r.rank} className="state-row">
                    <div className="state-rank">{r.rank}</div>
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: `rgba(13,148,136,0.7)` }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"A child with visual impairment in a rural school has less than a 20% chance of finding a CWSN-trained teacher in their building."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('cwsn-teacher')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: CAT }}>18%</div>
              <div className="stat-card-label">CWSN-Trained Teachers</div>
              <div className="stat-card-note">Only 1 in 6 teachers at schools with CWSN students has any formal training in inclusive education. The rest teach children with disabilities without guidance, adapting on their own with whatever works.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>9%</div>
              <div className="stat-card-label">Recently Trained (≤3 Years)</div>
              <div className="stat-card-note">Even recently trained teachers rarely receive CWSN-specific preparation — suggesting the problem starts in teacher education itself, not just in-service training programs.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · Teacher Retirement ─────────────────── */}
      <section className="section" style={{ borderBottom: 'none' }}>
        <div className="section-label" style={{ color: CAT }}>Section 04 · Teacher Retirement</div>
        <h2 className="section-headline">1.8 lakh teachers retiring in 5 years — who is planning for it?</h2>
        <p className="section-sub">Nearly 1 in 10 teachers in India is within 8 years of retirement — and in government schools, hiring pipelines are often years behind. Without pre-emptive recruitment, whole districts could lose experienced teachers faster than they can be replaced.</p>
        <div className="two-col">
          <div>
            {/* Annual retirement wave */}
            <div className="states-list">
              {[
                { name: 'Retiring in 2025–26', val: '38T', pct: 53 },
                { name: 'Retiring in 2026–27', val: '42T', pct: 58 },
                { name: 'Retiring in 2027–28', val: '58T', pct: 81 },
                { name: 'Retiring in 2028–29', val: '72T', pct: 100 },
                { name: 'Retiring in 2029–30', val: '48T', pct: 67 },
              ].map(r => (
                <div key={r.name} className="state-row">
                  <div className="state-name">{r.name}</div>
                  <div className="state-track">
                    <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: 'var(--accent)' }} />
                  </div>
                  <div className="state-val">{r.val}</div>
                </div>
              ))}
            </div>

            {/* By appointment type */}
            <div style={{ marginTop: 28, marginBottom: 4 }}>
              <div className="section-label" style={{ color: CAT, fontSize: 9, marginBottom: 12 }}>RETIRING TEACHERS BY APPOINTMENT TYPE</div>
              <div className="states-list">
                {[
                  { name: 'Regular / Permanent', val: '68%', pct: 100 },
                  { name: 'Contractual', val: '22%', pct: 32 },
                  { name: 'Part-Time / Guest', val: '10%', pct: 15 },
                ].map(r => (
                  <div key={r.name} className="state-row">
                    <div className="state-name">{r.name}</div>
                    <div className="state-track">
                      <div className="state-bar" data-bar-w={r.pct} style={{ width: 0, background: `rgba(232,164,74,0.8)` }} />
                    </div>
                    <div className="state-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"The retirement wave peaks in 2027–28. Without proactive pipelines, vacancies will compound in 22 states already below PTR norms."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20, background: CAT }} onClick={() => onShowDashboard('retirement')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>1.8 L</div>
              <div className="stat-card-label">Teachers Retiring by 2030</div>
              <div className="stat-card-note">
                Nearly 9% of India's teachers are 57 or older and approaching retirement — and in secondary schools and government management types, the concentration is even higher.
                Secondary and Higher Secondary levels lose 64% of this pipeline — where
                subject teachers are already the scarcest and hardest to replace.
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>72T</div>
              <div className="stat-card-label">Peak Retirement Year — 2028–29</div>
              <div className="stat-card-note">The largest cohort of retiring teachers is concentrated in State Government secondary schools — exactly where replacing an experienced subject-specialist teacher takes the longest.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">Teachers are the<br />system's single point of leverage.</div>
        <div className="footer-right">
          Data Source: UDISE+ teacher base datasets<br />
          Teacher & PTR Analytics Landing
        </div>
      </footer>
    </div>
  );
}

export default TeacherLanding;