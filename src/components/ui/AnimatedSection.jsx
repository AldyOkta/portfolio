import { motion, useReducedMotion } from 'framer-motion';

const presets = {
  'fade-up': {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
  },
  'fade-down': {
    initial: { opacity: 0, y: -20 },
    whileInView: { opacity: 1, y: 0 },
  },
  'fade-left': {
    initial: { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
  },
  'fade-right': {
    initial: { opacity: 0, x: 24 },
    whileInView: { opacity: 1, x: 0 },
  },
  'scale-in': {
    initial: { opacity: 0, scale: 0.96 },
    whileInView: { opacity: 1, scale: 1 },
  },
  'blur-in': {
    initial: { opacity: 0, filter: 'blur(6px)' },
    whileInView: { opacity: 1, filter: 'blur(0px)' },
  },
};

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.5,
  className = '',
  as = 'div',
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const preset = presets[animation] || presets['fade-up'];
  const Component = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className} {...props}>{children}</Tag>;
  }

  return (
    <Component
      {...preset}
      viewport={{ once: true, margin: '100px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // smooth ease-out
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
