export const MOBILE_BREAKPOINT = 768;

/**
 * Number of columns a multi-item section should render at a given viewport
 * width. Below 768px always a single column; at or above 768px more than one
 * column, bounded by the section's maximum.
 */
export function columnsFor(width: number, maxColumns: number): number {
  const max = Math.max(1, Math.floor(maxColumns));
  if (width < MOBILE_BREAKPOINT) return 1;
  return Math.min(max, Math.max(2, max));
}

/** Whether the compact mobile navigation should be used at a given width. */
export function isMobileNav(width: number): boolean {
  return width < MOBILE_BREAKPOINT;
}
