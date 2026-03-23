import { useEffect, useRef } from 'react';

/**
 * Shared hook to reveal sections when they scroll into view.
 *
 * @param {any} dep - A reactive dependency (e.g., active tab or year). When changed,
 *                    bars are reset to 0 width and animated back in.
 */
export function useReveal(dep) {
  const prevDep = useRef(null);

  useEffect(() => {
    // If the dependency changed (like selecting a different year),
    // we want to reset all bars and immediately trigger animation.
    const isChange = prevDep.current !== null && prevDep.current !== dep;
    prevDep.current = dep;

    if (isChange) {
      document.querySelectorAll('[data-bar-w]').forEach(el => {
        el.style.width = '0%';
      });
      setTimeout(() => {
        document.querySelectorAll('[data-bar-w]').forEach((el, i) => {
          setTimeout(() => {
            el.style.width = el.dataset.barW + '%';
          }, 160 + i * 90);
        });
      }, 30);
      return;
    }

    // Set up standard scroll-reveal IntersectionObserver
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          animateBars(e.target);
        }
      });
    }, { threshold: 0.06 });

    // Observe all un-revealed sections
    const els = document.querySelectorAll('.section:not(.visible)');
    els.forEach(el => obs.observe(el));

    // Force reveal the first section immediately
    const first = document.querySelector('.section');
    if (first) {
      first.classList.add('visible');
      animateBars(first);
    }

    return () => obs.disconnect();
  }, [dep]);
}

/**
 * Animates elements with the `data-bar-w` attribute inside a given container.
 */
export function animateBars(container) {
  (container || document).querySelectorAll('[data-bar-w]').forEach((el, i) => {
    setTimeout(() => {
      el.style.width = el.dataset.barW + '%';
    }, 160 + i * 90);
  });
}
