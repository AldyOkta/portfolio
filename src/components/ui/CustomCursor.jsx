import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const dotRef = useRef(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hoverText, setHoverText] = useState('');
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (reduceMotion) return;

    setVisible(true);

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const enter = (e) => {
      const label = e.target.closest('[data-cursor]');
      if (label) setHoverText(label.getAttribute('data-cursor'));
    };
    const leave = (e) => {
      const label = e.target.closest('[data-cursor]');
      if (label) setHoverText('');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        animate={{
          x: pos.x - (hoverText ? 40 : 5),
          y: pos.y - (hoverText ? 40 : 5),
          width: hoverText ? 80 : clicking ? 6 : 10,
          height: hoverText ? 80 : clicking ? 6 : 10,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ borderRadius: '50%' }}
      >
        <div className={`w-full h-full rounded-full flex items-center justify-center ${hoverText ? 'bg-[var(--accent)]' : 'bg-[var(--text)]'}`}>
          <AnimatePresence>
            {hoverText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[13px] font-bold text-white whitespace-nowrap"
              >
                {hoverText}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Hide default cursor globally */}
      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
