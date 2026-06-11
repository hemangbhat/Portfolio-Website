'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import Reveal from '../components/motion/Reveal';
import Section, { SectionHeading } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Chip from '../components/ui/Chip';
import CTA from '../components/ui/CTA';
import Tilt from '../components/ui/Tilt';
import { content, type Project } from '../content/content';
import { cn } from '../lib/cn';

function ProjectCard({ project }: { project: Project }) {
  const { title, tagline, summary, problem, result, tech, links, featured } = project;
  return (
    <Card featured={featured} className="flex h-full flex-col">
      {featured && (
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Spotlight case study
        </span>
      )}
      <div className={cn('flex flex-col gap-6', featured && 'lg:flex-row lg:gap-10')}>
        <div className={cn(featured && 'lg:w-1/2')}>
          <h3 className={cn('font-semibold tracking-tight text-fg', featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>
            {title}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">{tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{summary}</p>
        </div>
        <div className={cn('space-y-4', featured && 'lg:w-1/2')}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted/80">Problem</p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg/80">{problem}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted/80">Impact</p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg/80">{result}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {tech.map((t) => <Chip key={t} label={t} withLogo />)}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {links.map((l) => (
          <CTA key={l.label} label={l.label} href={l.href} external={l.external} variant="ghost"
            icon={<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />} />
        ))}
      </div>
    </Card>
  );
}

function CarouselDots({ total, selected }: { total: number; selected: number }) {
  return (
    <div className="flex items-center gap-2" aria-label="Carousel position">
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ width: i === selected ? 24 : 8, opacity: i === selected ? 1 : 0.35 }}
          transition={{ duration: 0.25 }}
          className="h-1.5 rounded-full bg-accent"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Projects() {
  const { projects } = content;
  const reduce = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    watchDrag: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Section id="projects" ariaLabel="Projects">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Things I've shipped"
            index="03"
            meta={`${projects.length} case studies`}
            description="Selected work where design, engineering, and measurable outcomes came together."
          />
          <div className="flex shrink-0 items-center gap-3">
            <CarouselDots total={projects.length} selected={selectedIndex} />
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Previous project"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/70 text-fg transition-all hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Next project"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/70 text-fg transition-all hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-10">
        <div
          ref={emblaRef}
          className="overflow-hidden"
          aria-label="Projects carousel"
          aria-roledescription="carousel"
        >
          <div className="flex gap-5" style={{ touchAction: 'pan-y' }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-[90%] lg:basis-[72%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${projects.length}: ${p.title}`}
              >
                {p.featured ? (
                  <Tilt className="h-full">
                    <ProjectCard project={p} />
                  </Tilt>
                ) : (
                  <ProjectCard project={p} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
