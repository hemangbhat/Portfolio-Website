'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { WritingEntry } from '../content/content';

interface NoteModalProps {
  note: WritingEntry | null;
  tags?: string[];
  onClose: () => void;
}

export default function NoteModal({ note, tags = [], onClose }: NoteModalProps) {
  useEffect(() => {
    if (!note) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // lock body scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [note, onClose]);

  return (
    <AnimatePresence>
      {note && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={note.title}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-bg/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.article
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border bg-surface shadow-lift sm:rounded-3xl"
          >
            {/* accent top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-accent via-accent to-fuchsia-400" aria-hidden="true" />

            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((t) => (
                    <span key={t} className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {t}
                    </span>
                  ))}
                  {note.readTime && (
                    <span className="text-xs text-muted">{note.readTime}</span>
                  )}
                </div>
                <h2 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight text-fg sm:text-3xl">
                  {note.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close note"
                className="shrink-0 rounded-full border border-border bg-surface-2/70 p-2 text-muted transition-colors hover:border-accent/50 hover:text-fg"
                autoFocus
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8" data-lenis-prevent>
              {(note.body && note.body.length > 0 ? note.body : [note.summary]).map((p, i) => (
                <p key={i} className="mb-4 text-base leading-relaxed text-fg/85 last:mb-0">
                  {p}
                </p>
              ))}
            </div>

            <div className="border-t border-border px-6 py-4 text-xs text-muted/70 sm:px-8">
              Press <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5">Esc</kbd> or click outside to close
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
