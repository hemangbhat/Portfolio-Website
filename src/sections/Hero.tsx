'use client';

import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import { content } from '../content/content';
import CTA from '../components/ui/CTA';
import Typewriter from '../components/ui/Typewriter';
import Aurora from '../components/ui/Aurora';
import SplitName from '../components/SplitName';
import Magnetic from '../components/ui/Magnetic';
import { scrollToSection } from '../components/SmoothScroll';
import { iconFor } from '../components/ui/icons';

// R3F canvas — lazy-loaded so it doesn't block the hero paint
const HeroCanvas = dynamic(() => import('../components/HeroCanvas'), { ssr: false });

export default function Hero() {
  const { name, roles, positioning, bio, availability, trust, ctas } = content.hero;
  const reduce = useReducedMotion();

  const resume = ctas.find((c) => c.kind === 'resume');
  const socials = ctas.filter((c) => c.kind && ['github', 'linkedin', 'email'].includes(c.kind));

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
  };

  return (
    <header
      id="home"
      className="relative isolate flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden px-5 pt-28 sm:px-8"
    >
      <Aurora />
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-content">
        {/* Availability badge — fades in first */}
        <motion.span
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {availability}
        </motion.span>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-muted"
        >
          Hello, I&apos;m
        </motion.p>

        {/* SplitType character reveal — each char falls in */}
        <SplitName
          text={name}
          delay={0.3}
          className="mt-2 max-w-4xl overflow-hidden font-serif text-display font-medium tracking-tight text-fg"
        />

        {/* Everything below staggered via Framer Motion */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={item} className="mt-4 flex items-center text-lg font-medium text-accent sm:text-xl">
            <span className="text-muted">A&nbsp;</span>
            <Typewriter words={roles} />
          </motion.p>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-balance text-2xl font-light leading-snug text-fg/90 sm:text-3xl"
          >
            {positioning}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {bio}
          </motion.p>

          {/* Trust strip — quick credibility signal */}
          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted"
          >
            {trust.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden="true" />}
                <span className="font-medium text-fg/80">{t}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            {/* Primary action */}
            <Magnetic>
              <CTA
                label="View work"
                href="#projects"
                variant="primary"
                icon={<ArrowDown className="h-4 w-4" aria-hidden="true" />}
                onClick={() => scrollToSection('projects')}
                className="cursor-pointer"
              />
            </Magnetic>

            {/* Strong secondary */}
            {resume && (
              <Magnetic>
                <CTA
                  label="Resume"
                  href={resume.href}
                  external={resume.external}
                  variant="secondary"
                  icon={iconFor('resume')}
                />
              </Magnetic>
            )}

            {/* Socials demoted to compact icon buttons */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <Magnetic key={s.label}>
                  <CTA
                    label={s.label}
                    href={s.href}
                    external={s.external}
                    variant="icon"
                    icon={iconFor(s.kind)}
                  />
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
