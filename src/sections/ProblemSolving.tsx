'use client';

import { Trophy, ExternalLink } from 'lucide-react';
import Reveal from '../components/motion/Reveal';
import Section, { SectionHeading } from '../components/ui/Section';
import GitHubCard from '../components/GitHubCard';
import DSADonut from '../components/DSADonut';
import { buildHeatmap } from '../lib/heatmap';
import { content } from '../content/content';

const HEAT = ['bg-surface-2', 'bg-emerald-500/30', 'bg-emerald-500/55', 'bg-emerald-500/80', 'bg-emerald-400'];

export default function ProblemSolving() {
  const d = content.dsa;
  const grid = buildHeatmap(40, 7, 23);

  const stats = [
    { label: 'Max Rating', value: d.rating.toLocaleString() },
    { label: 'Level', value: d.level },
    { label: 'Global Ranking', value: d.ranking },
    { label: 'Contests', value: String(d.contests) },
  ];

  const segments = [
    { label: 'Easy', value: d.easy[0], color: '#34d399' },
    { label: 'Medium', value: d.medium[0], color: '#fbbf24' },
    { label: 'Hard', value: d.hard[0], color: '#fb7185' },
  ];

  const breakdown = [
    { label: 'Easy', solved: d.easy[0], total: d.easy[1], color: 'text-emerald-400' },
    { label: 'Medium', solved: d.medium[0], total: d.medium[1], color: 'text-amber-400' },
    { label: 'Hard', solved: d.hard[0], total: d.hard[1], color: 'text-rose-400' },
  ];

  return (
    <Section id="problem-solving" ariaLabel="Problem solving and open source">
      <SectionHeading
        eyebrow="Problem Solving"
        title="Data Structures & Algorithms"
        index="05"
        meta={`${d.solved}+ solved`}
        description="Consistent practice and open-source momentum — the habit behind the engineering."
      />

      {/* GitHub card */}
      <div className="mt-12">
        <Reveal>
          <GitHubCard />
        </Reveal>
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="rounded-2xl border border-border bg-surface/70 p-5 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{s.label}</p>
              <p className="mt-2 font-serif text-2xl font-medium text-fg">{s.value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Overview + submissions */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="flex h-full flex-col items-center gap-6 rounded-3xl border border-border bg-surface/70 p-6 shadow-soft sm:flex-row">
            <DSADonut solved={d.solved} total={d.total} segments={segments} />
            <ul className="w-full space-y-2.5">
              {breakdown.map((b) => (
                <li key={b.label} className="flex items-center justify-between rounded-xl bg-surface-2/60 px-3.5 py-2.5 text-sm">
                  <span className={`font-medium ${b.color}`}>{b.label}</span>
                  <span className="text-muted">
                    <span className="font-semibold text-fg">{b.solved}</span>/{b.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-3">
          <div className="flex h-full flex-col rounded-3xl border border-border bg-surface/70 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm">
                <span className="font-semibold text-fg">{d.submissions}+</span>{' '}
                <span className="text-muted">submissions in the past year</span>
              </p>
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                View profile <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-5 flex flex-1 items-center gap-1 overflow-hidden" aria-hidden="true">
              {grid.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-1">
                  {col.map((lvl, ri) => (
                    <span key={ri} className={`h-3 w-3 rounded-[3px] ${HEAT[lvl]}`} />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> Active days: {d.activeDays}
              </span>
              <span>Max streak: {d.maxStreak} days</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
