'use client';

import Reveal from '../components/motion/Reveal';
import Section, { SectionHeading } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { content } from '../content/content';

export default function About() {
  const { lead, paragraphs, principles } = content.about;

  return (
    <Section id="about" ariaLabel="About">
      <SectionHeading eyebrow="About" title="How I think about building" index="01" meta="Profile" />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <p className="text-balance text-2xl font-light leading-snug text-fg sm:text-3xl">
            {lead}
          </p>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="space-y-4 lg:col-span-2">
          {principles.map((pr, i) => (
            <Reveal key={pr.title} delay={i * 0.06}>
              <Card>
                <h3 className="text-sm font-semibold text-fg">{pr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pr.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
