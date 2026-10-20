import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BlurText } from './blur-text';

export default function WeightSweepPreloader({
  onComplete,
  duration = 2.0,
  name = "Aldy Oktaviano",
  role = "Quality Assurance & Frontend Developer",
}) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('sweeping'); // sweeping -> ink-rise -> curtain-up -> done
  const [showCounterScreen, setShowCounterScreen] = useState(true);

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
        // Step 1: Counter reaches 100%, raise the dark ink panel displaying the role
        setTimeout(() => setStage('ink-rise'), 100);

        // Step 2: Once dark ink curtain covers the screen (450ms after ink-rise), unmount Layer 1 completely
        setTimeout(() => setShowCounterScreen(false), 550);

        // Step 3: Keep role visible for ~1750ms so BlurText ripple finishes, then lift curtain to reveal Hero
        setTimeout(() => {
          setStage('curtain-up');
          onComplete?.();
        }, 1850);
      }
    }

    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete, reduceMotion]);

  if (stage === 'done') return null;

  const currentWeight = Math.round(100 + (progress / 100) * 800);
  const tickWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="fixed inset-0 z-[9999] select-none pointer-events-auto">
      {/* Layer 1: Sweeping Counter Screen (Cleanly unmounted before curtain lifts) */}
      {showCounterScreen && stage !== 'curtain-up' && (
        <div className="absolute inset-0 flex flex-col justify-between bg-[var(--bg)] text-[var(--text)] overflow-hidden">
          {/* Top Bar: Name & Specimen Tag */}
          <div className="w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between text-sm text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text)]">{name}</span>
            <span className="font-mono text-xs text-[var(--accent)]">
              VARIABLE SPECIMEN // WGHT {currentWeight}
            </span>
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
        </div>
      )}

      {/* Layer 2: Ink Panel (Slides up displaying role, then lifts up like a curtain) */}
      {(stage === 'ink-rise' || stage === 'curtain-up') && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{
            y: stage === 'curtain-up' ? '-100%' : '0%',
          }}
          transition={{
            duration: stage === 'curtain-up' ? 0.8 : 0.65,
            ease: [0.76, 0, 0.24, 1], // Smooth luxury cubic easing
          }}
          onAnimationComplete={() => {
            if (stage === 'curtain-up') {
              setStage('done');
            }
          }}
          className="absolute inset-0 bg-[var(--text)] text-[var(--bg)] flex flex-col items-center justify-center p-8 z-20 shadow-2xl"
        >
          <div className="font-serif italic text-2xl sm:text-4xl lg:text-5xl text-[var(--bg)] text-center max-w-3xl leading-relaxed flex items-center justify-center">
            <span className="opacity-60 select-none mr-2">&ldquo;</span>
            <BlurText
              text={role}
              trigger={stage === 'ink-rise' || stage === 'curtain-up'}
              animateBy="words"
              delay={0.09}
              highlightWord="&"
              highlightClassName="text-[var(--accent-on-dark)] font-sans not-italic font-bold"
              className="font-serif italic text-[var(--bg)] text-center"
            />
            <span className="opacity-60 select-none ml-2">&rdquo;</span>
          </div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-xs sm:text-sm text-[var(--accent-on-dark)] font-mono font-semibold tracking-widest uppercase"
          >
            {name}
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
