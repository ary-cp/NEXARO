'use client';
import { useEffect, useRef } from 'react';

const features = [
  {
    svg: '/svgs/cube-16-solid.svg',
    title: 'Infinite Visual Canvas',
    desc: 'Map out multi-step agent behaviors on a high-precision grid. Drag and drop triggers, logic gates, and actions to craft custom paths.',
  },
  {
    svg: '/svgs/cog-8-tooth.svg',
    title: 'Autonomous Execution',
    desc: 'Run complex decision trees without manual intervention. Our engine handles conditional branching and error recovery automatically.',
  },
  {
    svg: '/svgs/link-solid.svg',
    title: 'End-to-End Encryption',
    desc: 'Every node and data transfer is shielded by industrial-grade security. Maintain total control over your organizational data flow.',
  },
  {
    svg: '/svgs/arrow-path.svg',
    title: 'Production-Ready Stack',
    desc: 'Connect core business platforms and internal services through secure, ready integrations that scale with your volume.',
  },
];

export default function FeatureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <p className="section-label">{"//004 Platform Features"}</p>
        </div>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--arctic-powder)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
            maxWidth: '640px',
          }}
        >
          Build logic at scale
        </h2>
        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(241,246,244,0.55)',
            fontSize: '1rem',
            maxWidth: '520px',
            marginBottom: '3.5rem',
            lineHeight: 1.7,
          }}
        >
          Design, deploy, and manage sophisticated AI workflows through an intuitive
          visual interface. No complex coding—just pure logic.
        </p>

        {/* Dashboard mockup */}
        <div
          className="reveal"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '3rem',
            minHeight: '280px',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="Platform interface preview"
        >
          {/* Dot grid overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {['AI AGENT', 'AI CHART'].map((tab, i) => (
              <span
                key={tab}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.875rem',
                  background: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: i === 0 ? 'var(--arctic-powder)' : 'rgba(241,246,244,0.4)',
                  letterSpacing: '0.08em',
                }}
              >
                {tab}
              </span>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <img src="/svgs/arrow-path.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.4 }} />
              <img src="/svgs/cog-8-tooth.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.4 }} />
            </div>
          </div>

          {/* Node grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '0.4rem',
              maxWidth: '200px',
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '28px',
                  height: '28px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  background: [2, 5, 7, 10].includes(i) ? 'rgba(255,200,1,0.15)' : 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {[2, 5, 7, 10].includes(i) && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--forsythia)' }} />
                )}
              </div>
            ))}
          </div>

          {/* AI prompt bar */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              padding: '0.625rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
              maxWidth: '640px',
            }}
            aria-label="AI prompt interface"
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(241,246,244,0.3)' }}>
              Ask Daemon AI anything...
            </span>
            <img src="/svgs/search.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.3 }} />
          </div>

          {/* 3D sphere accent */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '10%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(17,76,90,0.6) 0%, transparent 70%)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,200,1,0.05) 0%, rgba(17,76,90,0.3) 100%)',
                border: '1px solid rgba(255,200,1,0.15)',
              }}
            />
          </div>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {features.map((f, i) => (
            <article
              key={f.title}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                background: 'var(--oceanic-noir)',
                padding: '2rem',
                transition: 'background 175ms ease-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,200,1,0.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--oceanic-noir)';
              }}
            >
              <img
                src={f.svg}
                alt=""
                width={28}
                height={28}
                style={{ filter: 'invert(1)', opacity: 0.7, marginBottom: '1rem' }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--arctic-powder)',
                  marginBottom: '0.625rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'rgba(241,246,244,0.45)',
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
