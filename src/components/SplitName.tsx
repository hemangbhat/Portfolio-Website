'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap } from 'gsap';

interface SplitNameProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitName({ text, className, delay = 0.3 }: SplitNameProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduce) {
      // No animation — just make sure it's visible
      gsap.set(el, { opacity: 1 });
      return;
    }

    const split = new SplitType(el, { types: 'chars' });

    // Hide all chars immediately so there's no flash before the tween
    gsap.set(split.chars, { opacity: 0, y: 60, rotateX: -45 });

    gsap.to(split.chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.03,
      delay,
    });

    return () => {
      split.revert();
    };
  }, [text, delay, reduce]);

  return (
    <h1
      ref={ref}
      className={className}
      style={{ perspective: '600px' }}
    >
      {text}
    </h1>
  );
}
