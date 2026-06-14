export interface CTAItem {
  label: string;
  href: string;
  external?: boolean;
  kind?: 'resume' | 'github' | 'linkedin' | 'email' | 'leetcode' | 'link' | 'repo' | 'live';
}

export interface Metric {
  value: string;
  label: string;
  detail?: string;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  location?: string;
  duration: string;
  bullets: string[];
  tech: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Project {
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  result: string;
  tech: string[];
  links: CTAItem[];
  featured: boolean;
}

export interface WritingEntry {
  title: string;
  date: string;
  summary: string;
  readTime?: string;
  body?: string[];
}

export interface Credentials {
  education: { title: string; org: string; duration: string; detail: string }[];
  positions: { title: string; org: string; points: string[] }[];
  awards: string[];
}

export interface ContactContent {
  closing: string;
  email: string;
  locations: string[];
  socials: CTAItem[];
}

export interface AboutContent {
  lead: string;
  paragraphs: string[];
  principles: { title: string; body: string }[];
}

export interface DSAStats {
  solved: number;
  total: number;
  easy: [number, number];
  medium: [number, number];
  hard: [number, number];
  rating: number;
  level: string;
  ranking: string;
  contests: number;
  activeDays: number;
  maxStreak: number;
  submissions: number;
}

export interface GitHubStats {
  username: string;
  url: string;
  windowLabel: string;
  contributions: number;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
}

export interface HeroContent {
  name: string;
  title: string;
  roles: string[];
  positioning: string;
  bio: string;
  availability: string;
  trust: string[];
  ctas: CTAItem[];
}

export interface SiteContent {
  hero: HeroContent;
  quote: string;
  highlights: Metric[];
  about: AboutContent;
  experience: ExperienceEntry[];
  skills: SkillGroup[];
  toolkit: string[];
  github: GitHubStats;
  dsa: DSAStats;
  projects: Project[];
  certifications: Certification[];
  credentials: Credentials;
  writing: WritingEntry[];
  contact: ContactContent;
  closingQuote: { text: string; author: string };
  footer: string;
}

const EMAIL = 'bhat.hemang@gmail.com';

export const content: SiteContent = {
  hero: {
    name: 'Hemang Bhat',
    title: 'Full-Stack Developer · AI/ML Builder · DSA Enthusiast',
    roles: ['Full-Stack Developer', 'AI/ML Builder', 'DSA Enthusiast'],
    positioning: 'I turn ideas into working products — clean interfaces, scalable systems, and AI that actually ships.',
    bio: 'I build full-stack products and AI-driven workflows end to end — from a blank file to something people actually use. Lately: agentic systems, clean UIs, and shipping fast.',
    availability: 'Based in New Delhi, India — open to internships & collaborations',
    trust: ['CSAI @ NSUT', 'ex-Copper Digital', '250+ DSA solved'],
    ctas: [
      { label: 'Resume', href: '#', kind: 'resume', external: true },
      { label: 'GitHub', href: '#', kind: 'github', external: true },
      { label: 'LinkedIn', href: '#', kind: 'linkedin', external: true },
      { label: 'Email', href: `mailto:${EMAIL}`, kind: 'email' },
    ],
  },

  quote:
    'Good software is invisible. It removes friction, earns trust quietly, and leaves people with more time for the things that matter.',

  about: {
    lead: 'I build at the intersection of product, systems, and intelligence.',
    paragraphs: [
      'I care about software that earns its place — fast, legible, and honest about what it does. Whether it is a SaaS dashboard, an agentic AI workflow, or a forecasting model, I start from the user problem and work backward to the architecture.',
      'My instinct comes from competitive DSA: break the problem down, find the constraint that matters, and optimize for it. That same discipline shows up in how I ship products and how I reason about model behavior.',
    ],
    principles: [
      { title: 'Outcome over output', body: 'I optimize for the result a user feels, not the number of features shipped.' },
      { title: 'Legible systems', body: 'Clean architecture and explainable models beat clever black boxes.' },
      { title: 'Momentum', body: 'Ship a rough first version, measure, then make it sharp.' },
    ],
  },

  highlights: [
    { value: '94.25%', label: 'Model test accuracy', detail: '0.920 macro F1 · financial sentiment' },
    { value: '250+', label: 'DSA problems solved', detail: 'LeetCode · GfG · more' },
    { value: '300+', label: 'Students reached', detail: 'hackathons · bootcamps · sessions' },
    { value: '25+', label: 'Technical events led', detail: 'end-to-end execution' },
    { value: '2×', label: 'DSA contest podiums', detail: '1st & 2nd place finishes' },
  ],

  experience: [
    {
      role: 'Software Intern',
      organization: 'Copper Digital',
      location: 'New Delhi',
      duration: 'Jun 2025 – Jul 2025',
      bullets: [
        'Developed and integrated AI agents for task automation and intelligent workflows used in real product scenarios.',
        'Designed, built, and orchestrated multi-step agent pipelines with LLMs and external APIs.',
        'Translated open-ended automation problems into reliable, production-minded agent flows.',
      ],
      tech: ['Python', 'LLMs', 'LangChain', 'REST APIs'],
    },
    {
      role: 'Joint Secretary',
      organization: 'IEEE NSUT',
      location: 'New Delhi',
      duration: '2024 – Present',
      bullets: [
        'Organized hackathons, bootcamps, and technical sessions for 300+ students on Web Dev, DSA, and AI/ML.',
        'Led end-to-end execution of 25+ technical events, coordinating teams, logistics, and speakers.',
        'Fostered cross-domain collaborations that grew event reach and community engagement.',
      ],
      tech: ['Leadership', 'Event Ops', 'Team Management', 'Community'],
    },
  ],

  skills: [
    {
      category: 'Languages',
      skills: ['Java', 'C++', 'C', 'JavaScript', 'TypeScript', 'Python'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'Svelte', 'SvelteKit', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3', 'ES6+'],
    },
    {
      category: 'Backend & Tools',
      skills: [
        'MERN',
        'REST APIs',
        'Docker',
        'Firebase',
        'Neon',
        'Drizzle ORM',
        'Clerk',
        'Auth.js',
        'Kinde',
        'Sentry',
        'Vercel',
        'Netlify',
        'Git',
        'Postman',
      ],
    },
    {
      category: 'Data & ML',
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'NLP', 'FinBERT', 'LSTM', 'SHAP'],
    },
    {
      category: 'Agentic AI',
      skills: ['LangChain', 'LangGraph', 'LCEL', 'LLMs', 'RAG', 'Agentic Workflows', 'Tool Calling'],
    },
    {
      category: 'Ways of Working',
      skills: [
        'Project sizing & planning',
        'Agile',
        'Stakeholder engagement',
        'Analytical thinking',
        'Communication',
        'Adaptability',
      ],
    },
  ],

  toolkit: [
    'Python',
    'TypeScript',
    'Java',
    'C++',
    'React',
    'Next.js',
    'SvelteKit',
    'Tailwind CSS',
    'Node.js',
    'MongoDB',
    'Neon',
    'Drizzle ORM',
    'Docker',
    'Firebase',
    'Vercel',
    'LangChain',
    'LangGraph',
    'LLMs',
    'Pandas',
    'NumPy',
    'Git',
    'Postman',
  ],

  github: {
    username: 'hemang-bhat',
    url: '#',
    windowLabel: 'last 6 months',
    contributions: 420,
  },

  dsa: {
    solved: 250,
    total: 3400,
    easy: [120, 880],
    medium: [110, 1750],
    hard: [20, 770],
    rating: 1650,
    level: 'Specialist',
    ranking: 'Top 15%',
    contests: 12,
    activeDays: 180,
    maxStreak: 40,
    submissions: 600,
  },

  projects: [
    {
      title: 'OMERO',
      tagline: 'Omni-Modal Enterprise Research Orchestrator',
      summary:
        'A multi-tenant enterprise research platform that ingests PDF and audio documents, stores them as vector embeddings, and answers research queries through an internal retrieval pipeline with optional, redacted external AI delegation.',
      problem:
        'Enterprises need to search and reason over private documents — without ever leaking sensitive chunks to external AI services, and without a heavyweight infra footprint.',
      result:
        'Built across 12 phases: pgvector cosine retrieval with HNSW tuning, JWT auth + RBAC + document-level access control, PII redaction before any external delegation, async ingestion, query caching, and full Sentry distributed tracing. Backed by 306+ tests including 34+ Hypothesis property-based tests, and runs fully offline via an in-memory path.',
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Python 3.11', 'PostgreSQL', 'pgvector', 'Drizzle ORM', 'Sentry', 'Hypothesis', 'MCP'],
      links: [
        { label: 'Live demo', href: '#', external: true, kind: 'live' },
        { label: 'Source code', href: '#', external: true, kind: 'repo' },
      ],
      featured: true,
    },
    {
      title: 'TrackIQ Pro',
      tagline: 'Job & Internship Tracker + Decision Helper',
      summary:
        'A full-stack SaaS app for tracking job and internship applications, interview notes, pipeline stages, and offer comparisons.',
      problem:
        'Job seekers juggle scattered applications and emotional offer decisions with no single, trustworthy source of truth.',
      result:
        'Shipped a customizable offer-comparison matrix, CSV/PDF export, and Stripe-gated premium features — all behind secure auth and protected dashboards.',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Clerk', 'Stripe', 'Chart.js', 'jsPDF', 'Puppeteer'],
      links: [
        { label: 'Live demo', href: '#', external: true, kind: 'live' },
        { label: 'Source code', href: '#', external: true, kind: 'repo' },
      ],
      featured: false,
    },
    {
      title: 'Financial Sentiment & Stock Predictor',
      tagline: 'NLP + Forecasting with Explainability',
      summary:
        'An NLP and stock-prediction system that classifies financial text and forecasts next-day price movement.',
      problem:
        'News and market sentiment are noisy and hard to turn into trustworthy, explainable signals.',
      result:
        'Reached up to 94.25% test accuracy and 0.920 macro F1, with SHAP-based explainability and CI/CD test coverage.',
      tech: ['Python', 'NLP', 'FinBERT', 'LSTM', 'SHAP', 'GridSearchCV', 'Pytest', 'GitHub Actions'],
      links: [
        { label: 'Live demo', href: '#', external: true, kind: 'live' },
        { label: 'Source code', href: '#', external: true, kind: 'repo' },
      ],
      featured: false,
    },
    {
      title: "IEEE DSSYWLC '25 Web Portal",
      tagline: 'Large-Scale Event Registration Platform',
      summary: 'Registration and landing platform for the IEEE DSSYWLC event.',
      problem:
        'Large-scale event registration needs secure uploads, real-time data sync, and reliable automated communication.',
      result:
        'Built a direct-to-cloud upload flow, Google Sheets sync, email automation, and secure database workflows that scaled with demand.',
      tech: ['AWS S3', 'Google Sheets API v4', 'Brevo API', 'Neon Postgres', 'Drizzle ORM'],
      links: [
        { label: 'Live demo', href: '#', external: true, kind: 'live' },
        { label: 'Source code', href: '#', external: true, kind: 'repo' },
      ],
      featured: false,
    },
  ],

  certifications: [
    { title: 'Certification Title', issuer: 'Issuer', date: 'Add date', skills: ['Skill A', 'Skill B'] },
    { title: 'Certification Title', issuer: 'Issuer', date: 'Add date', skills: ['Skill A', 'Skill B'] },
    { title: 'Certification Title', issuer: 'Issuer', date: 'Add date', skills: ['Skill A', 'Skill B'] },
  ],

  credentials: {
    education: [
      {
        title: 'B.Tech, Computer Science & AI',
        org: 'Netaji Subhas University of Technology',
        duration: '2024 – 2028',
        detail: 'CGPA 7.82',
      },
      {
        title: 'Class XII (CBSE), PCM',
        org: 'K.V. JNU, New Delhi',
        duration: '2024',
        detail: '93%',
      },
      {
        title: 'Class X (CBSE)',
        org: 'K.V. JNU, New Delhi',
        duration: '2022',
        detail: '93%',
      },
    ],
    positions: [
      {
        title: 'Joint Secretary',
        org: 'IEEE NSUT',
        points: [
          'Organized hackathons, bootcamps & sessions for 300+ students.',
          'Led execution of 25+ technical events and hackathons.',
        ],
      },
    ],
    awards: [
      '1st Place — TDS-CONTEST DSA',
      '2nd Place — DSA-ALGOVERSE 3.0, IEEE NSUT',
      '250+ DSA problems solved on LeetCode, GfG & other platforms',
    ],
  },

  writing: [
    {
      title: 'Keeping Tenant Data Inside the Boundary',
      date: 'Notes',
      readTime: '4 min read',
      summary:
        'How I designed a redaction layer for OMERO that strips chunk fingerprints and blocks verbatim content before any payload leaves for external AI delegation.',
      body: [
        'When you let an internal research system call out to an external AI service, the hardest problem is not latency or cost — it is making sure private document content never crosses the tenant boundary by accident.',
        'In OMERO I solved this with a dedicated Redactor that sits in front of every external delegation call. Before a payload leaves, it truncates internal status fields, replaces chunk fingerprints with [REDACTED], and scans the outgoing question for any verbatim chunk content. If it finds a leak, it raises a ContentLeakError and the request never goes out.',
        'The lesson that stuck with me: security boundaries should fail loud and early. A redaction layer that silently passes bad data is worse than none at all, because it gives you false confidence. Making the failure an exception — not a warning — forced every delegation path to prove it was clean.',
      ],
    },
    {
      title: 'Designing AI Agents That Actually Ship',
      date: 'Notes',
      readTime: '3 min read',
      summary:
        'What I learned building and orchestrating LLM agents for real workflows — scoping the problem, constraining the model, and earning reliability.',
      body: [
        'The gap between an agent demo and an agent in production is mostly about constraints. A demo succeeds when the model gets lucky; a product succeeds when it cannot fail in ways that matter.',
        'Working on AI agents during my internship, the biggest shift was treating the LLM as one untrusted node in a deterministic graph — not as the orchestrator itself. Validation, retrieval, and fallback logic live in code I can test; the model only handles the step that genuinely needs language understanding.',
        'That structure makes agents debuggable. When something goes wrong you can point to the exact node, replay it, and fix it — instead of re-rolling a prompt and hoping.',
      ],
    },
    {
      title: 'From Brute Force to Intuition',
      date: 'Notes',
      readTime: '2 min read',
      summary:
        'How 250+ DSA problems reshaped the way I break down ambiguous engineering problems under constraints.',
      body: [
        'Solving 250+ DSA problems did not just make me faster at interviews. It changed how I read any problem: find the constraint that dominates, then design around it.',
        'Most real engineering problems are the same shape as a hard algorithm problem — there is a bottleneck, a set of invariants you must preserve, and a search space you want to shrink. The habit of asking "what is the actual constraint here?" transfers directly from a LeetCode hard to a slow API endpoint.',
      ],
    },
    {
      title: 'Explainability Is a Feature, Not an Afterthought',
      date: 'Notes',
      readTime: '3 min read',
      summary:
        'Why I leaned on SHAP for the financial sentiment model — trust matters more than a leaderboard score.',
      body: [
        'A model that hits 94% accuracy but cannot tell you why it made a call is hard to trust with real money. For the financial sentiment predictor, explainability was a requirement, not a nice-to-have.',
        'I used SHAP to surface which tokens and features drove each prediction. This did two things: it made the model auditable for anyone reviewing a signal, and it caught subtle data leakage I would have missed by staring at accuracy alone.',
        'The takeaway: a slightly less accurate model you can explain will almost always beat a black box in any setting where someone has to act on the output.',
      ],
    },
  ],

  contact: {
    closing:
      "I'm always up for building something ambitious — whether it's a product, an AI workflow, or a hard problem worth solving. Let's talk.",
    email: EMAIL,
    locations: ['New Delhi, India', 'Open to remote'],
    socials: [
      { label: 'Email', href: `mailto:${EMAIL}`, kind: 'email' },
      { label: 'GitHub', href: '#', external: true, kind: 'github' },
      { label: 'LinkedIn', href: '#', external: true, kind: 'linkedin' },
      { label: 'LeetCode', href: '#', external: true, kind: 'leetcode' },
    ],
  },

  closingQuote: {
    text: 'Build the thing, ship the thing, then make it better. Momentum beats perfection — every working product starts as a rough first commit.',
    author: 'Personal note',
  },

  footer: 'Designed & built by Hemang Bhat',
};
