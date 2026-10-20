import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function WeightSweepPreloader({
  onComplete,
  duration = 2.6,
  name = "Aldy Oktaviano",
  italicLine = "Quality Assurance & Frontend Engineering"
}) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('sweeping'); // sweeping -> ink-rise -> exit -> done

  useEffect(() => {
    if (reduceMotion) {
      onComplete?.();
      setStage('done');
      return;
    }

    const startTime = performance.now();
    const totalMs = duration * 1000;

    function frame(now) {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / totalMs);
      const ease = 1 - Math.pow(1 - rawProgress, 3);
      const p = Math.min(100, Math.round(ease * 100));
      setProgress(p);

      if (rawProgress < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => setStage('ink-rise'), 250);
        setTimeout(() => setStage('exit'), 1400);
        setTimeout(() => {
          setStage('done');
          onComplete?.();
        }, 2200);
      }
    }

    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete, reduceMotion]);

  if (stage === 'done') return null;

  const currentWeight = Math.round(100 + (progress / 100) * 800);
  const tickWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[var(--bg)] text-[var(--text)] select-none overflow-hidden"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top Bar: Name & Specimen Tag */}
          <div className="w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between text-sm text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text)]">{name}</span>
            <span className="font-mono text-xs text-[var(--accent)]">VARIABLE SPECIMEN // WGHT {currentWeight}</span> {/* taste-skill-ignore */}
          </div>

          {/* Center Stage: Giant Weight Sweep Counter */}
          <div className="w-full max-w-6xl mx-auto px-6 text-center my-auto">
            <div
              className="text-7xl sm:text-9xl lg:text-[14rem] leading-none tabular-nums text-[var(--text)] transition-[font-weight] duration-75"
              style={{ fontWeight: currentWeight }}
            >
              {progress}
            </div>

            {/* Tick Rail (100 to 900) */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between px-1 mb-2">
                {tickWeights.map((w) => (
                  <span
                    key={w}
                    className={`text-xs transition-colors duration-150 ${
                      currentWeight >= w ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-muted)]/40'
                    }`}
                  >
                    {w}
                  </span>
                ))}
              </div>
              <div className="relative h-1.5 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar: Status */}
          <div className="w-full max-w-6xl mx-auto px-6 pb-8 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>LOADING ASSETS &amp; RUNTIME</span>
            <span className="text-[var(--accent)] font-semibold">{progress}%</span>
          </div>

          {/* Ink Panel Rise (Overnight specimen layer with italic line) */}
          <AnimatePresence>
            {(stage === 'ink-rise' || stage === 'exit') && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-[var(--text)] text-[var(--bg)] flex flex-col items-center justify-center p-8 z-20"
              >
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="font-serif italic text-2xl sm:text-4xl text-[var(--bg)] text-center max-w-xl leading-relaxed"
                >
                  &ldquo;{italicLine}&rdquo;
                </motion.p>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mt-4 text-sm text-[var(--accent)] font-semibold"
                >
                  {name}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
