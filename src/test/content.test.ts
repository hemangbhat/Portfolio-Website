import { describe, it, expect } from 'vitest';
import { content } from '../content/content';
import { SECTIONS } from '../content/sections';

describe('content integrity', () => {
  it('has exactly one featured project', () => {
    expect(content.projects.filter((p) => p.featured)).toHaveLength(1);
  });

  it('has 3-5 highlight metrics', () => {
    expect(content.highlights.length).toBeGreaterThanOrEqual(3);
    expect(content.highlights.length).toBeLessThanOrEqual(5);
  });

  it('has 3-6 projects', () => {
    expect(content.projects.length).toBeGreaterThanOrEqual(3);
    expect(content.projects.length).toBeLessThanOrEqual(6);
  });

  it('experience entries each have 3-5 bullets', () => {
    for (const e of content.experience) {
      expect(e.bullets.length).toBeGreaterThanOrEqual(3);
      expect(e.bullets.length).toBeLessThanOrEqual(5);
    }
  });

  it('registry has unique ids', () => {
    const ids = SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
