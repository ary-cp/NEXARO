'use client';
import { useEffect, useRef } from 'react';

/**
 * SplashLoader
 * - Renders an inert, hardware-accelerated overlay that fades out within 300ms.
 * - Total orchestration (loader + entry animation) stays under the 500ms TTI budget.
 * - Does NOT block semantic HTML indexing: the overlay is purely visual; the page
 *   markup beneath it is fully rendered server-side and crawlable.
 */
export default function SplashLoader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // Defer one frame so the initial paint shows the splash, then fade out.
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        el.classList.add('splash-loader--gone');
        // Remove from layout after the transition completes.
        const t = setTimeout(() => el.remove(), 360);
        el.dataset.cleanupTimer = String(t);
      });
      el.dataset.r2 = String(r2);
    });
    el.dataset.r1 = String(r1);
  }, []);

  return (
    <div
      ref={rootRef}
      className="splash-loader"
      aria-hidden="true"
      role="presentation"
    >
      <div className="splash-loader__bolt">
        <svg viewBox="0 0 100 100" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="splashBoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFC801" />
            </linearGradient>
          </defs>
          <path
            d="M 60 8 L 20 55 L 45 55 L 38 92 L 80 42 L 55 42 Z"
            fill="url(#splashBoltGrad)"
          />
        </svg>
      </div>
      <div className="splash-loader__bar" />
      <div className="splash-loader__brand">NEXARO</div>
    </div>
  );
}
