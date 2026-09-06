'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => {
    window.dispatchEvent(new Event('krida:scroll-top'));
  };

  return (
    <button
      className={`backToTop${visible ? ' isVisible' : ''}`}
      type="button"
      aria-label="Back to top"
      onClick={goTop}
    >
      <span>↑</span><b>Top</b>
    </button>
  );
}
