'use client';
import dynamic from 'next/dynamic';

const HeroSphere = dynamic(() => import('./HeroSphere'), { ssr: false, loading: () => null });

const brands = [
  'Aetna', 'Cigna', 'Anthem', 'Humana', 'UnitedHealth',
  'BlueCross', 'Molina', 'Centene', 'CVS Health', 'Magellan',
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="dot-grid"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--oceanic-noir)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Background gradient blob */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(17,76,90,0.5) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(255,200,1,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="section-container hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '4rem',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Left: copy */}
        <div style={{ animation: 'fadeUp 480ms ease-out both' }}>
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            Next-Gen AI Platform
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 800,
              color: 'var(--arctic-powder)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
            }}
          >
            Power your<br />
            <span
              style={{
                background: 'var(--gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              future
            </span>{' '}
            with AI
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'rgba(241,246,244,0.65)',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginBottom: '2.5rem',
            }}
          >
            Deploy custom enterprise agents and automate complex workflows.
            Scale your intelligence with Nexaro today.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#pricing" className="btn-primary" id="hero-cta-primary">
              <img src="/svgs/arrow-trending-up.svg" alt="" width={16} height={16} style={{ filter: 'invert(0.1)' }} />
              Build A Workflow
            </a>
            <a href="#features" className="btn-outline" id="hero-cta-secondary">
              See How It Works
            </a>
          </div>

          {/* Integration badges */}
          <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {['GPT-5', 'Claude Opus 4', 'Gemini 3', 'Llama 4'].map((model) => (
              <span
                key={model}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '0.3rem 0.75rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '999px',
                  color: 'rgba(241,246,244,0.6)',
                  letterSpacing: '0.05em',
                }}
              >
                {model}
              </span>
            ))}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(241,246,244,0.4)' }}>
              + more
            </span>
          </div>
        </div>

        {/* Right: 3D sphere */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'scaleIn 500ms ease-out 100ms both',
          }}
          className="hidden md:flex"
          aria-hidden="true"
        >
          <HeroSphere />
        </div>
      </div>

      {/* Logo ticker */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '1.25rem 0',
          overflow: 'hidden',
          position: 'relative',
          marginTop: 'auto',
        }}
        aria-label="Trusted by leading companies"
      >
        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(90deg, var(--oceanic-noir), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(-90deg, var(--oceanic-noir), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div className="ticker-track" aria-hidden="true">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'rgba(241,246,244,0.35)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
