'use client';
import { useState, useRef, useEffect } from 'react';

const faqs = [
  {
    q: 'How fast can I deploy my first AI agent?',
    a: 'You can have a production-grade agent live in under five minutes. Our orchestration layer handles model selection, prompt routing, and retries — you just describe the workflow.',
  },
  {
    q: 'Which language models does Nexaro support?',
    a: 'We support GPT-5, Claude Opus 4 family, Gemini 3, Llama 4, Mistral and any custom OpenAI-compatible endpoint. You can mix and match per workflow step.',
  },
  {
    q: 'Is my data used to train your models?',
    a: 'No. All inference runs through encrypted tenant-isolated containers. Your prompts, completions, and tool outputs are never used to train any model — yours or anyone else’s.',
  },
  {
    q: 'How do you handle compliance and SOC 2?',
    a: 'We are SOC 2 Type II certified, ISO 27001 audited, and HIPAA-ready. Enterprise plans include a signed BAA, audit logs, and per-region data residency.',
  },
  {
    q: 'Can I bring my own LLM keys?',
    a: 'Yes. BYOK is available on every plan. We never proxy your billing — your usage hits your provider account directly.',
  },
  {
    q: 'What happens if I exceed my plan limits?',
    a: 'Executions are throttled gracefully — never dropped. We notify you at 80% and 100%, and you can auto-upgrade or buy on-demand credits without downtime.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll<HTMLElement>('.reveal').forEach((r) => r.classList.add('visible'));
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        background: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
      aria-labelledby="faq-heading"
    >
      <div className="section-container" style={{ maxWidth: 920 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            Frequently Asked
          </div>
          <h2
            id="faq-heading"
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
            Common{' '}
            <span
              style={{
                background: 'var(--gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              inquiries
            </span>
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(241,246,244,0.6)',
              fontSize: '1.05rem',
            }}
          >
            Everything you might want to know before you ship your first agent.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <article
                key={faq.q}
                className={`accordion-panel reveal ${open ? 'open' : ''}`}
                style={{
                  background: open ? 'rgba(255,200,1,0.04)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${open ? 'rgba(255,200,1,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'background 175ms ease-out, border-color 175ms ease-out',
                }}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-content-${i}`}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer',
                    color: 'var(--arctic-powder)',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="accordion-icon"
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      borderRadius: '50%',
                      background: open ? 'var(--forsythia)' : 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 175ms ease-out',
                    }}
                  >
                    <img
                      src={open ? '/svgs/x-mark.svg' : '/svgs/chevron-down.svg'}
                      alt=""
                      width={14}
                      height={14}
                      style={{ filter: open ? 'invert(0)' : 'invert(1)', opacity: 0.85 }}
                    />
                  </span>
                </button>
                <div
                  id={`faq-content-${i}`}
                  className="accordion-content"
                  role="region"
                  aria-hidden={!open}
                >
                  <div
                    style={{
                      padding: '0 1.5rem 1.5rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'rgba(241,246,244,0.7)',
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="reveal"
          style={{
            marginTop: '3rem',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            background: 'rgba(255,255,255,0.02)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--arctic-powder)',
                marginBottom: '0.25rem',
              }}
            >
              Still have questions?
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                color: 'rgba(241,246,244,0.55)',
                fontSize: '0.9rem',
              }}
            >
              Our solutions team responds in under one business hour.
            </div>
          </div>
          <a href="#" className="btn-primary">
            Contact Sales
            <img src="/svgs/chevron-right.svg" alt="" width={14} height={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
