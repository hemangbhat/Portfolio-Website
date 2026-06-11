export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Resolve the initial theme from a stored value.
 * Returns 'light' only when stored is exactly 'light', 'dark' when stored is
 * 'dark', and falls back to 'dark' for any absent or invalid value.
 */
export function resolveInitialTheme(stored: string | null): Theme {
  if (stored === 'light') return 'light';
  if (stored === 'dark') return 'dark';
  return 'dark';
}

/** Toggle between the two themes (involution). */
export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}
