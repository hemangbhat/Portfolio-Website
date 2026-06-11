import { cn } from '../../lib/cn';
import { getTechIcon } from './TechLogo';

interface ChipProps {
  label: string;
  className?: string;
  /** Show a brand logo before the label when one exists. */
  withLogo?: boolean;
}

export default function Chip({ label, className, withLogo = false }: ChipProps) {
  const icon = withLogo ? getTechIcon(label, 'h-3.5 w-3.5 shrink-0') : null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/50 hover:text-fg',
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}
