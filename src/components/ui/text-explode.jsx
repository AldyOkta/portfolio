import React, { useRef, useCallback, useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

const containerVariants = {
  initial: {
    opacity: 1,
    translateY: 0,
    letterSpacing: '0px',
    transition: { duration: 0.4 },
  },
  shrink: {
    scale: 0.92,
    letterSpacing: '-2px',
  },
  jitter: {
    x: [0, -2, 2, -2, 2, 0],
    y: [0, -2, 2, -1, 1, 0],
    transition: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'easeInOut' },
  },
  explode: {
    scale: [0.92, 1.05, 1],
    opacity: [1, 0.7, 0],
    letterSpacing: '0px',
    transition: { times: [0, 0.7, 1], duration: 0.5 },
  },
  end: {
    scale: 1,
    letterSpacing: '0px',
    translateY: 20,
  },
};

const createExplosion = ({ index, total }) => {
  const dir = Math.random() > 0.5 ? 1 : -1;
  const spreadX = (Math.random() * 6 + 4) * Math.min(total, 24) * dir;
  const spreadY = (Math.random() * 5 + 3) * Math.min(total, 16);
  const angle = (index / Math.max(1, total - 1)) * Math.PI;
  const offsetY = -spreadY * Math.sin(angle) * (Math.random() * 0.8 + 0.6);
  const rot = (Math.random() * 320 + 40) * dir;

  return {
    translateX: [0, spreadX * 0.4, spreadX * 0.7, spreadX],
    translateY: [0, offsetY, offsetY * 0.2, 10],
    rotate: [0, rot * 0.3, rot * 0.7, rot],
    scale: [1, 1.3, 1.1, 0],
    opacity: [1, 0.85, 0.5, 0],
    transition: { duration: 0.65, ease: 'easeOut' },
  };
};

const charVariants = {
  initial: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 140, damping: 15 },
  },
  shrink: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
  jitter: () => ({
    x: [0, -3 + Math.random() * 6, 3 - Math.random() * 6, 0],
    y: [0, -2 + Math.random() * 4, 2 - Math.random() * 4, 0],
    transition: { duration: 0.4, times: [0, 0.33, 0.66, 1], ease: 'easeInOut' },
  }),
  explode: createExplosion,
  end: {
    translateY: 0,
    translateX: 0,
    rotate: 0,
    scale: 1,
    opacity: 0,
  },
};

function splitText(str) {
  return String(str || '').split(/(?:)/u);
}

export function TextExplode({
  text,
  mode = 'hover',
  className = '',
  triggerOnMount = false,
}) {
  const reduceMotion = useReducedMotion();
  const chars = splitText(text);
  const controls = useAnimation();
  const isRunning = useRef(false);
  const hasTriggeredInitial = useRef(false);

  const runAnimation = useCallback(async () => {
    if (isRunning.current || reduceMotion) return;
    isRunning.current = true;

    try {
      await Promise.all([
        controls.start('shrink', { duration: 0.4, ease: 'easeOut' }),
        controls.start('jitter', { delay: 0.05 }),
      ]);
      await controls.start('explode');
      await controls.start('end');
      await controls.start('initial');
    } finally {
      isRunning.current = false;
    }
  }, [controls, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !chars.length) return;

    if (triggerOnMount && !hasTriggeredInitial.current) {
      hasTriggeredInitial.current = true;
      const timer = setTimeout(() => {
        runAnimation();
      }, 500); // 500ms delay after loader completes for maximum visual impact
      return () => clearTimeout(timer);
    }
  }, [triggerOnMount, reduceMotion, chars.length, runAnimation]);

  const handleTrigger = () => {
    if (!isRunning.current && !reduceMotion) {
      runAnimation();
    }
  };

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      variants={containerVariants}
      animate={controls}
      onPointerDown={handleTrigger}
      onMouseEnter={mode === 'hover' ? handleTrigger : undefined}
      className={cn('inline-flex flex-wrap items-center justify-center cursor-pointer select-none', className)}
      title="Klik atau hover untuk meledakkan partikel teks"
    >
      {chars.map((char, idx) => (
        <motion.span
          key={idx}
          variants={charVariants}
          custom={{ index: idx, total: chars.length }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}

export default TextExplode;
