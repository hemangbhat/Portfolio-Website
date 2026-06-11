# Implementation Plan: Portfolio Website

## Overview

This plan builds a single-page vertical-scroll portfolio with Vite + React + TypeScript + Tailwind CSS + Framer Motion. It proceeds bottom-up: scaffold the toolchain, establish the theme system and design tokens, implement and property-test the pure logic units (theme resolution, scroll-spy selector, responsive helper, contrast), build the centralized content/registry modules, then the reusable primitives, then the Navbar and every section, and finally wire everything into `App` with responsive layout and integration tests. Each task builds on prior tasks; testing is included as sub-tasks placed near the code they validate.

## Tasks

- [ ] 1. Scaffold project and toolchain
  - [ ] 1.1 Initialize Vite React + TypeScript project and dependencies
    - Create `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, and an empty `src/App.tsx`
    - Add and configure dependencies: `react`, `react-dom`, `framer-motion`, dev deps `vite`, `typescript`, `@vitejs/plugin-react`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fast-check`
    - Configure Vitest (jsdom environment, setup file) in `vite.config.ts`
    - _Requirements: 14.3_
  - [ ] 1.2 Configure Tailwind CSS and PostCSS
    - Create `tailwind.config.ts` with `darkMode: 'class'`, content globs, and the semantic color extension (`bg`, `surface`, `fg`, `muted`, `accent`, `border`) mapped to CSS variables
    - Create `postcss.config.js`; add Tailwind directives to `src/index.css`
    - _Requirements: 12.1_

- [ ] 2. Theme system and design tokens
  - [ ] 2.1 Define design tokens and theme CSS variables
    - In `src/index.css`, declare `:root` (light) and `.dark` CSS custom properties for color tokens (`--color-bg/surface/fg/muted/accent/border`) using RGB triplets
    - Add radius tokens, container/`overflow-x-hidden` root styles, `scroll-behavior: smooth`, and `prefers-reduced-motion` guards
    - Define display vs body typography tokens (hero name `clamp(...)`, body `text-base md:text-lg`) such that display size > body size
    - _Requirements: 12.1, 12.4, 12.5, 13.3_
  - [ ] 2.2 Add theme boot script to index.html
    - Add the inline script that reads `localStorage['theme']`, defaults invalid/absent to `'dark'`, and sets the `<html>` class before React mounts
    - _Requirements: 2.1, 2.4_

- [ ] 3. Pure logic units with property tests
  - [ ] 3.1 Implement theme resolution logic
    - Create `src/theme/theme.ts` with `resolveInitialTheme(stored): Theme` (invalid/absent → `'dark'`) and `nextTheme(current): Theme`
    - _Requirements: 2.1, 2.2, 2.4_
  - [ ]* 3.2 Write property test for initial theme resolution
    - **Property 4: Initial theme resolution**
    - **Validates: Requirements 2.1, 2.4**
  - [ ]* 3.3 Write property test for theme toggle involution
    - **Property 5: Theme toggle is an involution**
    - **Validates: Requirements 2.2**
  - [ ] 3.4 Implement scroll-spy active-section selector
    - Create `src/hooks/scrollSpy.ts` with `SectionVisibility` type and pure `selectActiveSection(entries): string` (most-visible, tie-break topmost; fallback to topmost when none visible)
    - _Requirements: 1.4_
  - [ ]* 3.5 Write property test for active-section selection
    - **Property 2: Active-section selection is well-defined**
    - **Validates: Requirements 1.4**
  - [ ] 3.6 Implement responsive column helper
    - Create `src/lib/responsive.ts` with `columnsFor(width, maxColumns): number` (<768 → 1; ≥768 → >1 bounded by max)
    - _Requirements: 13.1, 13.2_
  - [ ]* 3.7 Write property test for responsive column count
    - **Property 17: Responsive column count by width**
    - **Validates: Requirements 13.1, 13.2**
  - [ ] 3.8 Implement WCAG contrast utility
    - Create `src/lib/contrast.ts` computing relative luminance and contrast ratio between two RGB triplets
    - _Requirements: 2.5_
  - [ ]* 3.9 Write property test for body text contrast (both themes)
    - **Property 7: Body text contrast meets WCAG AA**
    - **Validates: Requirements 2.5**
  - [ ]* 3.10 Write unit test for hero display vs body typography tokens
    - **Property 18: Hero display typography exceeds body typography**
    - **Validates: Requirements 12.4**

