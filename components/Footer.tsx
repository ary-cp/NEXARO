'use client';
import { useState, useEffect } from 'react';

const linkGroups = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Developers',
    links: ['Documentation', 'API Reference', 'SDKs', 'Status', 'GitHub'],
  },
  {
    title: 'Company',
    links: ['About', 'Customers', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Security', 'SOC 2', 'DPA'],
  },
];

export default function Footer() {
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollTopVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer
      style={{
        background: 'var(--oceanic-noir)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" style={{ position: 'absolute', left: '-9999px' }}>
        Footer
      </h2>

      <div className="section-container">
        {/* Newsletter CTA */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: '3rem',
              alignItems: 'center',
            }}
            className="footer-newsletter-grid"
          >
            <div>
              <div className="section-label">{"//010 Newsletter"}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  color: 'var(--arctic-powder)',
                  letterSpacing: '-0.03em',
                  marginBottom: '0.75rem',
                }}
              >
                Ship faster with intelligence
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(241,246,244,0.6)',
                  fontSize: '1rem',
                  maxWidth: 480,
                }}
              >
                Bi-weekly drops on agent design, workflow patterns, and shipped features. No fluff.
              </p>
            </div>

            <form onSubmit={handleSubmit} aria-label="Newsletter signup">
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.4rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.03)',
                  alignItems: 'center',
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--arctic-powder)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    padding: '0.5rem 1rem',
                  }}
                />
                <button type="submit" className="btn-primary" style={{ borderRadius: '999px', clipPath: 'none' }}>
                  {submitted ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'rgba(241,246,244,0.4)',
                  marginTop: '0.75rem',
                }}
              >
                By subscribing, you agree to receive emails from Nexaro. Unsubscribe at any time.
              </div>
            </form>
          </div>
        </div>

        {/* Link grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(4, 1fr)',
            gap: '3rem',
            padding: '4rem 0',
          }}
          className="footer-link-grid"
        >
          <div>
            <a
              href="#hero"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                marginBottom: '1rem',
              }}
            >
              <span aria-hidden="true" style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 100 100" width={26} height={26} xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footBoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#FFC801" />
                    </linearGradient>
                  </defs>
                  <path d="M 60 8 L 20 55 L 45 55 L 38 92 L 80 42 L 55 42 Z" fill="url(#footBoltGrad)" />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'var(--arctic-powder)',
                  letterSpacing: '-0.04em',
                }}
              >
                nexaro
              </span>
            </a>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(241,246,244,0.5)',
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: '1.5rem',
              }}
            >
              The neural operations layer for autonomous enterprises. Built for builders shipping at the frontier.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['X', 'GH', 'in', 'YT'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    width: 36,
                    height: 36,
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'rgba(241,246,244,0.65)',
                    textDecoration: 'none',
                    transition: 'all 175ms ease-out',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--forsythia)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--forsythia)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(241,246,244,0.65)';
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'rgba(241,246,244,0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '1.25rem',
                }}
              >
                {group.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'rgba(241,246,244,0.65)',
                        textDecoration: 'none',
                        transition: 'color 175ms ease-out',
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--forsythia)')}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(241,246,244,0.65)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant brand wordmark */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 0 0',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: 'clamp(4rem, 18vw, 14rem)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              background: 'linear-gradient(180deg, rgba(255,200,1,0.18) 0%, rgba(23,43,54,0) 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              userSelect: 'none',
            }}
          >
            NEXARO
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1.5rem 0 2rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(241,246,244,0.35)',
              letterSpacing: '0.05em',
            }}
          >
            © 2026 Nexaro Labs, Inc. All neural rights reserved.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(241,246,244,0.35)',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            All systems operational
          </span>
        </div>
      </div>

      {/* Scroll-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--forsythia)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          opacity: scrollTopVisible ? 1 : 0,
          pointerEvents: scrollTopVisible ? 'auto' : 'none',
          transform: scrollTopVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 350ms ease-in-out, transform 350ms ease-in-out',
          zIndex: 90,
        }}
      >
        <img src="/svgs/chevron-up-solid.svg" alt="" width={16} height={16} />
      </button>
    </footer>
  );
}
