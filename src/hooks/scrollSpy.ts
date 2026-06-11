export interface SectionVisibility {
  id: string;
  ratio: number;
  top: number;
}

/**
 * Choose the active section from a set of visibility entries.
 * Most-visible wins; ties broken by the topmost element. When nothing is
 * visible, fall back to the topmost section.
 */
export function selectActiveSection(entries: SectionVisibility[]): string {
  if (entries.length === 0) return '';

  const visible = entries.filter((e) => e.ratio > 0);
  if (visible.length === 0) {
    return [...entries].sort((a, b) => a.top - b.top)[0].id;
  }

  return [...visible].sort((a, b) => b.ratio - a.ratio || a.top - b.top)[0].id;
}
