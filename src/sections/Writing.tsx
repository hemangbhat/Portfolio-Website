'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import Reveal from '../components/motion/Reveal';
import Section, { SectionHeading } from '../components/ui/Section';
import Card from '../components/ui/Card';
import NoteModal from '../components/NoteModal';
import { content, type WritingEntry } from '../content/content';
import { ArrowIcon } from '../components/ui/icons';
import { cn } from '../lib/cn';

const TAGS = ['All', 'AI/ML', 'Systems', 'DSA', 'Product'] as const;

const TAG_MAP: Record<string, string[]> = {
  'Keeping Tenant Data Inside the Boundary': ['AI/ML', 'Systems'],
  'Designing AI Agents That Actually Ship': ['AI/ML'],
  'From Brute Force to Intuition': ['DSA'],
  'Explainability Is a Feature, Not an Afterthought': ['AI/ML'],
};

export default function Writing() {
  const { writing } = content;
  const [active, setActive] = useState<string>('All');
  const [openNote, setOpenNote] = useState<WritingEntry | null>(null);
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 280 });

  const filtered =
    active === 'All'
      ? writing
      : writing.filter((w) => (TAG_MAP[w.title] ?? []).includes(active));

  return (
    <Section id="writing" ariaLabel="Writing and thoughts">
      <SectionHeading
        eyebrow="Writing"
        title="Thoughts & notes"
        index="06"
        meta={`${writing.length} notes`}
        description="Short pieces on the things I build and the way I think about engineering."
      />

      {/* filter tabs */}
      <Reveal>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter writing by topic">
          {TAGS.map((tag) => (
            <button
              key={tag}
              role="tab"
              aria-selected={active === tag}
              onClick={() => setActive(tag)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                active === tag
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-surface/60 text-muted hover:border-accent/40 hover:text-fg'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </Reveal>

      {/* auto-animated grid — items slide in/out smoothly */}
      <div ref={parent} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map((w) => (
          <button
            key={w.title}
            type="button"
            onClick={() => setOpenNote(w)}
            aria-label={`Read note: ${w.title}`}
            className="group/note rounded-3xl text-left outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <Card className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-1.5">
                {(TAG_MAP[w.title] ?? []).map((t) => (
                  <span key={t} className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {t}
                  </span>
                ))}
                {w.readTime && <span className="text-[11px] text-muted/80">{w.readTime}</span>}
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-fg">{w.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{w.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read note
                <ArrowIcon
                  width={15}
                  height={15}
                  className="transition-transform duration-200 group-hover/note:translate-x-1"
                />
              </span>
            </Card>
          </button>
        ))}
      </div>

      <NoteModal
        note={openNote}
        tags={openNote ? TAG_MAP[openNote.title] ?? [] : []}
        onClose={() => setOpenNote(null)}
      />
    </Section>
  );
}
