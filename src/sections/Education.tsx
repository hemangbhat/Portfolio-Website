import Reveal from '../components/motion/Reveal';
import Section, { SectionHeading } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { content } from '../content/content';

export default function Education() {
  const { education, positions, awards } = content.credentials;

  return (
    <Section id="education" ariaLabel="Education, positions and awards">
      <SectionHeading
        eyebrow="Education & Recognition"
        title="Background & honors"
        index="07"
        meta={`${education.length} schools · ${awards.length} awards`}
        description="Academics, leadership, and a few results I'm proud of."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Education */}
        <Reveal className="h-full lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Education</h3>
            <ul className="mt-5 space-y-5">
              {education.map((e) => (
                <li
                  key={e.title}
                  className="flex flex-col gap-1 border-b border-border pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-fg">{e.title}</p>
                    <p className="text-sm text-muted">{e.org}</p>
                  </div>
                  <div className="text-sm text-muted sm:text-right">
                    <p>{e.duration}</p>
                    <p className="font-medium text-accent">{e.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        {/* Awards + Positions */}
        <Reveal delay={0.05} className="h-full">
          <Card className="flex h-full flex-col gap-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Awards</h3>
              <ul className="mt-4 space-y-2.5">
                {awards.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {positions.map((p) => (
              <div key={p.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {p.title} · {p.org}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
