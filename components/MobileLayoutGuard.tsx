'use client';

import { useEffect } from 'react';

export default function MobileLayoutGuard() {
  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)');

    const resetHorizontalScroll = () => {
      if (!media.matches) return;
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
      if (window.scrollX !== 0) {
        window.scrollTo({ left: 0, top: window.scrollY, behavior: 'auto' });
      }
    };

    const onToggle = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLDetailsElement && target.classList.contains('mobileNav')) {
        requestAnimationFrame(resetHorizontalScroll);
      }
    };

    resetHorizontalScroll();
    requestAnimationFrame(resetHorizontalScroll);

    window.addEventListener('resize', resetHorizontalScroll, { passive: true });
    window.addEventListener('orientationchange', resetHorizontalScroll);
    document.addEventListener('toggle', onToggle, true);

    return () => {
      window.removeEventListener('resize', resetHorizontalScroll);
      window.removeEventListener('orientationchange', resetHorizontalScroll);
      document.removeEventListener('toggle', onToggle, true);
    };
  }, []);

  return null;
}
