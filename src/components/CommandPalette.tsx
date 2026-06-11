'use client';

import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Search, Hash, Sun, Moon, Mail, FileText } from 'lucide-react';
import { SECTIONS } from '../content/sections';
import { scrollToSection } from './SmoothScroll';
import { useTheme } from '../theme/ThemeProvider';
import { content } from '../content/content';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const run = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[80] bg-bg/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="palette"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-[18vh] z-[90] w-full max-w-lg -translate-x-1/2 px-4"
            >
              <Command
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lift"
                label="Command palette"
              >
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <Command.Input
                    autoFocus
                    placeholder="Search sections, actions…"
                    className="flex-1 bg-transparent text-sm text-fg placeholder:text-muted/60 outline-none"
                  />
                  <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted sm:block">ESC</kbd>
                </div>
                <Command.List className="max-h-72 overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-muted">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigate">
                    {SECTIONS.map((s) => (
                      <Command.Item
                        key={s.id}
                        value={s.label}
                        onSelect={() => run(() => scrollToSection(s.id))}
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg/90 outline-none aria-selected:bg-surface-2 aria-selected:text-fg"
                      >
                        <Hash className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                        {s.label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Actions">
                    <Command.Item
                      value="toggle theme"
                      onSelect={() => run(toggleTheme)}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg/90 outline-none aria-selected:bg-surface-2 aria-selected:text-fg"
                    >
                      {theme === 'dark'
                        ? <Sun className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                        : <Moon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
                      Switch to {theme === 'dark' ? 'light' : 'dark'} theme
                    </Command.Item>
                    <Command.Item
                      value="email contact"
                      onSelect={() => run(() => { window.location.href = `mailto:${content.contact.email}`; })}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg/90 outline-none aria-selected:bg-surface-2 aria-selected:text-fg"
                    >
                      <Mail className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      Send email
                    </Command.Item>
                    <Command.Item
                      value="resume download"
                      onSelect={() => run(() => { window.open('#', '_blank'); })}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg/90 outline-none aria-selected:bg-surface-2 aria-selected:text-fg"
                    >
                      <FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      Open resume
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className="border-t border-border px-4 py-2 text-[10px] text-muted/60 flex items-center justify-between">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                  <span>esc close</span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hint button in navbar — wired externally */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette (⌘K)"
        className="hidden items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg md:inline-flex"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <kbd className="font-mono">⌘K</kbd>
      </button>
    </>
  );
}
