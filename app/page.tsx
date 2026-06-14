'use client';

import { useMemo } from 'react';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { SECTIONS } from '@/content/sections';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SectionRail from '@/components/SectionRail';
import PageReveal from '@/components/PageReveal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import Highlights from '@/sections/Highlights';
import About from '@/sections/About';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import ProblemSolving from '@/sections/ProblemSolving';
import Education from '@/sections/Education';
import Contact from '@/sections/Contact';

function Page() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(ids);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only z-[200] rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Skip to content
      </a>
      <PageReveal />
      <ScrollProgress />
      <Navbar activeId={activeId} />
      <SectionRail activeId={activeId} />
      <main id="main">
        <Hero />
        <Highlights />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <ProblemSolving />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <Page />
      </SmoothScroll>
    </ThemeProvider>
  );
}
