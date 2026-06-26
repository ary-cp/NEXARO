'use client';
import { useState, useEffect, useRef } from 'react';

const cases = [
  {
    logo: 'CIGNA',
    year: '//2026',
    title: 'Cigna Smart Health Systems',
    description:
      'Revolutionizing patient care through predictive analytics and seamless AI-driven diagnostic integration tools.',
    color: '#0096D6',
  },
  {
    logo: 'AETNA',
    year: '//2026',
    title: 'Aetna Health Data Ecosystem',
    description:
      'We automated Aetna\'s member data management using secure AI to provide personalized care and clinical insights.',
    color: '#8B0000',
  },
  {
    logo: 'ANTHEM',
    year: '//2026',
    title: 'Anthem Neural Care Network',
    description:
      'We deployed a custom LLM to automate Anthem\'s provider relations, reducing ticket latency by eighty-five percent.',
    color: '#003087',
  },
];

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <p className="section-label">{"//003 Case Studies"}</p>
        </div>
        <h2
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
          Proven neural<br />solutions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {cases.map((c, i) => (
            <article
              key={c.title}
              className={`reveal reveal-delay-${i + 1} case-row`}
              onClick={() => setActiveIndex(i === activeIndex ? -1 : i)}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 80px 1fr 48px',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.75rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                cursor: 'pointer',
                transition: 'background 175ms ease-out',
                background: activeIndex === i ? 'rgba(255,200,1,0.04)' : 'transparent',
                borderLeft: activeIndex === i ? '2px solid var(--forsythia)' : '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (activeIndex !== i) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = activeIndex === i ? 'rgba(255,200,1,0.04)' : 'transparent';
              }}
              id={`case-study-${i}`}
            >
              {/* Logo cell */}
              <div
                className="case-logo"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: activeIndex === i ? 'var(--arctic-powder)' : 'rgba(241,246,244,0.3)',
                  transition: 'color 175ms ease-out',
                  letterSpacing: '0.05em',
                }}
              >
                {c.logo}
              </div>

              {/* Year */}
              <div
                className="case-year"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(241,246,244,0.3)',
                }}
              >
                {c.year}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--arctic-powder)',
                    marginBottom: activeIndex === i ? '0.5rem' : 0,
                    transition: 'margin 300ms ease-in-out',
                  }}
                >
                  {c.title}
                </h3>
                <div
                  style={{
                    maxHeight: activeIndex === i ? '80px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 350ms ease-in-out, opacity 300ms ease-in-out',
                    opacity: activeIndex === i ? 1 : 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'rgba(241,246,244,0.5)',
                      lineHeight: 1.6,
                    }}
                  >
                    {c.description}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  transition: 'transform 175ms ease-out',
                  transform: activeIndex === i ? 'rotate(-45deg)' : 'none',
                }}
              >
                <img
                  src="/svgs/chevron-right.svg"
                  alt=""
                  width={20}
                  height={20}
                  style={{ filter: 'invert(1)', opacity: 0.5 }}
                />
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <a href="#" className="btn-outline" id="case-studies-more-btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}>
            <img src="/svgs/arrow-path.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.7 }} />
                  More Projects
          </a>
        </div>
      </div>
    </section>
  );
}
