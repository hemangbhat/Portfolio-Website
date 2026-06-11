'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { MoonIcon, SunIcon } from '../components/ui/icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // Defer rendering the icon until after hydration so server and client
  // always agree on the initial HTML (both render nothing until mounted).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-surface/60 text-fg transition-colors hover:border-accent/50 hover:text-accent"
      suppressHydrationWarning
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: 12, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="absolute inline-flex"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
