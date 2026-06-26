'use client';
import { useRef, useEffect, useCallback } from 'react';

/* ============================================================
   FEATURE 2: Bento-to-Accordion with Context Lock
   - Desktop: Tabbed view (DISCOVERY|ANALYSIS|TRAINING|DEPLOY)
             + 4 bento feature cards beneath
   - Mobile: Pure CSS accordion
   - Context Lock: ResizeObserver transfers activeIndex across BP
   - Zero external libs. All DOM mutated via refs (no useState
     triggers re-render of parent or sibling cards).
   ============================================================ */

const MOBILE_BP = 768;

const tabs = [
  {
    id: 'discovery',
    label: 'Discovery',
    title: 'Map every signal in your data graph.',
    desc: 'Our discovery engine automatically surfaces entity relationships, knowledge graphs and hidden patterns across your enterprise ecosystem in real time.',
    metric: 'Indexed nodes',
    metricValue: '12.4M',
  },
  {
    id: 'analysis',
    label: 'Analysis',
    title: 'Evaluate agent performance with surgical precision.',
    desc: 'Get real-time scoring on accuracy, safety, and contextual relevance. Quantify every interaction for total quality.',
    metric: 'Quality score',
    metricValue: '94.7%',
  },
  {
    id: 'training',
    label: 'Training',
    title: 'Fine-tune models on your domain data.',
    desc: 'Continuously align with RLHF, LoRA, and full fine-tuning at scale. Push deltas without retraining base.',
    metric: 'Convergence',
    metricValue: '6.2h',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    title: 'Ship production-ready agents in one command.',
    desc: 'Auto-scales to millions of concurrent executions with zero DevOps overhead. Edge-region routing built in.',
    metric: 'P95 latency',
    metricValue: '12ms',
  },
];

const features = [
  {
    icon: '/svgs/cube-16-solid.svg',
    title: 'Infinite Visual Canvas',
    desc: 'Map out multi-step agent behaviors on a high-precision grid. Drag-and-drop triggers, logic gates, and actions to craft custom paths.',
  },
  {
    icon: '/svgs/cog-8-tooth.svg',
    title: 'Autonomous Execution',
    desc: 'Run complex decision trees without manual intervention. Our engine handles conditional branching and error recovery automatically.',
  },
  {
    icon: '/svgs/link-solid.svg',
    title: 'End-to-End Encryption',
    desc: 'Every node and data transfer is shielded by industrial-grade security. Maintain total control over your organizational data flow.',
  },
  {
    icon: '/svgs/arrow-path.svg',
    title: 'Production-Ready Stack',
    desc: 'Connect core business platforms and internal services through secure, ready integrations that scale with your volume.',
  },
];

