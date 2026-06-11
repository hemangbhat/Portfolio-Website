'use client';

import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import Reveal from '../components/motion/Reveal';
import CTA from '../components/ui/CTA';
import { content } from '../content/content';
import { iconFor } from '../components/ui/icons';

export default function Contact() {
  const { closing, email, locations, socials } = content.contact;
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'someone'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ''}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    toast.success('Opening your mail client…', {
      description: `Message to ${email} is ready to send.`,
      duration: 4000,
    });
    setName('');
    setFrom('');
    setMessage('');
  };

  return (
    <section id="contact" aria-label="Contact" className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-content">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-medium leading-tight tracking-tight text-fg sm:text-5xl">
            Let&apos;s build something <span className="italic text-accent">intelligent.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: info */}
          <Reveal className="space-y-5">
            <p className="max-w-md text-base leading-relaxed text-muted">{closing}</p>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-5 shadow-soft transition-colors hover:border-accent/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2/70 text-accent">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">Email</span>
                <span className="mt-0.5 block font-medium text-fg">{email}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-5 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2/70 text-accent">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">Location</span>
                {locations.map((l) => (
                  <span key={l} className="mt-0.5 block font-medium text-fg">{l}</span>
                ))}
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-fg">Social profiles</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <CTA key={s.label} label={s.label} href={s.href} external={s.external} variant="secondary" icon={iconFor(s.kind)} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-surface/70 p-6 shadow-soft sm:p-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium text-fg">Your name</label>
                  <input
                    id="c-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                    className="mt-2 w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-sm font-medium text-fg">Your email</label>
                  <input
                    id="c-email"
                    type="email"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="jane@example.com"
                    className="mt-2 w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>
                <div>
                  <label htmlFor="c-msg" className="block text-sm font-medium text-fg">Your message</label>
                  <textarea
                    id="c-msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Hi Hemang, I'd love to talk about…"
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition-all hover:shadow-glow hover:brightness-110"
                >
                  Send message <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <figure className="mx-auto mt-20 max-w-2xl border-t border-border pt-12 text-center">
            <blockquote className="text-balance font-serif text-xl italic leading-relaxed text-fg/80 sm:text-2xl">
              {content.closingQuote.text}
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              — {content.closingQuote.author}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
