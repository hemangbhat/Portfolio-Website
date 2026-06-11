'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface CardProps {
  featured?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Card({ featured = false, className, children }: CardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      data-featured={featured ? 'true' : undefined}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border p-6 transition-shadow duration-300 sm:p-7',
        'border-border bg-surface/70 shadow-soft hover:shadow-lift',
        featured &&
          'border-accent/40 bg-gradient-to-br from-surface to-surface-2 shadow-glow hover:shadow-glow',
        className
      )}
    >
      {/* cursor-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgb(var(--color-accent) / 0.14), transparent 70%)',
        }}
        aria-hidden="true"
      />
      {featured && (
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
