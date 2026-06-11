# Design Document

## Overview

The Portfolio_Site is a single-page React application built with Vite, TypeScript, Tailwind CSS, and Framer Motion. It renders one long vertical-scroll experience composed of independent Section components, fronted by a sticky Navbar with smooth anchor scrolling and active-section highlighting, and themed by a dark-default light/dark toggle persisted to `localStorage`.

The architecture separates four concerns:

1. **Content** — a centralized, typed data module of Placeholder_Token values. No Section component hardcodes owner-specific strings.
2. **Presentation** — reusable primitives (`Card`, `Chip`, `Metric`, `CTA`, `Section`, `Reveal`) composed into Section components.
3. **Behavior** — pure logic units for theme resolution, scroll-spy active-section selection, and responsive column decisions, isolated from the DOM so they are unit/property testable.
4. **Theming & Motion** — Tailwind `class`-strategy dark mode driven by a `<html>` class, design tokens defined once and consumed by Tailwind config, and Framer Motion variants for scroll reveal and hover lift.

This separation lets the visual layer stay declarative while the testable logic (theme toggle, scroll spy, breakpoints, contrast) lives in pure functions.

## Architecture

### High-Level Structure

```
index.html  (single root, <html> carries theme class)
  └─ <App>
       ├─ <ThemeProvider>            // resolves + persists theme, sets <html> class
       │    └─ <Navbar>              // sticky, section links, scroll spy, ThemeToggle
       │    └─ <main>
       │         ├─ <Hero      id="home">
       │         ├─ <Quote     id="quote">
       │         ├─ <Highlights id="highlights">
       │         ├─ <Experience id="experience">
       │         ├─ <Skills     id="skills">
       │         ├─ <Projects   id="projects">
       │         ├─ <Education  id="education">
       │         ├─ <Writing    id="writing">
       │         └─ <Contact    id="contact">
       │    └─ <Footer>
```

### Data Flow

```
content.ts (tokens) ──▶ Section components ──▶ primitives (Card/Chip/Metric/CTA)
sections.ts (registry) ──▶ Navbar links  +  Section ids   (single source of truth)
theme logic ──▶ ThemeProvider ──▶ <html class="dark"> ──▶ Tailwind dark: variants
IntersectionObserver ──▶ useScrollSpy ──▶ selectActiveSection() ──▶ Navbar highlight
```

The **section registry** (`sections.ts`) is the single source of truth that drives both the Navbar links and the Section anchor ids. This guarantees Requirement 14.1 (link target ↔ section id consistency) by construction.

### Rendering & State

- The app is fully client-rendered; there is no routing library — navigation is anchor-based (`#id`) with `scrollIntoView({ behavior: 'smooth' })`.
- Theme state lives in a React context (`ThemeProvider`) and is mirrored to the `<html>` element's class list and `localStorage`.
- Active-section state lives in a `useScrollSpy` hook backed by a single `IntersectionObserver`.

## Components and Interfaces

### Layout Primitives & Reusable Components

```typescript
// Section: semantic wrapper that supplies anchor id, scroll-margin, spacing, and reveal
interface SectionProps {
  id: string;                 // anchor id, must match a registry entry
  as?: 'section' | 'header' | 'footer';
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
}

// Card: surface with soft border, depth, and hover-lift motion
interface CardProps {
  featured?: boolean;         // applies emphasized featured-case-study styling
  className?: string;
  children: React.ReactNode;
}

// Chip: compact pill for tech stack / skills
interface ChipProps {
  label: string;
  className?: string;
}

// Metric: quantified value + descriptive label
interface MetricProps {
  value: string;              // e.g. "[+40%]"
  label: string;              // e.g. "[METRIC LABEL]"
}

// CTA: anchor styled as button/link; opens token destination
interface CTAProps {
  label: string;
  href: string;               // Placeholder_Token destination
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;         // adds target="_blank" rel="noopener noreferrer"
  icon?: React.ReactNode;
}

// Reveal: Framer Motion scroll-reveal wrapper
interface RevealProps {
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}
```

### Navbar

```typescript
interface NavLink {
  id: string;        // target section id
  label: string;     // visible label
}

interface NavbarProps {
  links: NavLink[];          // derived from section registry
  activeId: string;          // from useScrollSpy
  onNavigate: (id: string) => void;
}
```

Behavior:
- Fixed/sticky at the top (Req 1.1) via `fixed top-0` with a translucent, blurred backdrop for depth.
- Renders one link per registry entry (Req 1.2); applies a distinct `aria-current="true"` + highlight style to `activeId` (Req 1.4).
- Hosts `ThemeToggle` (Req 1.5).
- Below 768px (Req 1.6, 13.1) collapses links into a compact menu (hamburger → disclosure panel); the full horizontal link row shows at `md:` and up.

