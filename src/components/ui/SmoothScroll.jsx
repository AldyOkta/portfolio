import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // expose for anchor click smooth scroll
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
