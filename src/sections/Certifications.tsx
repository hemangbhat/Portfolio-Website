'use client';

import { BadgeCheck } from 'lucide-react';
import Reveal from '../components/motion/Reveal';
import Section, { SectionHeading } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Chip from '../components/ui/Chip';
import { content } from '../content/content';

export default function Certifications() {
  const { certifications } = content;
  return (
    <Section id="certifications" ariaLabel="Certifications">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications"
        index="08"
        meta={`${certifications.length} certificates`}
        description="Placeholder cards — share your certificates and I'll drop them straight in."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={`${c.title}-${i}`} delay={i * 0.05} className="h-full">
            <Card className="flex h-full flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2/70">
                <BadgeCheck className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-fg">{c.title}</h3>
              <p className="mt-1 text-sm text-accent">{c.issuer}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{c.date}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
