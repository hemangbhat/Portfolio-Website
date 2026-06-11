'use client';

import {
  siPython, siTypescript, siCplusplus, siC, siJavascript, siReact, siNextdotjs,
  siSvelte, siTailwindcss, siNodedotjs, siMongodb, siNeon, siDrizzle, siDocker,
  siFirebase, siVercel, siNetlify, siLangchain, siLanggraph, siPandas, siNumpy,
  siGit, siGithub, siGithubactions, siPostman, siHtml5, siBootstrap, siSentry,
  siClerk, siStripe, siChartdotjs, siPuppeteer, siPostgresql, siPytest,
  siGooglesheets, siScikitlearn, siRedis, siExpress, siJest,
  type SimpleIcon,
} from 'simple-icons';
import { Coffee, Sparkles, Cloud, type LucideIcon } from 'lucide-react';

/** name (lowercased, normalized) -> brand icon */
const MAP: Record<string, SimpleIcon> = {
  python: siPython,
  typescript: siTypescript,
  'c++': siCplusplus,
  c: siC,
  javascript: siJavascript,
  'es6+': siJavascript,
  react: siReact,
  'next.js': siNextdotjs,
  svelte: siSvelte,
  sveltekit: siSvelte,
  'tailwind css': siTailwindcss,
  'node.js': siNodedotjs,
  nodejs: siNodedotjs,
  mern: siReact,
  express: siExpress,
  mongodb: siMongodb,
  neon: siNeon,
  'neon postgres': siNeon,
  postgresql: siPostgresql,
  pgvector: siPostgresql,
  'drizzle orm': siDrizzle,
  drizzle: siDrizzle,
  docker: siDocker,
  firebase: siFirebase,
  vercel: siVercel,
  netlify: siNetlify,
  redis: siRedis,
  langchain: siLangchain,
  langgraph: siLanggraph,
  lcel: siLangchain,
  pandas: siPandas,
  numpy: siNumpy,
  'scikit-learn': siScikitlearn,
  git: siGit,
  github: siGithub,
  'github actions': siGithubactions,
  postman: siPostman,
  html5: siHtml5,
  bootstrap: siBootstrap,
  sentry: siSentry,
  clerk: siClerk,
  stripe: siStripe,
  'chart.js': siChartdotjs,
  puppeteer: siPuppeteer,
  pytest: siPytest,
  'google sheets api v4': siGooglesheets,
  'google sheets': siGooglesheets,
  jest: siJest,
};

/** Fallbacks for tech without an official brand logo. */
const FALLBACK: Record<string, LucideIcon> = {
  java: Coffee,
  llms: Sparkles,
  'aws s3': Cloud,
};

function normalize(name: string): string {
  return name
    .toLowerCase()
    .trim()
    // strip trailing version numbers: "Next.js 16", "Python 3.11", "React 19"
    .replace(/\s+\d+(\.\d+)*$/, '')
    .replace(/\s+api v\d+$/, ' api v4');
}

function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.22;
}

/** Returns a brand/fallback icon node for a tech name, or null if none exists. */
export function getTechIcon(name: string, className = 'h-4 w-4'): React.ReactNode | null {
  const key = normalize(name);
  const icon = MAP[key] ?? MAP[name.toLowerCase()];
  if (icon) {
    const fill = isDark(icon.hex) ? 'currentColor' : `#${icon.hex}`;
    return (
      <svg role="img" viewBox="0 0 24 24" className={className} fill={fill} aria-hidden="true">
        <path d={icon.path} />
      </svg>
    );
  }
  const Fb = FALLBACK[key] ?? FALLBACK[name.toLowerCase()];
  if (Fb) return <Fb className={className} aria-hidden="true" />;
  return null;
}

export default function TechLogo({ name, className = 'h-4 w-4' }: { name: string; className?: string }) {
  return <>{getTechIcon(name, className)}</>;
}
