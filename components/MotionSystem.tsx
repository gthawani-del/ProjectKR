'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 760px)').matches;

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!reduced && !mobile) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
    }

    const scrollToTop = () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 0.9, force: true, onComplete: () => ScrollTrigger.refresh() });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'smooth' });
      }
    };

    const onScrollTopRequest = () => scrollToTop();
    window.addEventListener('krida:scroll-top', onScrollTopRequest);

    const topLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href="#top"]'));
    const topLinkHandlers = topLinks.map((link) => {
      const handler = (event: MouseEvent) => {
        event.preventDefault();
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        scrollToTop();
      };
      link.addEventListener('click', handler);
      return { link, handler };
    });

    if (reduced) {
      return () => {
        window.removeEventListener('krida:scroll-top', onScrollTopRequest);
        topLinkHandlers.forEach(({ link, handler }) => link.removeEventListener('click', handler));
      };
    }

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.section');
      sections.forEach((section) => {
        const label = section.querySelector('.sectionLabel');
        const headings = section.querySelectorAll('h2');

        if (label) {
          gsap.fromTo(label,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 82%', once: true },
            }
          );
        }

        if (headings.length) {
          gsap.fromTo(headings,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 76%', once: true },
            }
          );
        }
      });

      const heroCopy = document.querySelector('.heroCopy');
      if (heroCopy) {
        const items = heroCopy.querySelectorAll('.kicker, h1, p, .circleLink');
        gsap.fromTo(items,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.11, ease: 'power3.out', delay: 0.08 }
        );
      }

      const heroMedia = document.querySelector('.videoPlaceholder');
      if (heroMedia && !mobile) {
        gsap.fromTo(heroMedia,
          { clipPath: 'inset(0 0 0 12%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 1.15, ease: 'power3.out', delay: 0.16 }
        );
        gsap.to(heroMedia, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
        });
      }

      const path = document.querySelector('.intelligencePath');
      if (path) {
        const nodes = path.querySelectorAll('.pathNode');
        const arrows = path.querySelectorAll(':scope > i');
        gsap.fromTo(nodes,
          { autoAlpha: 0.35, y: 10 },
          {
            autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.16, ease: 'power2.out',
            scrollTrigger: { trigger: path, start: 'top 78%', once: true },
          }
        );
        gsap.fromTo(arrows,
          { scaleX: 0, transformOrigin: 'left center', autoAlpha: 0 },
          {
            scaleX: 1, autoAlpha: 1, duration: 0.35, stagger: 0.16, ease: 'power2.out',
            scrollTrigger: { trigger: path, start: 'top 76%', once: true },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('.signalList article').forEach((row, index) => {
        gsap.fromTo(row,
          { autoAlpha: 0, x: 18 },
          {
            autoAlpha: 1, x: 0, duration: 0.55, delay: index * 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.lawyerCard').forEach((card, index) => {
        gsap.fromTo(card,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1, y: 0, duration: 0.65, delay: index * 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          }
        );
      });

      const line = document.querySelector<HTMLElement>('.kridaIntelligenceLine');
      const dot = document.querySelector<HTMLElement>('.kridaIntelligenceDot');
      if (line && dot && pathname === '/') {
        gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
        gsap.to(line, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 0.35 },
        });
        gsap.to(dot, {
          top: 'calc(100% - 8px)',
          ease: 'none',
          scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 0.35 },
        });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('krida:scroll-top', onScrollTopRequest);
      topLinkHandlers.forEach(({ link, handler }) => link.removeEventListener('click', handler));
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [pathname]);

  return (
    <div className="kridaIntelligenceTrack" aria-hidden="true">
      <span className="kridaIntelligenceLine" />
      <span className="kridaIntelligenceDot" />
    </div>
  );
}