### ThemeProvider & ThemeToggle

```typescript
type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

// Pure logic (no DOM) — unit/property tested
function resolveInitialTheme(stored: string | null): Theme;  // invalid/absent -> 'dark'
function nextTheme(current: Theme): Theme;                    // involution
```

- On mount, `resolveInitialTheme(localStorage.getItem('theme'))` decides the theme (Req 2.1, 2.4).
- `toggleTheme` applies `nextTheme`, writes to `localStorage`, and updates the `<html>` class (Req 2.2, 2.3).
- A small inline boot script in `index.html` sets the `<html>` class before React hydrates to avoid a flash of the wrong theme.

### Section Components

Each Section is a thin component that pulls its data from `content.ts` and composes primitives:

| Section      | id           | Data source                | Primitives used            |
|--------------|--------------|----------------------------|----------------------------|
| Hero         | `home`       | `content.hero`             | CTA, Reveal                |
| Quote        | `quote`      | `content.quote`            | Reveal                     |
| Highlights   | `highlights` | `content.highlights[]`     | Metric, Card, Reveal       |
| Experience   | `experience` | `content.experience[]`     | Card, Chip, Reveal         |
| Skills       | `skills`     | `content.skills[]`         | Chip, Card, Reveal         |
| Projects     | `projects`   | `content.projects[]`       | Card (featured), Chip, CTA |
| Education    | `education`  | `content.credentials`      | Card, Reveal               |
| Writing      | `writing`    | `content.writing[]`        | Card, Reveal               |
| Contact      | `contact`    | `content.contact`          | CTA, Reveal                |
| Footer       | (footer)     | `content.footer`           | —                          |

### Hooks

```typescript
// Single IntersectionObserver across all sections; returns the current active id.
function useScrollSpy(ids: string[], options?: ScrollSpyOptions): string;

// Pure selector extracted for testing
interface SectionVisibility { id: string; ratio: number; top: number; }
function selectActiveSection(entries: SectionVisibility[]): string;

// Responsive helper (pure)
function columnsFor(width: number, maxColumns: number): number; // <768 -> 1
```

## Data Models

### Content Module (`src/content/content.ts`)

All owner-facing text is a Placeholder_Token (bracketed string). Real content is dropped in later without touching components (Req 14.2).

```typescript
export interface HeroContent {
  name: string;                 // "[MY NAME]"
  title: string;                // "[PROFESSIONAL TITLE]"
  positioning: string;          // "[ONE-LINE POSITIONING STATEMENT]"
  bio: string;                  // "[SHORT BIO PARAGRAPH]"
  availability: string;         // "[AVAILABILITY / LOCATION]"
  ctas: CTAItem[];              // Resume, GitHub, LinkedIn, Email
}

export interface CTAItem { label: string; href: string; external?: boolean; }

export interface Metric { value: string; label: string; }

export interface ExperienceEntry {
  role: string;
  organization: string;
  duration: string;
  bullets: string[];            // 3–5 outcome-driven points
  tech: string[];               // chip labels
}

export interface SkillGroup { category: string; skills: string[]; }

export interface Project {
  title: string;
  summary: string;
  problem: string;              // problem-solved statement
  result: string;               // result/impact statement
  tech: string[];
  links: CTAItem[];
  featured: boolean;            // exactly one true
}

export interface WritingEntry { title: string; date: string; summary: string; }

export interface Credentials {
  education: string[];
  publications: string[];
  awards: string[];
}

export interface ContactContent {
  closing: string;
  email: string;                // mailto destination token
  socials: CTAItem[];
}

export interface SiteContent {
  hero: HeroContent;
  quote: string;
  highlights: Metric[];         // 3–5
  experience: ExperienceEntry[];
  skills: SkillGroup[];
  projects: Project[];          // 3–6, exactly one featured
  credentials: Credentials;
  writing: WritingEntry[];
  contact: ContactContent;
  footer: string;
}
```

### Section Registry (`src/content/sections.ts`)

```typescript
export interface SectionDef { id: string; label: string; }

// Drives BOTH Navbar links and section ids — single source of truth (Req 14.1)
export const SECTIONS: SectionDef[] = [
  { id: 'home',       label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills',     label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'education',  label: 'Education' },
  { id: 'writing',    label: 'Publications/Writing' },
  { id: 'contact',    label: 'Contact' },
];
```

