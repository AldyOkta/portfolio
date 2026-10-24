import React, { useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * SpotlightCard component inspired by 21st.dev / Aceternity UI.
 * Creates a subtle cursor-following radial light and border glow.
 * Optimized with CSS variables for 60-120fps GPU performance without React re-render lag.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(150, 85, 31, 0.09)',
  borderColor = 'rgba(150, 85, 31, 0.4)',
  spotlightRadius = 380,
  as = 'div',
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || reduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, [reduceMotion]);

  const handleMouseEnter = () => {
    if (!reduceMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const Component = as;

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-colors duration-300 hover:border-[var(--border-strong)]',
        className
      )}
      style={{
        '--mouse-x': '-999px',
        '--mouse-y': '-999px',
        '--spotlight-radius': `${spotlightRadius}px`,
        '--spotlight-color': spotlightColor,
        '--spotlight-border': borderColor,
      }}
      {...props}
    >
      {/* Background Radial Spotlight */}
      {!reduceMotion && (
        <div
          className={cn(
            'pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: `radial-gradient(var(--spotlight-radius) circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Border Glow Mask */}
      {!reduceMotion && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-0 border border-transparent',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            WebkitMaskImage: `radial-gradient(calc(var(--spotlight-radius) * 0.7) circle at var(--mouse-x) var(--mouse-y), black, transparent 75%)`,
            maskImage: `radial-gradient(calc(var(--spotlight-radius) * 0.7) circle at var(--mouse-x) var(--mouse-y), black, transparent 75%)`,
            borderColor: 'var(--spotlight-border)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </Component>
  );
}

export default SpotlightCard;
