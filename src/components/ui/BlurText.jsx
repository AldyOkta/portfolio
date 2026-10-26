import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function BlurText({
  text,
  className = '',
  delay = 0.06,
  animateBy = 'words', // 'words' | 'letters'
  trigger = true,
  highlightWord = '',
  highlightClassName = '',
}) {
  const reduceMotion = useReducedMotion();
  const [hoverKey, setHoverKey] = useState(0);

  const elements = animateBy === 'words' ? String(text || '').split(' ') : String(text || '').split(/(?:)/u);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const handleHover = () => {
    setHoverKey((prev) => prev + 1);
  };

  return (
    <motion.span
      key={`blur-text-${hoverKey}`}
      onMouseEnter={handleHover}
      className={cn('inline-flex flex-wrap items-center justify-center gap-x-2.5 cursor-pointer select-none', className)}
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
      title="Hover untuk melihat efek sinematik"
    >
      {elements.map((segment, idx) => {
        const isHighlight = highlightWord && segment === highlightWord;
        return (
          <motion.span
            key={idx}
            variants={{
              hidden: {
                opacity: 0,
                filter: 'blur(12px)',
                y: 20,
              },
              visible: {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: {
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1], // Smooth cinematic luxury curve
                },
              },
            }}
            className={cn('inline-block transition-colors duration-200', isHighlight && highlightClassName)}
          >
            {segment === ' ' ? '\u00A0' : segment}
          </motion.span>
        );
      })}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}

export default BlurText;
