'use client';

import { motion, useReducedMotion } from 'framer-motion';
import TechLogo from './ui/TechLogo';

function Row({ items, reverse = false, duration = 32 }: { items: string[]; reverse?: boolean; duration?: number }) {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-3"
        animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-fg/90 shadow-soft transition-colors hover:border-accent/50 hover:text-fg"
          >
            <TechLogo name={item} className="h-4 w-4 shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ToolkitMarquee({ items }: { items: string[] }) {
  const mid = Math.ceil(items.length / 2);
  const top = items.slice(0, mid);
  const bottom = items.slice(mid);
  return (
    <div className="space-y-3">
      <Row items={top} duration={34} />
      <Row items={bottom} reverse duration={40} />
    </div>
  );
}
