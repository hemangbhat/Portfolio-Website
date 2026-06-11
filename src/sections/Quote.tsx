import Reveal from '../components/motion/Reveal';
import { content } from '../content/content';

export default function Quote() {
  return (
    <section id="quote" aria-label="Philosophy" className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">
            <span className="select-none font-serif text-5xl leading-none text-accent/70" aria-hidden="true">
              “
            </span>
          </p>
          <blockquote className="mt-2 text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-fg sm:text-4xl md:text-5xl">
            {content.quote}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
