'use client';
import { useEffect, useRef } from 'react';

interface GaugeProps {
  value: number; // 0-100
  label: string;
  sublabel: string;
  displayValue: string;
  unit: string;
}

function Gauge({ value, label, sublabel, displayValue, unit }: GaugeProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  // Only draw 270deg (3/4 circle)
  const dashArray = circumference * 0.75;
  const dashOffset = dashArray - (dashArray * Math.min(value, 100)) / 100;

  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.style.strokeDashoffset = String(dashArray);
    const timer = setTimeout(() => {
      if (circleRef.current) {
        circleRef.current.style.transition = 'stroke-dashoffset 900ms ease-out';
        circleRef.current.style.strokeDashoffset = String(dashOffset);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [dashArray, dashOffset]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <img src="/svgs/chart-pie.svg" alt="" width={16} height={16} style={{ filter: 'invert(1)', opacity: 0.5 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--arctic-powder)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--forsythia)', marginLeft: 'auto' }}>{unit}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(241,246,244,0.4)', marginBottom: '1rem' }}>{sublabel}</p>

      <div style={{ position: 'relative', width: 130, height: 130 }}>
        <svg width={130} height={130} viewBox="0 0 130 130" aria-label={`${label}: ${displayValue}`}>
          {/* Track */}
          <circle
            cx={65} cy={65} r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
            strokeDasharray={`${dashArray} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(135 65 65)"
          />
          {/* Value arc */}
          <circle
            ref={circleRef}
            cx={65} cy={65} r={radius}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth={8}
            strokeDasharray={`${dashArray} ${circumference}`}
            strokeDashoffset={dashArray}
            strokeLinecap="round"
            transform="rotate(135 65 65)"
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFC801" />
              <stop offset="100%" stopColor="#FF9932" />
            </linearGradient>
          </defs>
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--arctic-powder)', lineHeight: 1 }}>
            {displayValue}
          </span>
        </div>
      </div>
    </div>
  );
}

const gauges: GaugeProps[] = [
  { value: 79, label: 'System Load', sublabel: 'Active neural processing', displayValue: '12', unit: '98.7%' },
  { value: 95, label: 'SLA Response', sublabel: 'Global uptime monitoring', displayValue: '264', unit: '99.99%' },
  { value: 68, label: 'Token Usage', sublabel: 'Monthly volume throughput', displayValue: '8.4M', unit: '8.4M' },
];

export default function Performance() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useRef(false);
  const _setVisible = (v: boolean) => { visible.current = v; };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
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
      id="performance"
      ref={sectionRef}
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <p className="section-label">{"//005 Performance"}</p>
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
          }}
        >
          Optimized for<br />performance
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
          Monitor every neural pulse in real time. Nexaro provides deep telemetry into
          agent accuracy, server latency, and token efficiency.
        </p>

        {/* Gauges */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            padding: '2.5rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            marginBottom: '2rem',
          }}
        >
          {gauges.map((g) => (
            <Gauge key={g.label} {...g} />
          ))}
        </div>

        {/* Growth vector chart */}
        <div
          className="reveal reveal-delay-1"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="/svgs/arrow-trending-up.svg" alt="" width={16} height={16} style={{ filter: 'invert(1)', opacity: 0.6 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--arctic-powder)' }}>
                Growth Vector
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--forsythia)' }}>99.98%</span>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(241,246,244,0.35)', marginBottom: '1.5rem' }}>
            Efficiency gains over 30 days
          </p>

          {/* Wave chart */}
          <svg
            width="100%"
            height="80"
            viewBox="0 0 600 80"
            preserveAspectRatio="none"
            aria-label="Growth vector chart showing 99.98% efficiency"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFC801" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFC801" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 C50,55 100,30 150,40 C200,50 250,20 300,25 C350,30 400,10 450,18 C500,26 550,15 600,20"
              fill="none"
              stroke="var(--forsythia)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'drawLine 1.2s ease-out 0.5s forwards' }}
            />
            <path
              d="M0,60 C50,55 100,30 150,40 C200,50 250,20 300,25 C350,30 400,10 450,18 C500,26 550,15 600,20 L600,80 L0,80 Z"
              fill="url(#waveGrad)"
            />
          </svg>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: 'var(--arctic-powder)', lineHeight: 1 }}>82%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(241,246,244,0.35)', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                NET GROWTH
              </div>
            </div>
            <a href="#" id="perf-request-demo-btn" className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem' }}>
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </section>
   );
}
