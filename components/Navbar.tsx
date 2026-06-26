'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'AI Strategy', href: '#features' },
  { label: 'Custom Agents', href: '#bento' },
  { label: 'Process Automation', href: '#performance' },
  { label: 'Data Intelligence', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 350ms ease-in-out, border-color 350ms ease-in-out',
        background: scrolled
          ? 'rgba(23, 43, 54, 0.92)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <nav
        className="section-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
          aria-label="Nexaro Home"
        >
          <span
            aria-hidden="true"
            style={{
              width: 28,
              height: 28,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 100 100" width={26} height={26} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="navBoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FFC801" />
                </linearGradient>
              </defs>
              <path d="M 60 8 L 20 55 L 45 55 L 38 92 L 80 42 L 55 42 Z" fill="url(#navBoltGrad)" />
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

        {/* Desktop nav links */}
        <ul
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'rgba(241, 246, 244, 0.65)',
                  textDecoration: 'none',
                  transition: 'color 175ms ease-out',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--arctic-powder)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'rgba(241, 246, 244, 0.65)')
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search icon */}
          <button
            aria-label="Search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              opacity: 0.6,
              transition: 'opacity 175ms ease-out',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.6')}
            className="hidden md:flex"
            id="nav-search-btn"
          >
            <img src="/svgs/search.svg" alt="Search" width={18} height={18} style={{ filter: 'invert(1)', opacity: 0.8 }} />
          </button>

          <a href="#pricing" className="btn-primary hidden md:inline-flex" id="nav-cta-btn">
            Get Started
          </a>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
            }}
            className="flex md:hidden"
          >
            {menuOpen ? (
              <img src="/svgs/x-mark.svg" alt="Close" width={22} height={22} style={{ filter: 'invert(1)' }} />
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          maxHeight: menuOpen ? '320px' : '0',
          overflow: 'hidden',
          transition: 'max-height 350ms ease-in-out',
          background: 'rgba(23, 43, 54, 0.98)',
          borderTop: menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <ul style={{ listStyle: 'none', padding: '1rem 1.5rem 1.5rem' }}>
          {navLinks.map((link) => (
            <li key={link.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.75rem 0' }}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--arctic-powder)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ paddingTop: '1rem' }}>
            <a href="#pricing" className="btn-primary" id="mobile-cta-btn" style={{ width: '100%', justifyContent: 'center' }}>
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
