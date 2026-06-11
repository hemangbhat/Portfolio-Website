import { content } from '../content/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>{content.footer}</p>
        <p>© {year} Hemang Bhat. All rights reserved.</p>
      </div>
    </footer>
  );
}
