import { motion, useReducedMotion } from 'framer-motion';

export default function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
  delay = 0,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '100px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className = '', as = 'div' }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </Component>
  );
}
