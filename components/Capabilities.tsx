'use client';
import { useEffect, useRef } from 'react';

const cards = [
  {
    title: 'Secure Guard',
    desc: 'We fortify your AI deployments with robust security protocols. Our team ensures every model adheres to strict data-privacy standards.',
    code: 'SEC-01',
  },
  {
    title: 'Agent Build',
    desc: 'Tailored AI agents designed for your specific needs. We develop custom logic and workflows that integrate deeply with your existing tools.',
    code: 'AGT-02',
  },
  {
    title: 'Cloud Scale',
    desc: 'Infrastructure optimization for high-traffic AI apps. We ensure your systems remain fast, responsive, and ready for any level of demand.',
    code: 'CLD-03',
  },
  {
    title: 'Data Mining',
    desc: 'Transform raw information into actionable intelligence. We build the pipelines and vector stores that power your organization&apos;s future.',
    code: 'DAT-04',
  },
];

// Simple inline isometric icon — different per card index
function IsoIcon({ index }: { index: number }) {
  const palette = ['var(--forsythia)', 'var(--deep-saffron)', 'var(--mystic-mint)', 'var(--arctic-powder)'];
  const color = palette[index % palette.length];
  return (
    <svg viewBox="0 0 60 60" width={56} height={56} aria-hidden="true">
      <defs>
        <linearGradient id={`iso-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>
      {/* Isometric cube/stack */}
      {index === 0 && (
        <>
          <polygon points="30,8 50,18 50,40 30,50 10,40 10,18" fill={`url(#iso-grad-${index})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <polygon points="30,8 50,18 30,28 10,18" fill="rgba(255,255,255,0.15)" />
          <line x1="30" y1="28" x2="30" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        </>
      )}
      {index === 1 && (
        <>
          <polygon points="30,10 48,20 48,32 30,42 12,32 12,20" fill={`url(#iso-grad-${index})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <circle cx="30" cy="26" r="4" fill="rgba(255,255,255,0.7)" />
          <line x1="30" y1="30" x2="30" y2="42" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
          <line x1="20" y1="48" x2="30" y2="42" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
          <line x1="40" y1="48" x2="30" y2="42" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
        </>
      )}
      {index === 2 && (
        <>
          <ellipse cx="30" cy="20" rx="18" ry="6" fill={`url(#iso-grad-${index})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <path d="M 12 20 L 12 32 A 18 6 0 0 0 48 32 L 48 20" fill={`url(#iso-grad-${index})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" opacity="0.7" />
          <ellipse cx="30" cy="44" rx="14" ry="4" fill={`url(#iso-grad-${index})`} opacity="0.5" />
        </>
      )}
      {index === 3 && (
        <>
          <polygon points="30,10 50,20 30,30 10,20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <polygon points="30,22 50,32 30,42 10,32" fill={`url(#iso-grad-${index})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <polygon points="30,34 50,44 30,54 10,44" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        </>
      )}
    </svg>
  );
}

export default function Capabilities() {
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
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="dot-grid"
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
      aria-labelledby="capabilities-heading"
    >
      <div className="section-container">
        <p className="section-label reveal">{"//007 Capabilities"}</p>
        <h2
          id="capabilities-heading"
          className="reveal reveal-delay-1"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--arctic-powder)',
            letterSpacing: '-0.03em',
            marginBottom: '3rem',
          }}
        >
          Quantifiable impact across<br />every deployment
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {cards.map((c, i) => (
            <article
              key={c.title}
              className={`reveal reveal-delay-${(i % 3) + 1}`}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '1.75rem',
                transition: 'transform 175ms ease-out, border-color 175ms ease-out, background 175ms ease-out',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,200,1,0.3)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,200,1,0.03)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <IsoIcon index={i} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(241,246,244,0.35)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {`//${c.code}`}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--arctic-powder)',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.5rem',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'rgba(241,246,244,0.55)',
                  lineHeight: 1.65,
                }}
              >
                {c.desc}
              </p>
            </article>
          ))}
        </div>

        <div
          className="reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.5rem 2rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              color: 'var(--arctic-powder)',
              maxWidth: 520,
              lineHeight: 1.55,
            }}
          >
            Quantifiable impact across every deployment. We measure success by the speed and scale of your neural ops.
          </p>
          <a href="#pricing" className="btn-primary">
            <span style={{ fontFamily: 'var(--font-mono)' }}>{'>'}</span>
            View Report
          </a>
        </div>
      </div>
    </section>
  );
}
