import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * TextMaskReveal component inspired by 21st.dev.
 * Wraps words/letters in an overflow-hidden mask and slides them up gracefully.
 */
export function TextMaskReveal({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.04,
  duration = 0.65,
  as = 'div',
  trigger = true,
  animateBy = 'words', // 'words' | 'letters'
}) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion || !text) {
    return <Tag className={className}>{text}</Tag>;
  }

  const segments = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <Tag className={cn('inline-flex flex-wrap items-baseline', className)}>
      {segments.map((segment, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top leading-tight"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0 }}
            animate={trigger ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1], // Smooth luxury curve
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
          </motion.span>
          {animateBy === 'words' && i < segments.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}

export default TextMaskReveal;
