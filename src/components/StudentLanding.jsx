import { useEffect } from 'react';
import './StudentDashboard.css';

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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L1 7.5L10 12L19 7.5L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M5 10v4c0 1.1 2.24 2 5 2s5-.9 5-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M19 7.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  </span>
);
const StatIcon1 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 18V8l8-5 8 5v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="7" y="12" width="3" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" /><rect x="12" y="10" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  </span>
);
const StatIcon2 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 14c0-2.21 1.79-4 4-4s4 1.79 4 4v3H6v-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 17l-1 1.5M12 17l1 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  </span>
);
const StatIcon3 = ({ color }) => (
  <span style={{ display: 'inline-flex', color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 7l4 6H3l-2-3 2-3ZM17 7l-4 6h4l2-3-2-3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M3 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  </span>
);

/* ─── HERO ────────────────────────────────────────── */
function Hero({ onShowDashboard }) {
  const ACCENT = '#93c5fd';
  const ACCENT_DIM = 'rgba(37,99,235,0.18)';
  const ACCENT_BORDER = 'rgba(37,99,235,0.35)';
  const heroStats = [
    { val: '24.69 Cr', label: 'Total Enrolled', icon: '🎓', sub: 'Across all school levels' },
    { val: '14.71 L', label: 'Schools', icon: '🏫', sub: 'Govt, aided & private' },
    { val: '11.93 Cr', label: 'Girls Enrolled', icon: '👧', sub: '48.3% of total enrollment' },
    { val: '0.94', label: 'GPI', icon: '⚖️', sub: 'Gender Parity Index' },
  ];
  return (
    <div style={{
      background: 'var(--ink)',
      padding: '72px var(--px) 72px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 5% 55%, rgba(37,99,235,0.13) 0%, transparent 65%)',
      }} />
      {/* Right-side ambient glow behind cards */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '48%', height: '100%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 80% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: 48,
        justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
      }}>
        {/* ── LEFT: text ── */}
        <div style={{ flex: '0 0 auto', maxWidth: 480 }}>
          <span style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 20,
            background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`,
            color: ACCENT, fontSize: 9, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20,
          }}>
            📊 Student Centric Analytics
          </span>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(30px,3.6vw,52px)', fontWeight: 900,
            lineHeight: 1.06, letterSpacing: '-0.025em',
            color: 'var(--paper)', marginBottom: 16,
          }}>
            Understanding India's<br />
            <span style={{ color: ACCENT }}>25 Crore Students</span>
          </h1>
          <p style={{
            fontSize: 14, lineHeight: 1.72,
            color: 'rgba(250,246,239,0.45)', maxWidth: 420,
          }}>
            Deep-dive into student distribution across school categories, social groups,
            migration records, language of instruction, dropout rates, and transition patterns.
          </p>
        </div>

        {/* ── RIGHT: 2×2 glassmorphic stat cards ── */}
        <div style={{
          flex: '0 0 auto',
          width: 'min(560px, 48%)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          marginLeft: 'auto',
          alignSelf: 'stretch',
        }}>
          {heroStats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.035)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: `2px solid ${ACCENT_BORDER}`,
              borderRadius: 20,
              padding: '28px 28px 24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.2s, transform 0.2s',
            }}>
              {/* Inner shimmer */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
              }} />
              <div style={{ marginBottom: 14, lineHeight: 1 }}>
                {[<StatIcon0 color={ACCENT} />, <StatIcon1 color={ACCENT} />, <StatIcon2 color={ACCENT} />, <StatIcon3 color={ACCENT} />][i]}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(24px,2.4vw,34px)',
                fontWeight: 800, lineHeight: 1,
                color: ACCENT, marginBottom: 8,
              }}>{s.val}</div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
                marginBottom: 4,
              }}>{s.label}</div>
              <div style={{
                fontSize: 12, color: 'rgba(255,255,255,0.32)', lineHeight: 1.5,
              }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   STUDENT LANDING
══════════════════════════════════════════════════════ */
export function StudentLanding({ onShowDashboard }) {
  useReveal([]);

  return (
    <div className="dashboard">
      <Hero onShowDashboard={onShowDashboard} />

      {/* ── 01 · Student Analytics ─────────────────── */}
      <section className="section">
        <div className="section-label">Section 01 · Student Analytics</div>
        <h2 className="section-headline">How are students distributed across school categories?</h2>
        <p className="section-sub">In 2024-25, India records 24.69 crore students across 14.71 lakh schools. Of all enrolled students, 52.9% are in Secondary schools, 27.6% in Middle schools, and 19.4% in Foundational + Preparatory schools.</p>
        <div className="two-col">
          <div>
            <div className="funnel-wrap">
              {[
                { lbl: 'All Students', inner: '24.69 Cr', pct: 100, color: 'var(--teal)' },
                { lbl: 'Secondary School', inner: '13.08 Cr', pct: 53, color: 'rgba(42,124,124,0.82)' },
                { lbl: 'Middle School', inner: '6.82 Cr', pct: 28, color: 'var(--gold)' },
                { lbl: 'Foundational + Preparatory', inner: '4.79 Cr', pct: 19, color: 'var(--accent)' },
              ].map(row => (
                <div key={row.lbl} className="funnel-row">
                  <div className="funnel-lbl">{row.lbl}</div>
                  <div className="funnel-track">
                    <div className="funnel-bar" data-bar-w={row.pct} style={{ background: row.color, width: 0 }}>
                      <span className="funnel-bar-txt">{row.inner}</span>
                    </div>
                  </div>
                  <div className="funnel-val">{row.inner}</div>
                </div>
              ))}
            </div>
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"More than half of all enrolled students are in Secondary schools, while nearly half of all schools are Foundational + Preparatory."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('student-main')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>74.3%</div>
              <div className="stat-card-label">Public-Supported School Share</div>
              <div className="stat-card-note">State government, central government, and govt.-aided schools together make up 74.3% of all schools, while accounting for 59.3% of enrolled students.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>52.9%</div>
              <div className="stat-card-label">Students in Secondary Schools</div>
              <div className="stat-card-note">Secondary schools account for the largest student concentration nationally. Middle schools account for 27.6%, and Foundational + Preparatory schools for 19.4%.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · Socioeconomic Analytics ───────────── */}
      <section className="section">
        <div className="section-label">Section 02 · Socioeconomic Analytics</div>
        <h2 className="section-headline">How is enrollment distributed across social groups?</h2>
        <p className="section-sub">In the uploaded 2024-25 socioeconomic file, OBC students account for 45.2% of enrollment, General 27.1%, SC 17.8%, and ST 9.9%. The same uploaded dropout file shows that secondary-stage dropout is highest among ST students.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'OBC', val: '45.2%', pct: 100 },
                { name: 'General', val: '27.1%', pct: 60 },
                { name: 'Scheduled Caste', val: '17.8%', pct: 39 },
                { name: 'Scheduled Tribe', val: '9.9%', pct: 22 },
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
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"Among the four reported social groups, ST students record the highest secondary dropout rate in 2024-25 at 14.9%."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('socio')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>27.7%</div>
              <div className="stat-card-label">SC + ST Share of Enrollment</div>
              <div className="stat-card-note">SC students account for 17.8% of enrollment and ST students for 9.9%, taking the combined SC + ST share to 27.7% in the uploaded 2024-25 file.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>45.2%</div>
              <div className="stat-card-label">OBC Enrollment Share</div>
              <div className="stat-card-note">OBC students form the largest reported social-group category in enrollment nationally, at 45.2% of all students in the uploaded socioeconomic base.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · Migration Analytics ────────────────── */}
      <section className="section">
        <div className="section-label">Section 03 · Migration Analytics</div>
        <h2 className="section-headline">Most recorded student movement is local and within the same district</h2>
        <p className="section-sub">The uploaded migration file records 5.88 crore student movements for AY 2022-23 to 2023-24. Most are intra-district, and the largest recorded pathways are moves into or within the Secondary school category.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { rank: '01', name: 'Secondary → Secondary', val: '2.01 Cr', pct: 100 },
                { rank: '02', name: 'Middle → Secondary', val: '1.57 Cr', pct: 78 },
                { rank: '03', name: 'F+P → Secondary', val: '89.4 L', pct: 44 },
                { rank: '04', name: 'F+P → Middle', val: '72.3 L', pct: 36 },
                { rank: '05', name: 'Middle → Middle', val: '28.2 L', pct: 14 },
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
              <p>"Intra-district movement accounts for 86.8% of all recorded student migration entries in the uploaded file."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('migration')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>5.88 Cr</div>
              <div className="stat-card-label">Total Recorded Student Migrations</div>
              <div className="stat-card-note">The uploaded migration base totals 5.88 crore student migration records across school category, location, management, BPL status, and migration type dimensions.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>6.29 L</div>
              <div className="stat-card-label">Migrated CWSN Students</div>
              <div className="stat-card-note">The same file records 6.29 lakh migrated CWSN students, which is about 1.1% of all recorded migration entries.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · Medium of Instruction ──────────────── */}
      <section className="section">
        <div className="section-label">Section 04 · Medium of Instruction</div>
        <h2 className="section-headline">Hindi and English together cover nearly 72% of enrolled students</h2>
        <p className="section-sub">In the uploaded 2024-25 medium-of-instruction file, Hindi accounts for 36.1% of students and English 35.6%. Bengali is the largest other medium at 6.8%, followed by Marathi at 5.1% and Gujarati at 3.7%.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'Hindi', val: '36.1%', pct: 100 },
                { name: 'English', val: '35.6%', pct: 99 },
                { name: 'Bengali', val: '6.8%', pct: 19 },
                { name: 'Marathi', val: '5.1%', pct: 14 },
                { name: 'Gujarati', val: '3.7%', pct: 10 },
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
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"The uploaded file reports 31 languages of instruction, but Hindi and English alone account for 71.8% of all enrolled students."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('medium')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>31</div>
              <div className="stat-card-label">Languages of Instruction</div>
              <div className="stat-card-note">The uploaded 2024-25 medium-of-instruction dataset contains 31 reported languages, showing the scale of linguistic diversity in school education.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>71.8%</div>
              <div className="stat-card-label">Hindi + English Share</div>
              <div className="stat-card-note">Together, Hindi and English account for nearly three-fourths of all enrolled students in the uploaded medium-of-instruction file.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · Dropout Rate ───────────────────────── */}
      <section className="section">
        <div className="section-label">Section 05 · Dropout Rate</div>
        <h2 className="section-headline">Secondary dropout is the highest reported stage-level rate</h2>
        <p className="section-sub">The uploaded dropout sheet reports stage-wise dropout percentages for Boys, Girls, and Total. In 2024-25, total dropout is 2.3% at Preparatory, 3.5% at Middle, and 8.6% at Secondary.</p>
        <div className="two-col">
          <div>
            <div className="funnel-wrap">
              {[
                { lbl: 'Preparatory (Total)', inner: '2.3%', pct: 23, color: 'var(--teal)' },
                { lbl: 'Middle (Total)', inner: '3.5%', pct: 35, color: 'rgba(42,124,124,0.82)' },
                { lbl: 'Secondary (Total)', inner: '8.6%', pct: 86, color: 'var(--accent)' },
              ].map(row => (
                <div key={row.lbl} className="funnel-row">
                  <div className="funnel-lbl">{row.lbl}</div>
                  <div className="funnel-track">
                    <div className="funnel-bar" data-bar-w={row.pct} style={{ background: row.color, width: 0 }}>
                      <span className="funnel-bar-txt">{row.inner}</span>
                    </div>
                  </div>
                  <div className="funnel-val">{row.inner}</div>
                </div>
              ))}
            </div>
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"The uploaded 2024-25 sheet shows the highest dropout rate at the Secondary stage, well above the Preparatory and Middle stages."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('dropout')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>8.6%</div>
              <div className="stat-card-label">Secondary Dropout Rate</div>
              <div className="stat-card-note">In the uploaded 2024-25 dropout sheet, the total dropout rate at the Secondary stage is 8.6%, higher than both Preparatory and Middle.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>3.3 pp</div>
              <div className="stat-card-label">Secondary Gender Gap</div>
              <div className="stat-card-note">At Secondary level in 2024-25, dropout is 10.2% for boys and 6.9% for girls, creating a 3.3 percentage-point gap.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 · Transition Rate ────────────────────── */}
      <section className="section">
        <div className="section-label">Section 06 · Transition Rate</div>
        <h2 className="section-headline">Three reported stage transitions show one clear weak point</h2>
        <p className="section-sub">The uploaded transition sheet reports stage-to-stage progression for Foundational to Preparatory, Preparatory to Middle, and Middle to Secondary. In 2024-25, the Middle to Secondary transition is the weakest of the three.</p>
        <div className="two-col">
          <div>
            <div className="funnel-wrap">
              {[
                { lbl: 'Foundational → Preparatory', inner: '98.6%', pct: 99, color: 'var(--teal)' },
                { lbl: 'Preparatory → Middle', inner: '92.2%', pct: 92, color: 'var(--gold)' },
                { lbl: 'Middle → Secondary', inner: '86.6%', pct: 87, color: 'var(--accent)' },
              ].map(row => (
                <div key={row.lbl} className="funnel-row">
                  <div className="funnel-lbl">{row.lbl}</div>
                  <div className="funnel-track">
                    <div className="funnel-bar" data-bar-w={row.pct} style={{ background: row.color, width: 0 }}>
                      <span className="funnel-bar-txt">{row.inner}</span>
                    </div>
                  </div>
                  <div className="funnel-val">{row.inner}</div>
                </div>
              ))}
            </div>
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"Among the three reported transition gates in 2024-25, Middle to Secondary remains the weakest nationally."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('transition')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>86.6%</div>
              <div className="stat-card-label">Middle → Secondary Transition</div>
              <div className="stat-card-note">This is the lowest of the three reported stage transitions in the uploaded 2024-25 sheet.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>98.6%</div>
              <div className="stat-card-label">Foundational → Preparatory</div>
              <div className="stat-card-note">This is the strongest reported transition in the uploaded 2024-25 transition sheet, ahead of both Preparatory → Middle and Middle → Secondary.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 · CWSN Students ──────────────────────── */}
      <section className="section">
        <div className="section-label">Section 07 · CWSN Students</div>
        <h2 className="section-headline">Included in name — often excluded in practice</h2>
        <p className="section-sub">Over 22 lakh children with special needs are enrolled in Indian schools — but being on the register and being truly included in learning are two very different things.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'Intellectual Disability', val: '31%', pct: 100 },
                { name: 'Hearing Impairment', val: '22%', pct: 71 },
                { name: 'Visual Impairment', val: '18%', pct: 58 },
                { name: 'Physical Disability', val: '15%', pct: 48 },
                { name: 'Multiple Disabilities', val: '14%', pct: 45 },
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
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"Only 1 in 18 CWSN students has access to a trained special educator — the gap is widest in rural aspirational districts."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('cwsn-student')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>22.6 L</div>
              <div className="stat-card-label">CWSN Students Enrolled</div>
              <div className="stat-card-note">Over 22 lakh children with disabilities attend school nationally — but girls with special needs face compounded barriers that make their continued enrollment far less certain.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>42%</div>
              <div className="stat-card-label">Female CWSN Students</div>
              <div className="stat-card-note">Only 42% of enrolled children with special needs are girls — reflecting how gender and disability together create some of the steepest barriers to staying in school.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 · National Analytics ─────────────────── */}
      <section className="section">
        <div className="section-label">Section 08 · National Analytics</div>
        <h2 className="section-headline">Public systems and rural schools anchor national enrollment</h2>
        <p className="section-sub">In 2024-25, State Government schools account for 48.5% of all students, Private Unaided schools for 38.8%, and Govt. Aided schools for 10.0%. Rural areas account for 66.2% of enrolled students and 82.2% of schools.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { rank: '01', name: 'State Government', val: '11.98 Cr', pct: 100 },
                { rank: '02', name: 'Private Unaided', val: '9.58 Cr', pct: 80 },
                { rank: '03', name: 'Govt. Aided', val: '2.48 Cr', pct: 21 },
                { rank: '04', name: 'Others', val: '47.2 L', pct: 4 },
                { rank: '05', name: 'Central Government', val: '17.6 L', pct: 1 },
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
              <p>"State Government and Private Unaided schools together account for 87.3% of all enrolled students in the uploaded 2024-25 overall file."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('national')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>66.2%</div>
              <div className="stat-card-label">Rural Student Share</div>
              <div className="stat-card-note">Rural schools account for two-thirds of all enrolled students in the uploaded overall file, confirming that the national student base remains predominantly rural.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>82.2%</div>
              <div className="stat-card-label">Rural School Share</div>
              <div className="stat-card-note">More than four-fifths of all schools in the uploaded overall base are rural, showing how school infrastructure remains geographically dispersed across the country.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 · Vocational Analytics ───────────────── */}
      <section className="section">
        <div className="section-label">Section 09 · Vocational Analytics</div>
        <h2 className="section-headline">Skill education at school — who is enrolling, and in what?</h2>
        <p className="section-sub">Vocational education is meant to give students pathways into employment directly from school — but fewer than 1% of students are enrolled in such programs, far short of the national target. Girls and rural students are the least likely to have access to skill-based courses.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'IT & ITeS', val: '28%', pct: 100 },
                { name: 'Healthcare', val: '18%', pct: 64 },
                { name: 'Agriculture', val: '14%', pct: 50 },
                { name: 'Retail', val: '12%', pct: 43 },
                { name: 'Beauty & Wellness', val: '11%', pct: 39 },
                { name: 'Other Sectors', val: '17%', pct: 61 },
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
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"Beauty & Wellness is 91% female; Agriculture and Construction are near-entirely male — sector choice mirrors structural gender norms."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('vocational')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>14 L</div>
              <div className="stat-card-label">Vocational Students Enrolled</div>
              <div className="stat-card-note">IT and ITeS is the most popular vocational stream — but for most students who complete a vocational course, the gap between what they learned in school and what employers need is still very wide.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--gold)' }}>48%</div>
              <div className="stat-card-label">Female Vocational Enrollment</div>
              <div className="stat-card-note">Girls and boys enroll in vocational courses in roughly equal numbers overall — but the streams they choose are deeply gendered. Beauty and Wellness is almost entirely female; Electronics and Hardware is almost entirely male.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 · Stream Analytics ───────────────────── */}
      <section className="section" style={{ borderBottom: 'none' }}>
        <div className="section-label">Section 10 · Stream Analytics</div>
        <h2 className="section-headline">Science and Humanities dominate higher-secondary stream choice</h2>
        <p className="section-sub">Using the uploaded 2024-25 stream file aggregated from boys and girls counts, Science accounts for 44.0% of stream enrollment, Humanities 41.4%, and Commerce 14.5%.</p>
        <div className="two-col">
          <div>
            <div className="states-list">
              {[
                { name: 'Science', val: '44.0%', pct: 100 },
                { name: 'Humanities', val: '41.4%', pct: 94 },
                { name: 'Commerce', val: '14.5%', pct: 33 },
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
            <div className="pull-quote" style={{ marginTop: 32 }}>
              <p>"In the uploaded 2024-25 stream data, Science and Humanities together account for 85.4% of higher-secondary stream enrollment."</p>
            </div>
            <button className="lp-sec-cta" style={{ marginTop: 20 }} onClick={() => onShowDashboard('stream')}>
              Open Dashboard <span>→</span>
            </button>
          </div>
          <div>
            <div className="stat-card" style={{ marginBottom: 14 }}>
              <div className="stat-card-num" style={{ color: 'var(--teal)' }}>44.0%</div>
              <div className="stat-card-label">Science Stream Share</div>
              <div className="stat-card-note">Science is the largest single stream in the uploaded 2024-25 stream file, ahead of Humanities and well above Commerce.</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num" style={{ color: 'var(--accent)' }}>55.4%</div>
              <div className="stat-card-label">Girls Within Humanities</div>
              <div className="stat-card-note">Within Humanities, girls account for 55.4% of enrolled students in the uploaded stream base, making it the only stream where girls outnumber boys.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">India's students deserve<br />better than averages.</div>
        <div className="footer-right">
          Data Source: Uploaded UDISE+ base files<br />
          Overall / Socio / MOI / Stream / Dropout / Transition: 2024-25<br />
          Migration: AY 2022-23 to 2023-24
        </div>
      </footer>
    </div>
  );
}

/* ── Re-exports ── */
export { TeacherLanding } from './TeacherLanding';
export { SchoolLanding } from './SchoolLanding';
export { CompareLanding } from './CompareLanding';

export default StudentLanding;