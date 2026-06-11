import Reveal from '../components/motion/Reveal';
import Section, { SectionHeading } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Chip from '../components/ui/Chip';
import { content } from '../content/content';

export default function Experience() {
  const { experience } = content;
  return (
    <Section id="experience" ariaLabel="Experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built"
        index="02"
        meta={`${experience.length} roles`}
        description="Roles where I shipped real work — from AI agents in production to leading technical communities."
      />

      <div className="mt-12 space-y-5">
        {experience.map((entry, i) => (
          <Reveal key={`${entry.organization}-${entry.role}`} delay={i * 0.05}>
            <Card>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tabular-nums text-muted/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-fg">{entry.role}</h3>
                    <p className="mt-0.5 text-accent">
                      {entry.organization}
                      {entry.location && <span className="text-muted"> · {entry.location}</span>}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{entry.duration}</span>
              </div>

              <ul className="mt-5 space-y-2.5 sm:pl-8">
                {entry.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 text-sm leading-relaxed text-fg/75">
                    <span className="mt-0.5 shrink-0 font-medium text-accent" aria-hidden="true">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2 sm:pl-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/50">
                  Stack
                </span>
                {entry.tech.map((t) => (
                  <Chip key={t} label={t} withLogo />
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
