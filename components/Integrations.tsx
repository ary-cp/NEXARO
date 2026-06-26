'use client';
import { useEffect, useRef } from 'react';

const integrations = [
  { name: 'Slack', cat: 'Comms', accent: '#FFC801' },
  { name: 'GitHub', cat: 'Code', accent: '#FF9932' },
  { name: 'Notion', cat: 'Docs', accent: '#D9E8E2' },
  { name: 'Linear', cat: 'Tasks', accent: '#FFC801' },
  { name: 'Stripe', cat: 'Finance', accent: '#FF9932' },
  { name: 'Salesforce', cat: 'CRM', accent: '#D9E8E2' },
  { name: 'HubSpot', cat: 'Marketing', accent: '#FFC801' },
  { name: 'Snowflake', cat: 'Data', accent: '#FF9932' },
  { name: 'Postgres', cat: 'Database', accent: '#D9E8E2' },
  { name: 'AWS S3', cat: 'Storage', accent: '#FFC801' },
  { name: 'Zapier', cat: 'Automation', accent: '#FF9932' },
  { name: 'Webhooks', cat: 'Custom', accent: '#D9E8E2' },
];

const cardStyle: React.CSSProperties = {
  padding: '1.5rem',
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.75rem',
  position: 'relative',
  overflow: 'hidden',
};

const iconBox: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: 'rgba(255,255,255,0.04)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(255,255,255,0.08)',
};

const pillBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Integrations() {
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
      id="integrations"
      ref={sectionRef}
      aria-labelledby="integrations-heading"
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 4rem' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            <img src="/svgs/link.svg" alt="" width={14} height={14} />
            Integrations
          </div>
          <h2 id="integrations-heading" className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--arctic-powder)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}>
            Nexaro bridges the{' '}
            <span style={{
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>gap</span>
          </h2>
          <p className="reveal reveal-delay-2" style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(241,246,244,0.6)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
          }}>
            Connect every tool in your stack — from data warehouses to messaging — through a single intelligent fabric.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          {integrations.map((it, i) => (
            <article key={it.name} className="glass-card reveal" style={{
              ...cardStyle,
              transitionDelay: `${(i % 4) * 60}ms`,
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: it.accent, opacity: 0.6,
              }} />
              <div style={iconBox}>
                <img src="/svgs/link-solid.svg" alt="" width={16} height={16} style={{ filter: 'invert(1)', opacity: 0.6 }} />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--arctic-powder)',
                  letterSpacing: '-0.02em',
                }}>{it.name}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'rgba(241,246,244,0.45)',
                  marginTop: '0.15rem',
                }}>{it.cat}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal" style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <button aria-label="Previous page" style={pillBtn}>
            <img src="/svgs/chevron-left.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.7 }} />
          </button>
          <span style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(241,246,244,0.5)',
            fontSize: '0.9rem',
          }}>150+ pre-built connectors and counting.</span>
          <a href="#pricing" className="btn-outline">
            Explore Marketplace
            <img src="/svgs/chevron-right.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.7 }} />
          </a>
          <button aria-label="Scroll up" onClick={() => window.scrollBy({ top: -400, behavior: 'smooth' })} style={pillBtn}>
            <img src="/svgs/chevron-up.svg" alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.7 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
