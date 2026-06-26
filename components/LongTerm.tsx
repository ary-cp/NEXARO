'use client';
import { useEffect, useRef } from 'react';

const pillars = [
  {
    icon: '/svgs/cube-16-solid.svg',
    title: 'Prime Logic',
    desc: 'We practice high-fidelity model alignment to ensure your agents deliver consistent results.',
  },
  {
    icon: '/svgs/chart-pie.svg',
    title: 'Total Clarity',
    desc: 'Gain full observability into how your data is processed, indexed, and retrieved by your AI.',
  },
  {
    icon: '/svgs/arrow-path.svg',
    title: 'Fast Cycles',
    desc: 'Transition from prototype to production in weeks, not months, with our pre-built frameworks.',
  },
];

const codeLines = [
  { p: 'const', s: ' agent', o: ' = await ', f: 'Nexaro' , end: '.deploy({' },
  { p: '  model', s: ':', o: ' ', f: '"claude-3-opus"', end: ',' },
  { p: '  tools', s: ':', o: ' [', f: '"search"', end: ', "sql"],' },
  { p: '  memory', s: ':', o: ' ', f: '"persistent"', end: ',' },
  { p: '  region', s: ':', o: ' ', f: '"eu-west-1"', end: ',' },
  { p: '})', s: '', o: '', f: '', end: '' },
  { p: '', s: '', o: '', f: '', end: '' },
  { p: '// ✓ deployed in 12ms', s: '', o: '', f: '', end: '' },
];

export default function LongTerm() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.reveal').forEach((r) => r.classList.add('visible'));
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="long-term"
      ref={sectionRef}
      style={{
        background: 'var(--arctic-powder)',
        color: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
      }}
      aria-labelledby="long-term-heading"
    >
      <div
        className="section-container long-term-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* Left: code-editor mockup with neural diagram */}
        <div
          className="reveal"
          style={{
            position: 'relative',
            aspectRatio: '4 / 5',
            borderRadius: '14px',
            overflow: 'hidden',
            background:
              'linear-gradient(180deg, var(--oceanic-noir) 0%, var(--nocturnal) 100%)',
            border: '1px solid rgba(17,76,90,0.2)',
            boxShadow: '0 24px 48px rgba(17,76,90,0.15)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* window chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.5rem 0.25rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(241,246,244,0.5)',
                letterSpacing: '0.05em',
              }}
            >
              agent.ts — nexaro
            </span>
          </div>

          {/* code block */}
          <div
            style={{
              background: 'rgba(0,0,0,0.35)',
              borderRadius: 8,
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              lineHeight: 1.7,
              color: 'rgba(241,246,244,0.85)',
              border: '1px solid rgba(255,255,255,0.06)',
              minHeight: 220,
            }}
          >
            {codeLines.map((ln, i) => (
              <div key={i} style={{ display: 'flex' }}>
                <span style={{ display: 'inline-block', width: 22, color: 'rgba(241,246,244,0.25)', userSelect: 'none' }}>
                  {ln.p || ln.s || ln.o || ln.f || ln.end ? String(i + 1).padStart(2, '0') : ''}
                </span>
                <span>
                  {ln.p.startsWith('//') ? (
                    <span style={{ color: 'rgba(255,200,1,0.7)' }}>{ln.p}</span>
                  ) : (
                    <>
                      <span style={{ color: '#FFC801' }}>{ln.p}</span>
                      <span style={{ color: 'rgba(241,246,244,0.6)' }}>{ln.s}</span>
                      <span style={{ color: 'rgba(241,246,244,0.85)' }}>{ln.o}</span>
                      <span style={{ color: '#A7F0BA' }}>{ln.f}</span>
                      <span style={{ color: 'rgba(241,246,244,0.85)' }}>{ln.end}</span>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* neural graph */}
          <svg
            viewBox="0 0 320 140"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ flex: 1, minHeight: 0 }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ltEdgeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFC801" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#FFC801" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FFC801" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Layers: 3 input, 4 hidden, 2 output */}
            {[40, 70, 100].map((y, i) => (
              <circle key={`i-${i}`} cx={30} cy={y} r={5}
                fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            ))}
            {[25, 55, 85, 115].map((y, i) => (
              <circle key={`h-${i}`} cx={160} cy={y} r={6}
                fill={i === 1 ? '#FFC801' : 'rgba(255,255,255,0.15)'}
                stroke="rgba(255,200,1,0.6)" strokeWidth="0.5" />
            ))}
            {[55, 85].map((y, i) => (
              <circle key={`o-${i}`} cx={290} cy={y} r={5}
                fill="rgba(255,200,1,0.5)" stroke="rgba(255,200,1,0.8)" strokeWidth="0.6" />
            ))}
            {/* edges */}
            {[40, 70, 100].flatMap((y1, i) =>
              [25, 55, 85, 115].map((y2, j) => (
                <line
                  key={`e1-${i}-${j}`}
                  x1={35} y1={y1} x2={155} y2={y2}
                  stroke="url(#ltEdgeGrad)"
                  strokeWidth="0.6"
                  opacity={0.6}
                />
              ))
            )}
            {[25, 55, 85, 115].flatMap((y1, i) =>
              [55, 85].map((y2, j) => (
                <line
                  key={`e2-${i}-${j}`}
                  x1={165} y1={y1} x2={285} y2={y2}
                  stroke="url(#ltEdgeGrad)"
                  strokeWidth="0.6"
                  opacity={0.6}
                />
              ))
            )}
            {/* signal pulse */}
            <circle r="2.5" fill="#FFC801">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 30 70 Q 100 40 160 55 Q 220 85 290 70" />
            </circle>
            <circle r="2.5" fill="#FF9932">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 30 100 Q 100 110 160 85 Q 230 60 290 85" />
            </circle>
          </svg>

          {/* code label */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(241,246,244,0.5)',
              padding: '0 0.25rem',
            }}
          >
            <span style={{ letterSpacing: '0.1em' }}>{"//NEXARO-CTRL-001"}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              live
            </span>
          </div>
        </div>

        {/* Right: copy */}
        <div>
          <p className="section-label reveal" style={{ color: 'var(--nocturnal)' }}>
            {"//006 Long-term Vision"}
          </p>
          <h2
            id="long-term-heading"
            className="reveal reveal-delay-1"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--oceanic-noir)',
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            Built for the<br />long term
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(23,43,54,0.7)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 540,
            }}
          >
            We don&apos;t just ship code, we architect neural ecosystems. Our approach combines
            rigorous testing with rapid deployment cycles.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className={`reveal reveal-delay-${(i % 3) + 1}`}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(17,76,90,0.1)',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'var(--nocturnal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <img src={p.icon} alt="" width={18} height={18} style={{ filter: 'invert(1)', opacity: 0.85 }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: 'var(--oceanic-noir)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'rgba(23,43,54,0.65)',
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