export default function BentoFeatures() {
  const activeIndexRef = useRef<number>(0);
  const prevIsMobileRef = useRef<boolean>(false);

  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const accordionPanelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ---- DOM mutation helpers (no React state) ----
  const setTabActive = useCallback((index: number) => {
    activeIndexRef.current = index;
    tabBtnRefs.current.forEach((b, i) => {
      if (!b) return;
      const active = i === index;
      b.classList.toggle('tab-active', active);
      b.setAttribute('aria-selected', String(active));
    });
    tabPanelRefs.current.forEach((p, i) => {
      if (!p) return;
      p.classList.toggle('tab-panel-active', i === index);
    });
  }, []);

  const openAccordionPanel = useCallback((index: number) => {
    activeIndexRef.current = index;
    accordionPanelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const isOpen = i === index;
      panel.classList.toggle('open', isOpen);
      panel.setAttribute('aria-expanded', String(isOpen));
    });
  }, []);

  // ---- Context Lock: ResizeObserver ----
  useEffect(() => {
    prevIsMobileRef.current = window.innerWidth < MOBILE_BP;
    setTabActive(0);
    openAccordionPanel(0);

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? window.innerWidth;
      const isMobile = width < MOBILE_BP;
      if (isMobile !== prevIsMobileRef.current) {
        if (isMobile) {
          openAccordionPanel(activeIndexRef.current);
        } else {
          setTabActive(activeIndexRef.current);
        }
        prevIsMobileRef.current = isMobile;
      }
    });

    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [setTabActive, openAccordionPanel]);

  const handleTabClick = (i: number) => setTabActive(i);
  const handleAccordionClick = (i: number) => {
    const next = activeIndexRef.current === i ? -1 : i;
    openAccordionPanel(next);
  };

  return (
    <section
      id="bento"
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
      aria-labelledby="bento-heading"
    >
      <div className="section-container">
        <p className="section-label" style={{ marginBottom: '1rem' }}>{"//006 Bento"}</p>
        <h2
          id="bento-heading"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--arctic-powder)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}
        >
          Engineered for<br />autonomy
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(241,246,244,0.55)',
            fontSize: '1rem',
            maxWidth: '520px',
            marginBottom: '3rem',
            lineHeight: 1.7,
          }}
        >
          Go beyond simple interfaces. Nexaro provides the underlying architecture
          to build, test, and scale enterprise-grade agents.
        </p>

        {/* ===== DESKTOP: TABBED INTERFACE ===== */}
        <div className="bento-grid">
          {/* Tab strip */}
          <div
            role="tablist"
            aria-label="Feature areas"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
              gap: 0,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '0',
            }}
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { tabBtnRefs.current[i] = el; }}
                role="tab"
                aria-selected={i === 0}
                aria-controls={`tab-panel-${i}`}
                id={`tab-btn-${i}`}
                onClick={() => handleTabClick(i)}
                onMouseEnter={() => handleTabClick(i)}
                className="bento-tab-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1.25rem 0.75rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid transparent',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(241,246,244,0.5)',
                  transition: 'color 175ms ease-out, border-color 175ms ease-out',
                }}
              >
                <span aria-hidden="true" style={{ width: 14, height: 14, display: 'inline-flex' }}>
                  <img src={i === 0 ? '/svgs/search.svg' : i === 1 ? '/svgs/chart-pie.svg' : i === 2 ? '/svgs/cog-8-tooth.svg' : '/svgs/arrow-trending-up.svg'} alt="" width={14} height={14} style={{ filter: 'invert(1)', opacity: 0.65 }} />
                </span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab panels (preview) */}
          <div style={{ position: 'relative', minHeight: 360, marginBottom: '2rem' }}>
            {tabs.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => { tabPanelRefs.current[i] = el; }}
                role="tabpanel"
                id={`tab-panel-${i}`}
                aria-labelledby={`tab-btn-${i}`}
                className="bento-tab-panel"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2rem',
                  padding: '2.5rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: 'none',
                  borderRadius: '0 0 12px 12px',
                  opacity: 0,
                  transform: 'translateY(8px)',
                  pointerEvents: 'none',
                  transition: 'opacity 280ms ease-out, transform 280ms ease-out',
                }}
              >
                {/* Left: mockup */}
                <div
                  aria-hidden="true"
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                  className="dot-grid"
                >
                  <div style={{ display: 'flex', gap: 6, opacity: 0.5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                    {[0,1,2,3,4].map((r) => (
                      <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: r === i % 5 ? 'var(--forsythia)' : 'rgba(255,255,255,0.15)' }} />
                        <span style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                          <span style={{ display: 'block', height: '100%', width: `${30 + r * 14}%`, background: 'linear-gradient(90deg, var(--forsythia), var(--deep-saffron))', borderRadius: 3 }} />
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(241,246,244,0.4)' }}>{(30 + r * 14)}%</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(241,246,244,0.5)' }}>
                    {'>'} {t.label.toLowerCase()} running…
                  </div>
                </div>

                {/* Right: copy */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--arctic-powder)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                  }}>{t.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(241,246,244,0.6)', lineHeight: 1.7 }}>
                    {t.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, alignSelf: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(241,246,244,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.metric}</span>
                    <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: 'var(--forsythia)' }}>{t.metricValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FEATURE CARDS (visible both desktop & mobile, below tabs/accordion) ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
        }}>
          {features.map((f) => (
            <article key={f.title} className="glass-card" style={{ padding: '1.5rem', borderRadius: 10 }}>
              <img src={f.icon} alt="" width={22} height={22} style={{ filter: 'invert(1)', opacity: 0.7, marginBottom: '0.75rem' }} />
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--arctic-powder)', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(241,246,244,0.55)', lineHeight: 1.7 }}>{f.desc}</p>
            </article>
          ))}
        </div>

        {/* ===== MOBILE: ACCORDION ===== */}
        <div className="bento-accordion" aria-label="Feature areas (mobile)" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {tabs.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => { accordionPanelRefs.current[i] = el; }}
              className="accordion-panel"
              aria-expanded="false"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <button
                onClick={() => handleAccordionClick(i)}
                aria-controls={`acc-content-${i}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(241,246,244,0.4)' }}>0{i + 1}</span>
                <span style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--arctic-powder)' }}>
                  {t.label}
                </span>
                <img src="/svgs/chevron-down.svg" alt="" width={16} height={16} className="accordion-icon" style={{ filter: 'invert(1)', opacity: 0.5 }} />
              </button>
              <div className="accordion-content" id={`acc-content-${i}`} role="region">
                <div style={{ paddingBottom: '1.25rem', paddingLeft: '2.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--arctic-powder)', marginBottom: '0.5rem' }}>{t.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(241,246,244,0.55)', lineHeight: 1.7 }}>{t.desc}</p>
                  <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(241,246,244,0.45)' }}>{t.metric}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--forsythia)' }}>{t.metricValue}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
