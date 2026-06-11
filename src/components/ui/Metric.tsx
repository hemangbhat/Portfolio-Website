'use client';

import { useEffect, useRef, useState } from 'react';
import NumberFlow from '@number-flow/react';
import { useInView, useReducedMotion } from 'framer-motion';

interface MetricProps {
  value: string;
  label: string;
  detail?: string;
}

/** Split "94.25%" -> { prefix:'', num:94.25, suffix:'%' } so NumberFlow can roll the digits. */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return { prefix: '', num: null as number | null, suffix: value };
  const [, prefix, rawNum, suffix] = match;
  return { prefix, num: parseFloat(rawNum.replace(/,/g, '')), suffix };
}

export default function Metric({ value, label, detail }: MetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const { prefix, num, suffix } = parse(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (num === null || reduce) return;
    if (inView) setDisplay(num);
  }, [inView, num, reduce]);

  return (
    <div className="flex h-full flex-col">
      <span
        ref={ref}
        className="flex items-baseline font-serif text-4xl font-medium tracking-tight text-fg sm:text-5xl"
      >
        {num === null ? (
          value
        ) : (
          <>
            {prefix}
            {reduce ? (
              <span>{num}</span>
            ) : (
              <NumberFlow
                value={display}
                format={{ maximumFractionDigits: 2 }}
                transformTiming={{ duration: 900, easing: 'ease-out' }}
              />
            )}
            {suffix}
          </>
        )}
      </span>
      <span className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-fg/90">{label}</span>
      {detail && <span className="mt-1.5 text-sm leading-relaxed text-muted">{detail}</span>}
    </div>
  );
}
