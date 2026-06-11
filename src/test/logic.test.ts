import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { resolveInitialTheme, nextTheme } from '../theme/theme';
import { selectActiveSection, type SectionVisibility } from '../hooks/scrollSpy';
import { columnsFor, isMobileNav, MOBILE_BREAKPOINT } from '../lib/responsive';
import { contrastRatio, type RGB } from '../lib/contrast';

describe('theme resolution', () => {
  it('Property 4: resolves stored values, defaults to dark otherwise', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        const r = resolveInitialTheme(s);
        if (s === 'light') return r === 'light';
        if (s === 'dark') return r === 'dark';
        return r === 'dark';
      })
    );
    expect(resolveInitialTheme(null)).toBe('dark');
  });

  it('Property 5: nextTheme is an involution', () => {
    fc.assert(
      fc.property(fc.constantFrom('dark' as const, 'light' as const), (t) => {
        return nextTheme(t) !== t && nextTheme(nextTheme(t)) === t;
      })
    );
  });
});

describe('scroll spy selection', () => {
  const entry = fc.record({
    id: fc.string({ minLength: 1 }),
    ratio: fc.float({ min: 0, max: 1, noNaN: true }),
    top: fc.integer({ min: -2000, max: 2000 }),
  });

  it('Property 2: returns exactly one id from the provided set', () => {
    fc.assert(
      fc.property(fc.array(entry, { minLength: 1, maxLength: 12 }), (entries: SectionVisibility[]) => {
        const ids = new Set(entries.map((e) => e.id));
        const active = selectActiveSection(entries);
        return ids.has(active);
      })
    );
  });
});

describe('responsive columns', () => {
  it('Property 17: 1 column below breakpoint, >1 at/above', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        fc.integer({ min: 2, max: 6 }),
        (width, max) => {
          const cols = columnsFor(width, max);
          if (width < MOBILE_BREAKPOINT) return cols === 1;
          return cols > 1 && cols <= max;
        }
      )
    );
    expect(isMobileNav(500)).toBe(true);
    expect(isMobileNav(900)).toBe(false);
  });
});

describe('contrast tokens', () => {
  const dark = { bg: [8, 8, 11] as RGB, fg: [244, 244, 245] as RGB };
  const light = { bg: [250, 250, 251] as RGB, fg: [17, 17, 19] as RGB };

  it('Property 7: body text meets WCAG AA (>= 4.5:1) in both themes', () => {
    expect(contrastRatio(dark.fg, dark.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(light.fg, light.bg)).toBeGreaterThanOrEqual(4.5);
  });
});
