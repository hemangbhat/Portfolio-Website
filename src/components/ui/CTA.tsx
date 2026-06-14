import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface CTAProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const variants: Record<NonNullable<CTAProps['variant']>, string> = {
  primary:
    'px-5 py-2.5 bg-accent text-white shadow-soft hover:shadow-glow hover:brightness-110',
  secondary:
    'px-5 py-2.5 border border-border bg-surface/60 text-fg hover:border-accent/50 hover:bg-surface',
  ghost: 'px-5 py-2.5 text-muted hover:text-fg',
  icon: 'h-10 w-10 justify-center border border-border bg-surface/60 text-muted hover:border-accent/50 hover:text-fg',
};

export default function CTA({
  label,
  href,
  variant = 'secondary',
  external = false,
  icon,
  className,
  onClick,
}: CTAProps) {
  const rel = external ? 'noopener noreferrer' : undefined;
  const target = external ? '_blank' : undefined;
  const iconOnly = variant === 'icon';

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
      aria-label={iconOnly ? label : undefined}
      title={iconOnly ? label : undefined}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200',
        'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        variants[variant],
        className
      )}
    >
      {icon && (
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>
      )}
      {!iconOnly && label}
    </a>
  );
}
