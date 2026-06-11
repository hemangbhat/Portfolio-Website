import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Hemang Bhat — Full-Stack Developer & AI/ML Builder',
  description:
    'Hemang Bhat — Full-Stack Developer, AI/ML Builder, and DSA Enthusiast based in New Delhi. I turn ideas into working products.',
  metadataBase: new URL('https://hemangbhat.dev'),
  openGraph: {
    title: 'Hemang Bhat — Full-Stack Developer & AI/ML Builder',
    description: 'I build full-stack products, AI-driven workflows, and data-driven tools.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08080b',
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'bg-surface border border-border text-fg shadow-lift rounded-2xl',
              description: 'text-muted',
              success: 'border-accent/30',
            },
          }}
        />
      </body>
    </html>
  );
}
