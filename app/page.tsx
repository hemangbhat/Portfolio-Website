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
import Quote from '@/sections/Quote';
import Highlights from '@/sections/Highlights';
import About from '@/sections/About';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import ProblemSolving from '@/sections/ProblemSolving';
import Writing from '@/sections/Writing';
import Education from '@/sections/Education';
import Certifications from '@/sections/Certifications';
import Contact from '@/sections/Contact';

function Page() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(ids);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <PageReveal />
      <ScrollProgress />
      <Navbar activeId={activeId} />
      <SectionRail activeId={activeId} />
      <main>
        <Hero />
        <Quote />
        <Highlights />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <ProblemSolving />
        <Writing />
        <Education />
        <Certifications />
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