- [ ] 4. Checkpoint - Ensure all logic tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Content and section registry modules
  - [ ] 5.1 Implement section registry
    - Create `src/content/sections.ts` with `SectionDef` and the `SECTIONS` array (Home, Experience, Skills, Projects, Education, Publications/Writing, Contact) as single source of truth for nav links and section ids
    - _Requirements: 1.2, 14.1_
  - [ ] 5.2 Implement centralized content/placeholder-token module
    - Create `src/content/content.ts` with all interfaces (`HeroContent`, `CTAItem`, `Metric`, `ExperienceEntry`, `SkillGroup`, `Project`, `WritingEntry`, `Credentials`, `ContactContent`, `SiteContent`) and a default `content` export populated entirely with bracketed Placeholder_Token values (3–5 highlights, 3–5 experience entries, 3–6 projects with exactly one featured, skill groups, writing entries, credentials, contact)
    - _Requirements: 3.5, 4.2, 5.3, 6.5, 7.3, 8.5, 9.2, 10.3, 11.4, 14.2_
  - [ ]* 5.3 Write fast-check generators for SiteContent fragments
    - Add `src/test/generators.ts` producing randomized metrics, experience entries, skill groups, projects (exactly one featured), and writing entries for reuse by section property tests
    - _Requirements: 14.2_

- [ ] 6. Reusable primitives
  - [ ] 6.1 Implement Reveal motion primitive
    - Create `src/components/motion/Reveal.tsx` using Framer Motion `whileInView` reveal variants (`once`, margin), honoring `prefers-reduced-motion`
    - _Requirements: 12.2_
  - [ ] 6.2 Implement Section primitive
    - Create `src/components/ui/Section.tsx`: semantic wrapper (`section`/`header`/`footer`), anchor `id`, `scroll-mt-24`, section spacing, `aria-label`
    - _Requirements: 14.1, 12.1_
  - [ ] 6.3 Implement Card primitive
    - Create `src/components/ui/Card.tsx` with soft border/depth, `featured` emphasized styling, and pointer-guarded hover-lift (`whileHover={{ y: -6 }}`)
    - _Requirements: 8.2, 12.3, 12.5_
  - [ ] 6.4 Implement Chip, Metric, and CTA primitives
    - Create `src/components/ui/Chip.tsx`, `src/components/ui/Metric.tsx` (value + label), and `src/components/ui/CTA.tsx` (anchor with `href`, variants, `external` → `rel="noopener noreferrer"` + `target="_blank"`)
    - _Requirements: 5.2, 3.2, 8.4, 11.1_
  - [ ]* 6.5 Write property test for CTA token destinations and safe rel
    - **Property 8: CTA links open their token destinations**
    - **Validates: Requirements 3.2, 3.3, 8.4, 11.1**
  - [ ]* 6.6 Write unit tests for Card featured marker and Metric content
    - Verify featured Card renders distinct style marker; Metric renders both value and label
    - _Requirements: 8.2, 5.2_

- [ ] 7. Theme provider, toggle, and Navbar
  - [ ] 7.1 Implement ThemeProvider and ThemeToggle
    - Create `src/theme/ThemeProvider.tsx` (context, mount resolution via `resolveInitialTheme`, `toggleTheme` writes `localStorage` and updates `<html>` class, try/catch around storage) and `src/theme/ThemeToggle.tsx`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ]* 7.2 Write test for theme persistence round-trip
    - **Property 6: Theme persistence round-trip**
    - **Validates: Requirements 2.3, 2.4**
  - [ ] 7.3 Implement Navbar with scroll spy and responsive menu
    - Create `src/components/Navbar.tsx`: fixed/blurred backdrop, renders one link per registry entry, applies `aria-current` highlight to `activeId`, hosts `ThemeToggle`, smooth-scroll `onNavigate`, and collapses to a compact menu below 768px
    - Create `src/hooks/useScrollSpy.ts` wiring a single `IntersectionObserver` to `selectActiveSection`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [ ]* 7.4 Write property test for Navbar link/section id consistency
    - **Property 1: Navbar link / section id consistency**
    - **Validates: Requirements 1.2, 1.3, 14.1**
  - [ ]* 7.5 Write property test for mobile vs desktop navigation by width
    - **Property 3: Mobile vs desktop navigation by width**
    - **Validates: Requirements 1.6**

- [ ] 8. Checkpoint - Ensure primitives, theme, and nav tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Hero and editorial sections
  - [ ] 9.1 Implement Hero section
    - Create `src/sections/Hero.tsx`: name (display typography), title, positioning, bio, availability, abstract decorative visual (`aria-hidden`), and Resume/GitHub/LinkedIn/Email CTAs from `content.hero`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 12.4_
  - [ ]* 9.2 Write property test for Hero content from tokens
    - **Property 9: Sections render exactly the provided content tokens**
    - **Validates: Requirements 3.1, 3.5, 4.2, 11.1, 14.2**
  - [ ] 9.3 Implement Quote section
    - Create `src/sections/Quote.tsx` rendering quote token in editorial styling within a `Section`/`Reveal`
    - _Requirements: 4.1, 4.2_
  - [ ] 9.4 Implement Highlights section
    - Create `src/sections/Highlights.tsx` rendering 3–5 `Metric` cards from `content.highlights`, multi-column at `md:`
    - _Requirements: 5.1, 5.2, 5.3, 13.2_
  - [ ]* 9.5 Write property test for metric cards expose value and label
    - **Property 11: Metric cards expose value and label**
    - **Validates: Requirements 5.2, 5.3**

