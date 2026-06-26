'use client';
import { useEffect, useRef } from 'react';

const stats = [
  {
    value: '12ms',
    label: 'Average latency for real-time inference.',
    description: 'Average Latency',
  },
  {
    value: '10x',
    label: 'Increase in manual task processing speed.',
    description: 'Faster Processing',
  },
  {
    value: '99%',
    label: 'Uptime for critical agent infrastructure.',
    description: 'Uptime SLA',
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
      }}
    >
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: '1rem' }}>
          <p className="section-label">{"//001 Statistics"}</p>
        </div>
        <div
          className="reveal reveal-delay-1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '3.5rem',
            maxWidth: '540px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(241,246,244,0.65)',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}
          >
            Quantifiable impact across every deployment. We measure success by the
            speed and scale of your neural ops.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a href="#performance" className="btn-outline" id="stats-report-btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}>
              <img src="/svgs/arrow-trending-up.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.7 }} />
              View Report
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat, i) => (
            <article
              key={stat.description}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                background: 'var(--oceanic-noir)',
                padding: '2.5rem 2rem',
                position: 'relative',
              }}
            >
              {/* Corner marker */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '16px',
                  height: '16px',
                  borderTop: '2px solid rgba(255,255,255,0.15)',
                  borderRight: '2px solid rgba(255,255,255,0.15)',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  color: 'var(--arctic-powder)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  background: 'var(--gradient-accent)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'rgba(241,246,244,0.5)',
                  lineHeight: 1.6,
                  letterSpacing: '0.02em',
                }}
              >
                {stat.label}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
