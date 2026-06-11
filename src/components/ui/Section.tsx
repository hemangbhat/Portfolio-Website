import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionProps {
  id: string;
  as?: 'section' | 'header' | 'footer';
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  index?: string;
  meta?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  meta,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <div className="flex items-center gap-3">
        {index && (
          <span className="font-mono text-xs tabular-nums text-muted/70">{index}</span>
        )}
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        {meta && (
          <span className="ml-auto hidden font-mono text-[11px] tabular-nums text-muted/60 sm:block">
            {meta}
          </span>
        )}
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

export default function Section({ id, as = 'section', ariaLabel, className, children }: SectionProps) {
  const Tag = as;
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn('scroll-mt-24 px-5 py-16 sm:px-8 md:py-24', className)}
    >
      <div className="mx-auto w-full max-w-content">{children}</div>
    </Tag>
  );
}
