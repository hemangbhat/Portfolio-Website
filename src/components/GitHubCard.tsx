'use client';

import { ArrowRight } from 'lucide-react';
import { GitHubIcon } from './ui/icons';
import { buildHeatmap } from '../lib/heatmap';
import { content } from '../content/content';

const LEVELS = [
  'bg-surface-2',
  'bg-accent/30',
  'bg-accent/50',
  'bg-accent/75',
  'bg-accent',
];

export default function GitHubCard() {
  const { username, url, windowLabel, contributions } = content.github;
  const grid = buildHeatmap(26, 7, 11);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/70 p-6 shadow-soft sm:p-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          GitHub
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
        >
          @{username} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-6 flex gap-1 overflow-hidden" aria-hidden="true">
        {grid.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {col.map((lvl, ri) => (
              <span key={ri} className={`h-3 w-3 rounded-[3px] ${LEVELS[lvl]}`} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <GitHubIcon width={16} height={16} /> {windowLabel}
        </span>
        <span className="font-medium text-fg">{contributions} contributions</span>
      </div>
    </div>
  );
}
