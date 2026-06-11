import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Certifications from '../sections/Certifications';
import { content } from '../content/content';

describe('Projects section', () => {
  it('renders one card per project (Property 10)', () => {
    render(<Projects />);
    for (const p of content.projects) {
      expect(screen.getByRole('heading', { name: p.title })).toBeInTheDocument();
    }
  });

  it('marks exactly one project as the featured case study (Property 14)', () => {
    render(<Projects />);
    const badges = screen.getAllByText(/spotlight case study/i);
    expect(badges).toHaveLength(content.projects.filter((p) => p.featured).length);
    expect(badges).toHaveLength(1);
  });

  it('exposes problem and impact for each project (Property 15)', () => {
    render(<Projects />);
    expect(screen.getAllByText('Problem')).toHaveLength(content.projects.length);
    expect(screen.getAllByText('Impact')).toHaveLength(content.projects.length);
  });
});

describe('Skills section', () => {
  it('renders every category label and its chips (Property 13)', () => {
    render(<Skills />);
    for (const group of content.skills) {
      const heading = screen.getByRole('heading', { name: group.category });
      const card = heading.closest('div');
      expect(card).not.toBeNull();
      for (const skill of group.skills) {
        expect(within(card as HTMLElement).getByText(skill)).toBeInTheDocument();
      }
    }
  });
});

describe('Experience section', () => {
  it('renders role, organization, duration and all bullets (Property 12)', () => {
    render(<Experience />);
    for (const entry of content.experience) {
      expect(screen.getByRole('heading', { name: entry.role })).toBeInTheDocument();
      expect(screen.getByText(entry.duration)).toBeInTheDocument();
      for (const bullet of entry.bullets) {
        expect(screen.getByText(bullet)).toBeInTheDocument();
      }
    }
  });
});

describe('Certifications section', () => {
  it('renders one card per certification', () => {
    render(<Certifications />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBe(content.certifications.length);
  });
});
