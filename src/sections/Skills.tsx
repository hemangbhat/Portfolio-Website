'use client';

import Reveal from '../components/motion/Reveal';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Chip from '../components/ui/Chip';
import ToolkitMarquee from '../components/ToolkitMarquee';
import { content } from '../content/content';

export default function Skills() {
  const { skills, toolkit } = content;
  return (
    <Section id="skills" ariaLabel="Skills and toolkit">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-muted/70">04</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Toolkit</span>
          <span className="ml-auto hidden font-mono text-[11px] tabular-nums text-muted/60 sm:block">
            {toolkit.length} tools
          </span>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Technical <span className="font-serif font-normal italic text-accent">toolkit</span>
        </h2>
      </Reveal>

      <div className="mt-10">
        <ToolkitMarquee items={toolkit} />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.05} className="h-full">
            <Card className="h-full">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <Chip key={s} label={s} withLogo />
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
