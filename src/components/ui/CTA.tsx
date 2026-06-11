import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface CTAProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
  icon?: ReactNode;
  className?: string;
}

const variants: Record<NonNullable<CTAProps['variant']>, string> = {
  primary:
    'bg-accent text-white shadow-soft hover:shadow-glow hover:brightness-110',
  secondary:
    'border border-border bg-surface/60 text-fg hover:border-accent/50 hover:bg-surface',
  ghost: 'text-muted hover:text-fg',
};

export default function CTA({
  label,
  href,
  variant = 'secondary',
  external = false,
  icon,
  className,
}: CTAProps) {
  const rel = external ? 'noopener noreferrer' : undefined;
  const target = external ? '_blank' : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200',
        variants[variant],
        className
      )}
    >
      {icon && <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>}
      {label}
    </a>
  );
}
