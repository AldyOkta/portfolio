"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import TextMaskReveal from "./text-mask-reveal";
import ShimmerButton from "./shimmer-button";

export function DotGridHero({
  name = "Aldy Oktaviano",
  location = "Surakarta, Jawa Tengah",
  role = "Quality Assurance & Frontend Developer",
  summary = "Menyusun test case, memastikan bug tertangani sampai tuntas, dan mendampingi user saat UAT. Latar belakang di pengembangan aplikasi memudahkan diskusi dengan developer.",
  cvUrl = "https://drive.google.com/file/d/1Ez6NzttGfwHsggKy0apQlq2_679Qrntf/view?usp=sharing",
  downloadText = "Unduh Curriculum Vitae (PDF)",
  dotGap = 48,
  interactionRadius = 140,
  repulsionStrength = 7,
  springK = 0.08,
  damping = 0.82,
  className,
  isLoaded = true,
}) {
  const canvasRef = React.useRef(null);
  const mouseRef = React.useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = React.useRef([]);
  const rafRef = React.useRef(0);
  const reduceMotion = useReducedMotion() === true;

  function buildParticles(W, H) {
    const jitter = dotGap * 0.45;
    const cols = Math.ceil(W / dotGap) + 1;
    const rows = Math.ceil(H / dotGap) + 1;
    const ps = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = c * dotGap + (Math.random() - 0.5) * jitter * 2;
        const oy = r * dotGap + (Math.random() - 0.5) * jitter * 2;
        ps.push({
          ox,
          oy,
          x: ox,
          y: oy,
          vx: 0,
          vy: 0,
          w: 2.2 + Math.random() * 1.4,
          h: 7 + Math.random() * 8,
          rot: (Math.random() - 0.5) * 0.5,
          color: (typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--dot-active').trim() : '') || 'rgba(150, 85, 31, 1)',
          baseAlpha: 0.10 + Math.random() * 0.06,
          alpha: 0.10,
        });
      }
    }
    return ps;
  }

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function toCanvasCoords(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseMove(e) {
      const { x, y } = toCanvasCoords(e);
      mouseRef.current = { x, y, active: true };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    }

    function onTouchMove(e) {
      if (!e.touches[0]) return;
      const { x, y } = toCanvasCoords(e.touches[0]);
      mouseRef.current = { x, y, active: true };
    }

    function onTouchEnd() {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cvs = canvas;
    const c = ctx;

    let W = 0, H = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      W = cvs.offsetWidth;
      H = cvs.offsetHeight;
      cvs.width = W * dpr;
      cvs.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = buildParticles(W, H);
    }

    let isVisible = true;
    const io = new IntersectionObserver(([e]) => {
      isVisible = e?.isIntersecting ?? true;
      if (isVisible && !document.hidden && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }, { threshold: 0.01 });
    io.observe(cvs);

    function onVisibilityChange() {
      if (!document.hidden && isVisible && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    function draw() {
      if (document.hidden || !isVisible) {
        rafRef.current = 0;
        return;
      }
      c.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active && !reduceMotion;
      const ir = interactionRadius;
      const ir2 = ir * ir;

      for (const p of particlesRef.current) {
        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < ir2 && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = ((ir - dist) / ir) ** 2 * repulsionStrength;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.alpha = Math.min(0.85, p.baseAlpha + (1 - dist / ir) * 0.75);
          } else {
            p.alpha = p.baseAlpha;
          }
        } else {
          p.alpha = p.baseAlpha;
        }

        p.vx += (p.ox - p.x) * springK;
        p.vy += (p.oy - p.y) * springK;
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const stretch = Math.min(speed * 0.6, 6);
        const drawH = p.h + stretch;

        c.save();
        c.translate(p.x, p.y);
        const velAngle = speed > 0.5 ? Math.atan2(p.vy, p.vx) + Math.PI / 2 : p.rot;
        c.rotate(speed > 0.5 ? velAngle : p.rot);
        c.globalAlpha = p.alpha;
        c.fillStyle = p.color;

        const hw = p.w / 2;
        const hh = drawH / 2;
        const cr = hw;
        c.beginPath();
        c.moveTo(-hw + cr, -hh);
        c.lineTo(hw - cr, -hh);
        c.quadraticCurveTo(hw, -hh, hw, -hh + cr);
        c.lineTo(hw, hh - cr);
        c.quadraticCurveTo(hw, hh, hw - cr, hh);
        c.lineTo(-hw + cr, hh);
        c.quadraticCurveTo(-hw, hh, -hw, hh - cr);
        c.lineTo(-hw, -hh + cr);
        c.quadraticCurveTo(-hw, -hh, -hw + cr, -hh);
        c.closePath();
        c.fill();
        c.restore();
      }

      c.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(cvs);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [dotGap, interactionRadius, repulsionStrength, springK, damping, reduceMotion]);

  return (
    <section id="home" className={cn("relative isolate flex min-h-[90svh] items-center justify-center overflow-hidden pt-28 pb-20 bg-[var(--bg)]", className)}>
      <motion.canvas
        ref={canvasRef}
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? false : { opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text)] mb-4">
          <TextMaskReveal
            text={name}
            trigger={isLoaded}
            delay={0.05}
            stagger={0.08}
            duration={0.75}
            as="span"
          />
        </h1>

        <p className="text-xl sm:text-2xl font-semibold text-[var(--text-body)] mb-3">
          <TextMaskReveal
            text={role}
            trigger={isLoaded}
            delay={0.2}
            stagger={0.03}
            duration={0.7}
            as="span"
          />
        </p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? false : (isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 })}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)] mb-6"
        >
          <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
          <span>{location}</span>
        </motion.p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? false : (isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 })}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-10"
        >
          {summary}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? false : (isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 })}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <ShimmerButton
            id="hero-cv-btn"
            as="a"
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            innerClassName="px-8 py-3.5"
          >
            <Download className="w-4 h-4 text-white" />
            <span>{downloadText}</span>
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  );
}

export default DotGridHero;