- [ ] 10. Experience, Skills, and Projects sections
  - [ ] 10.1 Implement Experience section
    - Create `src/sections/Experience.tsx`: timeline/stacked `Card`s with role, organization, duration, 3–5 bullets, and tech `Chip`s
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [ ]* 10.2 Write property test for experience entry fields and counts
    - **Property 12: Experience entries expose required fields and counts**
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.5**
  - [ ] 10.3 Implement Skills section
    - Create `src/sections/Skills.tsx`: labeled categories with `Chip`s per skill, multi-column at `md:`
    - _Requirements: 7.1, 7.2, 7.3, 13.2_
  - [ ]* 10.4 Write property test for skills groups render labels and chips
    - **Property 13: Skills groups render labels and chips**
    - **Validates: Requirements 7.1, 7.2, 7.3**
  - [ ] 10.5 Implement Projects section with featured case study
    - Create `src/sections/Projects.tsx`: 3–6 project `Card`s, one with `featured` emphasis (full-width span), each with title, summary, problem, result, tech `Chip`s, and project link CTAs
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 13.2_
  - [ ]* 10.6 Write property test for exactly one featured project
    - **Property 14: Exactly one featured project**
    - **Validates: Requirements 8.2**
  - [ ]* 10.7 Write property test for project cards expose all required fields
    - **Property 15: Project cards expose all required fields**
    - **Validates: Requirements 8.3, 8.5**

- [ ] 11. Education, Writing, Contact, and Footer
  - [ ] 11.1 Implement Education section
    - Create `src/sections/Education.tsx`: compact layout for education, publications, and awards from `content.credentials`
    - _Requirements: 9.1, 9.2_
  - [ ] 11.2 Implement Writing section
    - Create `src/sections/Writing.tsx`: editorial `Card`s with title, date, and summary; multi-column at `md:`
    - _Requirements: 10.1, 10.2, 10.3, 13.2_
  - [ ]* 11.3 Write property test for writing cards expose title, date, summary
    - **Property 16: Writing cards expose title, date, and summary**
    - **Validates: Requirements 10.2, 10.3**
  - [ ] 11.4 Implement Contact section and Footer
    - Create `src/sections/Contact.tsx`: closing statement, email, social links, primary contact CTA; create `src/components/Footer.tsx` rendered after Contact
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  - [ ]* 11.5 Write property test for list sections render one item per entry
    - **Property 10: List sections render one item per data entry**
    - **Validates: Requirements 5.1, 8.1, 9.1, 10.1**

- [ ] 12. Integration and wiring
  - [ ] 12.1 Assemble App with providers, Navbar, sections, and responsive layout
    - Update `src/App.tsx` to wrap `ThemeProvider`, render `Navbar` (links from registry, `activeId` from `useScrollSpy`), `<main>` with all sections in order (Hero, Quote, Highlights, Experience, Skills, Projects, Education, Writing, Contact), then `Footer`; apply container `max-w-6xl mx-auto` and root `overflow-x-hidden`
    - _Requirements: 1.1, 13.1, 13.2, 13.3, 14.1, 14.3_
  - [ ]* 12.2 Write integration test for section ids matching nav targets and no hardcoded owner strings
    - Render `App`; assert every nav link target resolves to a section element with matching id and that section text derives from content tokens
    - _Requirements: 14.1, 14.2_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP.
- Each task references specific requirements for traceability.
- Property tests use fast-check (≥100 iterations) and validate the universal correctness properties from the design; example-based tests cover presence/ordering specifics.
- Layout/overflow and smooth-scroll behavior are validated by integration/manual checks since jsdom does not implement layout.
- Checkpoints ensure incremental validation at natural breakpoints.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["2.1", "2.2", "3.1", "3.4", "3.6", "3.8", "5.1", "5.2"] },
    { "id": 3, "tasks": ["3.2", "3.3", "3.5", "3.7", "3.9", "3.10", "5.3", "6.1", "6.2", "6.4", "7.1"] },
    { "id": 4, "tasks": ["6.3", "6.5", "7.2", "7.3"] },
    { "id": 5, "tasks": ["6.6", "7.4", "7.5", "9.1", "9.3", "9.4", "10.1", "10.3", "10.5", "11.1", "11.2", "11.4"] },
    { "id": 6, "tasks": ["9.2", "9.5", "10.2", "10.4", "10.6", "10.7", "11.3", "11.5", "12.1"] },
    { "id": 7, "tasks": ["12.2"] }
  ]
}
```
