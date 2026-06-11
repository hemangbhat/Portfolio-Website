'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SECTIONS } from '../content/sections';
import { cn } from '../lib/cn';
import ThemeToggle from '../theme/ThemeToggle';
import { CloseIcon, MenuIcon } from './ui/icons';
import { scrollToSection } from './SmoothScroll';
import CommandPalette from './CommandPalette';

interface NavbarProps {
  activeId: string;
}

export default function Navbar({ activeId }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <CommandPalette />
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          aria-label="Section navigation"
          className={cn(
            'mx-auto flex max-w-content items-center justify-between px-5 transition-all duration-300 sm:px-8',
            scrolled ? 'py-3' : 'py-5'
          )}
        >
          <div
            className={cn(
              'absolute inset-0 -z-10 transition-opacity duration-300',
              scrolled
                ? 'border-b border-border/70 bg-bg/70 opacity-100 backdrop-blur-xl'
                : 'opacity-0'
            )}
            aria-hidden="true"
          />

          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}
            className="font-serif text-lg font-medium tracking-tight text-fg"
          >
            Hemang<span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => {
              const active = s.id === activeId;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active ? 'true' : undefined}
                    onClick={(e) => { e.preventDefault(); handleNavigate(s.id); }}
                    className={cn(
                      'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                      active ? 'text-fg' : 'text-muted hover:text-fg'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2 ring-1 ring-border"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* ⌘K hint — CommandPalette renders its own button */}
            <div id="cmd-palette-trigger" />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-fg md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-4 overflow-hidden rounded-2xl border border-border bg-surface/95 p-2 shadow-lift backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {SECTIONS.map((s) => {
                  const active = s.id === activeId;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={active ? 'true' : undefined}
                        onClick={(e) => { e.preventDefault(); handleNavigate(s.id); }}
                        className={cn(
                          'block rounded-xl px-4 py-3 text-sm transition-colors',
                          active ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg'
                        )}
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
