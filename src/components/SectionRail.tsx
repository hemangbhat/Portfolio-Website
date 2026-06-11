'use client';

import { SECTIONS } from '../content/sections';
import { scrollToSection } from './SmoothScroll';
import { cn } from '../lib/cn';

export default function SectionRail({ activeId }: { activeId: string }) {
  const total = String(SECTIONS.length).padStart(2, '0');
  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === activeId));

  return (
    <nav
      aria-label="Section quick navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
    >
      <span className="mb-2 font-mono text-[10px] tabular-nums text-muted/60">
        {String(activeIndex + 1).padStart(2, '0')}<span className="text-muted/30"> / {total}</span>
      </span>
      {SECTIONS.map((s, i) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={active ? 'true' : undefined}
            className="group flex items-center gap-2.5 py-0.5"
          >
            <span
              className={cn(
                'font-mono text-[10px] tabular-nums transition-all duration-300',
                active ? 'text-accent opacity-100' : 'text-muted opacity-0 group-hover:opacity-70'
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                'h-px transition-all duration-300',
                active
                  ? 'w-8 bg-accent'
                  : 'w-4 bg-border group-hover:w-6 group-hover:bg-muted'
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </nav>
  );
}