> Note: Quote and Highlights are rendered Sections without their own nav links (per Req 1.2's link list). The registry holds nav-linked sections; non-linked sections still use the `Section` primitive with anchor ids.

## Theming Approach

**Strategy:** Tailwind `darkMode: 'class'`. The `<html>` element carries `class="dark"` (or none for light). This is the most robust approach for an explicit, persisted toggle and works seamlessly with Tailwind `dark:` variants.

**Design tokens as CSS variables + Tailwind theme extension.** Semantic color tokens are declared as CSS custom properties scoped to `:root` (light) and `.dark`, then mapped into Tailwind's color palette so utilities like `bg-surface` / `text-fg` resolve per theme.

```css
/* index.css */
:root {
  --color-bg: 250 250 250;        /* light background  (RGB triplets) */
  --color-surface: 255 255 255;
  --color-fg: 17 17 17;           /* body text */
  --color-muted: 82 82 91;
  --color-accent: 99 102 241;
  --color-border: 228 228 231;
}
.dark {
  --color-bg: 9 9 11;
  --color-surface: 24 24 27;
  --color-fg: 244 244 245;
  --color-muted: 161 161 170;
  --color-accent: 129 140 248;
  --color-border: 39 39 42;
}
```

```typescript
// tailwind.config.ts (excerpt)
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:      'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        fg:      'rgb(var(--color-fg) / <alpha-value>)',
        muted:   'rgb(var(--color-muted) / <alpha-value>)',
        accent:  'rgb(var(--color-accent) / <alpha-value>)',
        border:  'rgb(var(--color-border) / <alpha-value>)',
      },
    },
  },
} satisfies Config;
```

**Persistence:** `localStorage['theme']` holds `'dark' | 'light'`. Boot script in `index.html`:

```html
<script>
  (function () {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.classList.toggle('dark', t === 'dark');
  })();
</script>
```

**Contrast (Req 2.5):** body `--color-fg` against `--color-bg` is chosen to exceed 4.5:1 in both themes. A unit test computes the WCAG contrast ratio from the token values to enforce this.

## Design Tokens

| Token group | Values |
|-------------|--------|
| **Spacing scale** | Tailwind default; section vertical rhythm `py-24 md:py-32`, content gap `gap-6 / gap-8` |
| **Radius** | `--radius-sm: 0.5rem`, `--radius: 0.75rem`, `--radius-lg: 1rem`, `--radius-xl: 1.5rem` (cards use `rounded-2xl`) |
| **Shadow** | `shadow-sm` resting, `shadow-xl` + accent glow on hover; soft layered shadow for featured card |
| **Color** | Semantic tokens above (`bg`, `surface`, `fg`, `muted`, `accent`, `border`) |
| **Typography** | Display: `clamp(2.5rem, 6vw, 4.5rem)` for hero name (Req 12.4); headings scale; body `text-base md:text-lg`. Font stack: a sans (e.g. Inter) for UI, optional serif for editorial quote |
| **Depth** | Subtle gradient overlays, `border border-border`, and accent radial glow on surfaces (Req 12.5) |

The display token (hero name) is defined to be strictly larger than the body token; a test asserts `displayPx > bodyPx` (Req 12.4).

## Scroll Spy / Active Section Detection

A single `IntersectionObserver` watches all section elements. As entries update, `selectActiveSection` chooses the active id:

```typescript
function selectActiveSection(entries: SectionVisibility[]): string {
  const visible = entries.filter(e => e.ratio > 0);
  if (visible.length === 0) {
    // fall back to the topmost section above the viewport
    return [...entries].sort((a, b) => a.top - b.top)[0].id;
  }
  // most-visible wins; tie-break on topmost
  return visible.sort((a, b) =>
    b.ratio - a.ratio || a.top - b.top
  )[0].id;
}
```

Observer config uses `rootMargin` biased toward the upper portion of the viewport (e.g. `-40% 0px -55% 0px`) so the "active" section corresponds to what's centered near the top, and `threshold` of several steps for smooth updates. The selector is pure and isolated for property testing (Req 1.4).

## Smooth Anchor Scrolling

- Nav clicks call `onNavigate(id)` → `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })` and update the URL hash without a jump.
- Each `Section` sets `scroll-mt-24` (scroll-margin-top) so sticky-nav height does not cover the heading.
- `html { scroll-behavior: smooth }` is also set as a CSS fallback. Respect `prefers-reduced-motion` by disabling smooth behavior and reveal animations.

## Motion (Framer Motion)

**Scroll reveal (Req 12.2):** the `Reveal` primitive uses `whileInView` with `viewport={{ once: true, margin: '-10% 0px' }}`:

```typescript
const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
```

**Hover lift (Req 12.3):** `Card` uses `whileHover={{ y: -6 }}` with a shadow/glow transition, guarded by a pointer media query so touch devices don't trigger it.

**Reduced motion:** when `prefers-reduced-motion: reduce`, variants collapse to opacity-only or no animation.

## Responsive Layout

| Breakpoint | Behavior |
|------------|----------|
| `< 768px` (base) | Single-column for all multi-item sections (Req 13.1); Navbar collapses to compact menu (Req 1.6) |
| `>= 768px` (`md:`) | Multi-column grids: Highlights `md:grid-cols-3`, Skills `md:grid-cols-2/3`, Projects `md:grid-cols-2` (featured spans full width), Writing `md:grid-cols-2` (Req 13.2) |
| `>= 1024px` (`lg:`) | Wider content max-width, denser project/skill grids |

- Global container: `max-w-6xl mx-auto px-5 md:px-8` with `overflow-x-hidden` on the root to guarantee no horizontal overflow at ≥320px (Req 13.3).
- `columnsFor(width, max)` encodes the column decision purely for testing (Req 13.1, 13.2).

## Semantic HTML Structure

- Navbar in `<nav aria-label="Section navigation">`.
- Each Section is a `<section id="...">` (Hero may use `<header>`); the page wraps Sections in `<main>`.
- Footer is `<footer>` after the Contact section (Req 11.3).
- Headings follow a logical order (one `<h1>` in Hero, `<h2>` per section).
- Decorative visuals carry `aria-hidden="true"`; external links use `rel="noopener noreferrer"`.
- Anchor ids exactly match registry-derived nav targets (Req 14.1).

## Project File Structure

```
portfolio-website/
├─ index.html                       # root + theme boot script
├─ package.json
├─ vite.config.ts
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
└─ src/
   ├─ main.tsx                      # React entry
   ├─ App.tsx                       # assembles providers + sections
   ├─ index.css                     # Tailwind directives + CSS variables/tokens
   ├─ content/
   │  ├─ content.ts                 # SiteContent placeholder tokens
   │  └─ sections.ts                # SECTIONS registry
   ├─ theme/
   │  ├─ ThemeProvider.tsx
   │  ├─ ThemeToggle.tsx
   │  └─ theme.ts                   # resolveInitialTheme, nextTheme (pure)
   ├─ hooks/
   │  ├─ useScrollSpy.ts            # observer wiring
   │  └─ scrollSpy.ts               # selectActiveSection (pure)
   ├─ lib/
   │  ├─ responsive.ts              # columnsFor (pure)
   │  └─ contrast.ts                # WCAG contrast ratio (pure)
   ├─ components/
   │  ├─ Navbar.tsx
   │  ├─ Footer.tsx
   │  ├─ motion/
   │  │  └─ Reveal.tsx
   │  └─ ui/
   │     ├─ Section.tsx
   │     ├─ Card.tsx
   │     ├─ Chip.tsx
   │     ├─ Metric.tsx
   │     └─ CTA.tsx
   └─ sections/
      ├─ Hero.tsx
      ├─ Quote.tsx
      ├─ Highlights.tsx
      ├─ Experience.tsx
      ├─ Skills.tsx
      ├─ Projects.tsx
      ├─ Education.tsx
      ├─ Writing.tsx
      └─ Contact.tsx
```

## Error Handling

The site is presentational with static, owner-supplied content, so error handling is defensive rather than recovery-oriented:

- **Missing/invalid stored theme:** `resolveInitialTheme` returns `'dark'` for any value other than `'light'`/`'dark'` (Req 2.1).
- **`localStorage` unavailable** (private mode / disabled): theme reads/writes are wrapped in try/catch; failures degrade to in-memory dark default without throwing.
- **Empty content arrays:** Section components render their container with zero items rather than crashing (e.g. `highlights.map` over `[]`). Cardinality expectations (3–5 metrics, 3–6 projects) are content-authoring constraints, not runtime guards.
- **Missing target on nav click:** `getElementById` returning `null` is a no-op (optional chaining), so a stale link never throws.
- **No IntersectionObserver** (very old browsers): `useScrollSpy` falls back to no active highlight; navigation and scrolling still work.
- **External link safety:** all external CTAs render with `rel="noopener noreferrer"`.

## Testing Strategy

**Dual approach.** Pure logic units (theme, scroll-spy, responsive, contrast) and content-rendering invariants are covered by **property-based tests** (fast-check) with ≥100 iterations each. Specific presence, ordering, and aesthetic assertions use **example-based tests** (Vitest + React Testing Library). Real layout/overflow and smooth-scroll behavior are verified by **integration/manual** checks since jsdom does not implement layout or smooth scrolling.

Generators produce randomized `SiteContent` fragments (arrays of metrics, experience entries, projects with exactly one featured flag, skills groups, writing entries) and randomized viewport widths / intersection entries to exercise the properties below.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navbar link / section id consistency

*For any* section registry, the Navbar renders exactly one link per registered section, and every link's target id corresponds to a rendered semantic section element bearing that id (and no nav-linked id is missing a section).

**Validates: Requirements 1.2, 1.3, 14.1**

### Property 2: Active-section selection is well-defined

*For any* non-empty set of section visibility entries, `selectActiveSection` returns exactly one id, and that id is one of the provided sections (the most-visible, tie-broken by topmost).

**Validates: Requirements 1.4**

### Property 3: Mobile vs desktop navigation by width

*For any* viewport width below 768 pixels the navigation resolves to the compact mobile control, and *for any* width of 768 pixels or greater it resolves to the full link row.

**Validates: Requirements 1.6**

### Property 4: Initial theme resolution

*For any* stored value, `resolveInitialTheme` returns `'light'` when the stored value is exactly `'light'`, returns the stored value when it is `'dark'`, and returns `'dark'` for every absent or invalid value.

**Validates: Requirements 2.1, 2.4**

### Property 5: Theme toggle is an involution

*For any* theme, applying `nextTheme` once yields the opposite theme, and applying it twice yields the original theme.

**Validates: Requirements 2.2**

### Property 6: Theme persistence round-trip

*For any* theme, writing it to the Theme_Store and then reading and resolving it returns the same theme.

**Validates: Requirements 2.3, 2.4**

### Property 7: Body text contrast meets WCAG AA

*For* each theme (dark and light), the computed contrast ratio between the body text token and the background token is at least 4.5 to 1.

**Validates: Requirements 2.5**

### Property 8: CTA links open their token destinations

*For any* CTA configuration (hero CTAs, project links, contact socials), the rendered anchor's `href` equals the configured Placeholder_Token destination, and external CTAs carry safe `rel` attributes.

**Validates: Requirements 3.2, 3.3, 8.4, 11.1**

### Property 9: Sections render exactly the provided content tokens

*For any* `SiteContent`, each Section renders text drawn from the provided tokens (hero name/title/positioning/bio/availability, quote text, contact closing/email/socials) and never hardcoded owner strings.

**Validates: Requirements 3.1, 3.5, 4.2, 11.1, 14.2**

### Property 10: List sections render one item per data entry

*For any* arrays of highlights, projects, writing entries, education/publications/awards items, and skill groups, the number of rendered cards/items equals the corresponding array length.

**Validates: Requirements 5.1, 8.1, 9.1, 10.1**

### Property 11: Metric cards expose value and label

*For any* metrics array, every rendered metric card contains both its quantified value and its descriptive label.

**Validates: Requirements 5.2, 5.3**

### Property 12: Experience entries expose required fields and counts

*For any* experience array, each rendered entry contains its role, organization, and duration, renders one bullet per provided bullet (3–5), and renders one chip per provided technology.

**Validates: Requirements 6.2, 6.3, 6.4, 6.5**

### Property 13: Skills groups render labels and chips

*For any* skills groups array, each rendered group displays its category label and renders one chip per skill in that group.

**Validates: Requirements 7.1, 7.2, 7.3**

### Property 14: Exactly one featured project

*For any* projects array containing exactly one entry flagged featured, exactly one rendered project card carries the featured-case-study style marker and the rest do not.

**Validates: Requirements 8.2**

### Property 15: Project cards expose all required fields

*For any* projects array, each rendered project card contains a title, summary, problem-solved statement, result/impact statement, one chip per technology, and one anchor per project link.

**Validates: Requirements 8.3, 8.5**

### Property 16: Writing cards expose title, date, and summary

*For any* writing array, each rendered writing card contains its title, publication date, and summary.

**Validates: Requirements 10.2, 10.3**

### Property 17: Responsive column count by width

*For any* viewport width below 768 pixels, `columnsFor` returns 1 for multi-item sections, and *for any* width of 768 pixels or greater it returns a value greater than 1 (bounded by the section's maximum).

**Validates: Requirements 13.1, 13.2**

### Property 18: Hero display typography exceeds body typography

*For* the resolved typography tokens, the hero display font size is strictly greater than the body font size.

**Validates: Requirements 12.4**
