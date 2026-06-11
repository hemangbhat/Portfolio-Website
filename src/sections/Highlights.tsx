import Reveal from '../components/motion/Reveal';
import Card from '../components/ui/Card';
import Metric from '../components/ui/Metric';
import { content } from '../content/content';

export default function Highlights() {
  const { highlights } = content;
  return (
    <section
      id="highlights"
      aria-label="Impact highlights"
      className="scroll-mt-24 px-5 py-12 sm:px-8 md:py-16"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05} className="h-full">
              <Card className="h-full">
                <Metric value={m.value} label={m.label} detail={m.detail} />
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
