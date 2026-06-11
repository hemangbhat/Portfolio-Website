'use client';

import { cn } from '../../lib/cn';

/**
 * Premium aurora / gradient background. Soft, slow-moving color fields with a
 * faint noise overlay for depth. Tuned to read on the dark (primary) theme and
 * stay tasteful on light. Purely decorative.
 */
export default function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)} aria-hidden="true">
      <div className="absolute -left-1/4 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-indigo-500/25 blur-[130px] animate-aurora-1 dark:bg-indigo-500/40" />
      <div className="absolute right-[-10%] top-1/4 h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/15 blur-[120px] animate-aurora-2 dark:bg-fuchsia-500/25" />
      <div className="absolute bottom-[-15%] left-1/3 h-[32rem] w-[32rem] rounded-full bg-sky-500/15 blur-[120px] animate-aurora-3 dark:bg-sky-400/25" />
      {/* readability vignette so text stays crisp over the glow */}
      <div className="absolute inset-0 bg-bg/20 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]" />
      {/* fine grain noise */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay dark:opacity-[0.10] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>')]" />
    </div>
  );
}
