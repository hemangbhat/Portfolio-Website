export interface SectionDef {
  id: string;
  label: string;
}

/**
 * Single source of truth driving both the Navbar links and the rendered
 * section anchor ids.
 */
export const SECTIONS: SectionDef[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
