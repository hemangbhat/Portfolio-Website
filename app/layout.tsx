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
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://hemangbhat.dev'
  ),
  openGraph: {
    title: 'Hemang Bhat — Full-Stack Developer & AI/ML Builder',
    description: 'I build full-stack products, AI-driven workflows, and data-driven tools.',
    type: 'website',
    url: 'https://hemangbhat.dev',
    siteName: 'Hemang Bhat',
    images: [
      {
        url: 'https://hemangbhat.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'Hemang Bhat — Full-Stack Developer & AI/ML Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemang Bhat — Full-Stack Developer & AI/ML Builder',
    description: 'I build full-stack products, AI-driven workflows, and data-driven tools.',
    images: ['https://hemangbhat.dev/og.png'],
  },
  alternates: {
    canonical: 'https://hemangbhat.dev',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08080b',
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hemang Bhat',
  jobTitle: 'Full-Stack Developer & AI/ML Builder',
  email: 'mailto:bhat.hemang@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'India' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Netaji Subhas University of Technology',
  },
  knowsAbout: [
    'Full-Stack Development',
    'Artificial Intelligence',
    'Machine Learning',
    'Agentic AI',
    'Data Structures and Algorithms',
    'TypeScript',
    'Next.js',
    'Python',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
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
