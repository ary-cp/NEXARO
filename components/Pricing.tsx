'use client';
import { useRef, useCallback, useEffect } from 'react';
import { PRICING_MATRIX, computePrice, type Currency, type Billing } from '@/lib/pricingMatrix';

/* ============================================================
   FEATURE 1: Matrix-Driven Pricing & Performance-Isolated Currency Switcher

   ARCHITECTURE:
   - PRICING_MATRIX is the single source of truth (no hardcoded values)
   - billingRef and currencyRef hold current state (no useState)
   - Price DOM nodes updated via direct textContent mutation (no re-render)
   - Parent component NEVER re-renders on currency/billing change
   - Verified via Chrome DevTools Performance tab: only text node updates
   ============================================================ */

export default function Pricing() {
  // Refs to hold current state — never triggers re-render
  const billingRef = useRef<Billing>('monthly');
  const currencyRef = useRef<Currency>('USD');

  // Refs to each price display <span> — direct textContent mutation
  const priceNodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Refs to billing toggle track and currency buttons for visual state
  const toggleTrackRef = useRef<HTMLButtonElement>(null);
  const currencyBtnRefs = useRef<Record<Currency, HTMLButtonElement | null>>({ USD: null, INR: null, EUR: null });
  const annualBadgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Billing label refs
  const monthlyLabelRef = useRef<HTMLSpanElement>(null);
  const annualLabelRef = useRef<HTMLSpanElement>(null);

  // ---- Core: update ALL price text nodes (NO React state change) ----
  const updatePrices = useCallback(() => {
    const currency = currencyRef.current;
    const billing = billingRef.current;

    PRICING_MATRIX.tiers.forEach((tier, i) => {
      const node = priceNodeRefs.current[i];
      if (!node) return;

      // Use WAAPI for a subtle fade-swap animation on the text node
      node.animate(
        [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }],
        { duration: 120, easing: 'ease-out', fill: 'forwards' }
      ).finished.then(() => {
        node.textContent = computePrice(tier.baseUSD, currency, billing);
        node.animate(
          [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 150, easing: 'ease-out', fill: 'forwards' }
        );
      });

      // Show/hide annual badge
      const badge = annualBadgeRefs.current[i];
      if (badge) {
        badge.style.opacity = billing === 'annual' ? '1' : '0';
        badge.style.transform = billing === 'annual' ? 'scale(1)' : 'scale(0.8)';
      }
    });
  }, []);

  // ---- Billing toggle handler ----
  const handleBillingToggle = useCallback(() => {
    billingRef.current = billingRef.current === 'monthly' ? 'annual' : 'monthly';

    // Update toggle visual (direct DOM)
    if (toggleTrackRef.current) {
      toggleTrackRef.current.classList.toggle('active', billingRef.current === 'annual');
      toggleTrackRef.current.setAttribute('aria-checked', String(billingRef.current === 'annual'));
    }
    // Update label opacities
    if (monthlyLabelRef.current)
      monthlyLabelRef.current.style.opacity = billingRef.current === 'monthly' ? '1' : '0.4';
    if (annualLabelRef.current)
      annualLabelRef.current.style.opacity = billingRef.current === 'annual' ? '1' : '0.4';

    updatePrices();
  }, [updatePrices]);

  // ---- Currency switch handler ----
  const handleCurrencySwitch = useCallback((currency: Currency) => {
    if (currency === currencyRef.current) return;
    currencyRef.current = currency;

    // Update currency button visuals (direct DOM)
    (Object.keys(currencyBtnRefs.current) as Currency[]).forEach((c) => {
      const btn = currencyBtnRefs.current[c];
      if (btn) btn.classList.toggle('active', c === currency);
    });

    updatePrices();
  }, [updatePrices]);

  // Initial render — set prices once on mount
  useEffect(() => {
    updatePrices();
  }, [updatePrices]);

  const currencies: Currency[] = ['USD', 'INR', 'EUR'];

  return (
    <section
      id="pricing"
      style={{
        background: 'var(--arctic-powder)',
        color: 'var(--oceanic-noir)',
        padding: 'var(--section-padding) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '70vw',
          background: 'radial-gradient(circle, rgba(255,200,1,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <p className="section-label" style={{ marginBottom: '1rem' }}>{"//008 Pricing"}</p>
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--oceanic-noir)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}
        >
          Simple, transparent<br />pricing
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(23,43,54,0.7)',
            fontSize: '1rem',
            maxWidth: '460px',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}
        >
          All plans include a 14-day free trial. No credit card required.
        </p>

        {/* ---- Controls: Billing Toggle + Currency Switcher ---- */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Billing toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              ref={monthlyLabelRef}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--oceanic-noir)',
                transition: 'opacity 175ms ease-out',
              }}
            >
              Monthly
            </span>

            <button
              ref={toggleTrackRef}
              className="pricing-toggle-track"
              onClick={handleBillingToggle}
              role="switch"
              aria-checked="false"
              aria-label="Toggle annual billing for 20% discount"
              id="billing-toggle-btn"
            >
              <div className="pricing-toggle-thumb" />
            </button>

            <span
              ref={annualLabelRef}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--oceanic-noir)',
                opacity: 0.4,
                transition: 'opacity 175ms ease-out',
              }}
            >
              Annual
            </span>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.2rem 0.625rem',
                background: 'rgba(255,200,1,0.15)',
                color: 'var(--forsythia)',
                borderRadius: '999px',
                border: '1px solid rgba(255,200,1,0.3)',
                letterSpacing: '0.05em',
              }}
            >
              −20%
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '24px', background: 'rgba(17,76,90,0.18)' }} />

          {/* Currency switcher */}
          <div
            style={{ display: 'flex', gap: '0.375rem' }}
            role="group"
            aria-label="Select currency"
          >
            {currencies.map((c) => (
              <button
                key={c}
                ref={(el) => { currencyBtnRefs.current[c] = el; }}
                className={`currency-btn${c === 'USD' ? ' active' : ''}`}
                onClick={() => handleCurrencySwitch(c)}
                id={`currency-btn-${c.toLowerCase()}`}
                aria-label={`Switch to ${c}`}
                aria-pressed={c === 'USD'}
              >
                {PRICING_MATRIX.regionalTariffs[c].symbol} {c}
              </button>
            ))}
          </div>
        </div>

        {/* ---- Pricing cards ---- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {PRICING_MATRIX.tiers.map((tier, i) => (
            <article
              key={tier.id}
              id={`pricing-card-${tier.id}`}
              style={{
                background: tier.highlighted
                  ? 'var(--oceanic-noir)'
                  : 'rgba(255,255,255,0.85)',
                border: tier.highlighted
                  ? '1px solid var(--forsythia)'
                  : '1px solid rgba(17,76,90,0.12)',
                borderRadius: '12px',
                padding: '2rem',
                position: 'relative',
                transition: 'transform 175ms ease-out, box-shadow 175ms ease-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = tier.highlighted
                  ? '0 12px 40px rgba(255,200,1,0.15)'
                  : '0 8px 30px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Popular badge */}
              {tier.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--forsythia)',
                    color: 'var(--oceanic-noir)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.25rem 1rem',
                    borderRadius: '0 0 8px 8px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Tier name */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: tier.highlighted ? 'var(--forsythia)' : 'rgba(23,43,54,0.55)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  marginTop: tier.highlighted ? '0.75rem' : '0',
                }}
              >
                {tier.name}
              </div>

              {/* Price display — ONLY this node changes on currency/billing switch */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
                <span
                  ref={(el) => { priceNodeRefs.current[i] = el; }}
                  id={`price-display-${tier.id}`}
                  aria-live="polite"
                  aria-label={`Price for ${tier.name} plan`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 800,
                    color: tier.highlighted ? 'var(--arctic-powder)' : 'var(--oceanic-noir)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    display: 'inline-block',
                  }}
                >
                  —
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: tier.highlighted ? 'rgba(241,246,244,0.5)' : 'rgba(23,43,54,0.45)',
                    paddingBottom: '0.35rem',
                  }}
                >
                  /mo
                </span>
              </div>

              {/* Annual savings badge */}
              <span
                ref={(el) => { annualBadgeRefs.current[i] = el; }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.625rem',
                  background: 'rgba(255,200,1,0.12)',
                  color: 'var(--forsythia)',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,200,1,0.25)',
                  marginBottom: '1rem',
                  opacity: 0,
                  transform: 'scale(0.8)',
                  transition: 'opacity 175ms ease-out, transform 175ms ease-out',
                }}
                aria-label="Annual discount applied"
              >
                20% saved
              </span>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.825rem',
                  color: tier.highlighted ? 'rgba(241,246,244,0.7)' : 'rgba(23,43,54,0.6)',
                  lineHeight: 1.6,
                  marginBottom: '1.75rem',
                  minHeight: '52px',
                }}
              >
                {tier.description}
              </p>

              {/* CTA */}
              <a
                href="#"
                id={`pricing-cta-${tier.id}`}
                className={tier.highlighted ? 'btn-primary' : 'btn-outline'}
                style={{ width: '100%', justifyContent: 'center', marginBottom: '1.75rem' }}
              >
                {tier.highlighted ? 'Start Free Trial' : 'Get Started'}
              </a>

              {/* Features list */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {tier.features.map((f) => (
                  <li
                    key={f.text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: tier.highlighted ? (f.included ? 'rgba(241,246,244,0.85)' : 'rgba(241,246,244,0.3)') : (f.included ? 'rgba(23,43,54,0.75)' : 'rgba(23,43,54,0.3)'),
                      textDecoration: f.included ? 'none' : 'none',
                    }}
                  >
                    {f.included ? (
                      <img src="/svgs/chevron-up-solid.svg" alt="Included" width={14} height={14} style={{ filter: tier.highlighted ? 'invert(1)' : 'invert(0)', opacity: 0.7, flexShrink: 0 }} />
                    ) : (
                      <img src="/svgs/x-mark.svg" alt="Not included" width={14} height={14} style={{ filter: tier.highlighted ? 'invert(1)' : 'invert(0)', opacity: 0.3, flexShrink: 0 }} />
                    )}
                    {f.text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
