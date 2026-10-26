import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

/**
 * ShimmerButton component inspired by 21st.dev / Magic UI.
 * Features an elegant rotating shimmer border and smooth hover micro-interaction.
 * Supports both link (<a>) and button (<button>) semantics.
 */
export function ShimmerButton({
  children,
  className = '',
  innerClassName = '',
  as = 'button',
  shimmerColor = 'var(--accent-on-dark, #d9a066)',
  shimmerDuration = '3.5s',
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = as;

  return (
    <Component
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 transition-transform active:scale-[0.98]',
        className
      )}
      {...props}
    >
      {/* Rotating Conic Shimmer Border */}
      {!reduceMotion && (
        <span
          className="absolute inset-[-1000%] opacity-85 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            animation: `spin ${shimmerDuration} linear infinite`,
            background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Button Body / Foreground */}
      <span
        className={cn(
          'relative z-10 inline-flex h-full w-full items-center justify-center gap-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 shadow-sm',
          innerClassName
        )}
      >
        {children}
      </span>
    </Component>
  );
}

export default ShimmerButton;
