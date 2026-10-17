/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE. Edit text in this file only.
 * ─────────────────────────────────────────────────────────────
 *
 *  Placeholders: any string that contains "[ADD: ...]"
 *    • `npm run dev`   → shown as an amber dashed marker so you can find it
 *    • `npm run build` → stripped automatically (and links that are still a
 *                        placeholder are hidden), so the live site never shows them.
 *  Search this file for "[ADD" to find everything you still need to fill in.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  ClipboardList,
  Code2,
  Database,
  Flame,
  Layers,
  MessagesSquare,
  Radio,
  Rocket,
  Server,
  Smartphone,
  Workflow,
} from 'lucide-react';

/* ───────────────────────────── Types ───────────────────────────── */

export type ProjectCategory = 'Backend' | 'Mobile' | 'Automation';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  categories: ProjectCategory[];
  tech: string[];
  problem: string;
  solution: string;
  result: string;
  highlights: string[];
  repoUrl: string;
  liveUrl?: string;
  /** Placeholder entries render only in dev mode. */
  placeholder?: boolean;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  benefit: string;
  description: string;
  stack: string[];
}

export interface CoreSkill {
  name: string;
  icon: LucideIcon;
  use: string;
  /** Real projects only. Leave empty if none yet. */
  usedIn: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Role {
  title: string;
  company: string;
  period: string;
  start: string; // ISO yyyy-mm, used for <time>
  end: string;
  bullets: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Faq {
  q: string;
  a: string;
}

/* ───────────────────────────── Site / profile ───────────────────────────── */

export const site = {
  name: 'Sarthik Dobariya',
  shortName: 'Sarthik',
  initials: 'SD',
  role: 'Backend-focused full-stack developer',
  location: 'Surat, Gujarat, India',
  remote: 'Available for remote work worldwide',
  timezone: 'IST (UTC+5:30)',
  email: 'sarthikbdobariya12@gmail.com',
  github: 'https://github.com/SarthikD',
  linkedin: 'https://linkedin.com/in/sarthik-dobariya',
  resumeUrl: '[ADD: resume/CV URL, e.g. put resume.pdf in /public and use "resume.pdf"]',
  bookCallUrl: '[ADD: Calendly / Cal.com booking link]',
  /** Path relative to /public, e.g. "profile.webp". Initials are shown until set. */
  photo: '[ADD: profile photo, e.g. profile.webp in /public]',
  /** Get a free key at https://web3forms.com (it is safe to expose publicly). */
  web3formsKey: '[ADD: Web3Forms access key]',
  availableForWork: true,
  availabilityText: 'Available for freelance projects',
  education: {
    degree: 'B.Tech in Information Technology',
    school: 'Uka Tarsadia University',
    period: '2021 – 2025',
  },
};

export const nav = [
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const;

/* ───────────────────────────── Hero ───────────────────────────── */

export const hero = {
  headlineStart: 'I build scalable backends and',
  headlineAccent: 'mobile apps that ship.',
  subline:
    'Backend-focused full-stack developer helping startups, agencies and small businesses turn ideas into reliable APIs, real-time features and cross-platform apps, without the hand-holding.',
  typingPrefix: 'Building',
  typingWords: [
    'NestJS & Node.js APIs',
    'Flutter mobile apps',
    'real-time features with WebSockets',
    'PostgreSQL + Prisma data models',
    'Firebase-powered products',
    'payment & email integrations',
    'automation workflows',
  ],
  terminal: [
    { cmd: 'whoami', out: ['sarthik-dobariya · backend-focused full-stack dev'] },
    {
      cmd: 'cat stack.json',
      out: [
        '{ "core": ["Node.js", "NestJS", "Flutter",',
        '           "PostgreSQL", "Prisma", "Firebase",',
        '           "WebSockets"] }',
      ],
    },
    { cmd: 'echo $LOCATION', out: ['Surat, IN · remote worldwide'] },
    { cmd: 'status --freelance', out: ['✔ available for new projects'] },
  ],
};

/* ───────────────────────────── Services ───────────────────────────── */

export const services: Service[] = [
  {
    icon: Server,
    title: 'API & NestJS backend development',
    benefit: 'A clean, documented backend your team can build on for years.',
    description:
      'REST APIs with Node.js, NestJS and Express in TypeScript: auth, validation, background jobs and the multi-step business logic your product depends on.',
    stack: ['NestJS', 'Node.js', 'Express', 'TypeScript'],
  },
  {
    icon: Radio,
    title: 'Real-time apps with WebSockets',
    benefit: 'Live updates your users feel instantly, with no refresh button.',
    description:
      'Chat, live dashboards, notifications and leaderboards built on WebSockets, Redis and queue-driven updates that stay consistent under load.',
    stack: ['WebSockets', 'Redis', 'BullMQ'],
  },
  {
    icon: Smartphone,
    title: 'Flutter cross-platform mobile apps',
    benefit: 'One codebase for Android and iOS, so you ship faster for less.',
    description:
      'Flutter (Dart) apps wired to your backend or Firebase, from MVP to store-ready, plus native Android with Kotlin & Jetpack Compose when needed.',
    stack: ['Flutter', 'Dart', 'Firebase', 'Kotlin'],
  },
  {
    icon: Database,
    title: 'Database design: PostgreSQL, Prisma & Firebase',
    benefit: 'Data models that stay fast and safe as your product grows.',
    description:
      'Schema design, migrations and type-safe queries with PostgreSQL + Prisma, or Firebase Auth / Realtime Database when you need to move quickly.',
    stack: ['PostgreSQL', 'Prisma', 'Firebase', 'MongoDB'],
  },
  {
    icon: Workflow,
    title: 'Integrations & automation workflows',
    benefit: 'Hand off the repetitive work to systems that run themselves.',
    description:
      'Payments, email, print-on-demand and CRM integrations, scheduled jobs, scrapers and n8n workflows that remove manual steps from your operations.',
    stack: ['Stripe', 'SendGrid', 'Klaviyo', 'n8n', 'Puppeteer'],
  },
];

/* ───────────────────────────── Skills ───────────────────────────── */

export const coreSkills: CoreSkill[] = [
  { name: 'Node.js', icon: Server, use: 'Production APIs, workers & job queues', usedIn: ['Winchurch', 'Crickedge'] },
  { name: 'NestJS', icon: Boxes, use: 'Structured, modular TypeScript backends', usedIn: [] },
  { name: 'Flutter (Dart)', icon: Smartphone, use: 'Cross-platform Android & iOS apps', usedIn: [] },
  { name: 'PostgreSQL', icon: Database, use: 'Relational data modelling & queries', usedIn: [] },
  { name: 'Prisma', icon: Layers, use: 'Type-safe ORM, schema & migrations', usedIn: ['Winchurch'] },
  { name: 'Firebase', icon: Flame, use: 'Auth, Realtime Database & app backends', usedIn: ['Android messaging app'] },
  { name: 'WebSockets', icon: Radio, use: 'Live, bi-directional client updates', usedIn: [] },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Backend & languages', items: ['Express.js', 'TypeScript', 'Kotlin'] },
  { title: 'Data, queues & scheduling', items: ['MongoDB / Mongoose', 'Redis', 'BullMQ', 'Cron jobs'] },
  { title: 'Payments, email & commerce', items: ['Stripe', 'SendGrid', 'Klaviyo', 'Azure Email', 'Gelato'] },
  { title: 'Automation & scraping', items: ['n8n', 'OpenClaw', 'Puppeteer', 'Cheerio'] },
  { title: 'Mobile & frontend', items: ['Jetpack Compose', 'React'] },
  { title: 'DevOps & tooling', items: ['Docker', 'Git', 'Postman', 'New Relic'] },
];

/* ───────────────────────────── Projects ───────────────────────────── */

export const projectFilters = ['All', 'Backend', 'Mobile', 'Automation'] as const;

export const projects: Project[] = [
  {
    id: 'storybook-ai',
    title: 'Storybook AI',
    tagline: 'Personalised children’s storybook platform',
    categories: ['Backend'],
    tech: ['Express.js', 'MongoDB', 'Stripe', 'Gelato', 'Klaviyo'],
    problem:
      'A personalised-book product has to coordinate payment, AI generation, printing and customer emails, and generating or printing a book before it is paid for costs real money.',
    solution:
      'Designed a multi-step checkout API that enforces payment-before-generation with Stripe, then hands paid orders to Gelato print-on-demand fulfilment and Klaviyo email workflows across async, multi-stage pipelines.',
    result:
      'Generation and printing only start once an order is paid, and customers are kept informed automatically at each stage, from purchase to print.',
    highlights: [
      'Payment-gated, multi-step checkout flow',
      'Gelato print-on-demand fulfilment integration',
      'Klaviyo email workflows tied to pipeline stages',
      'Async multi-stage processing pipeline',
    ],
    repoUrl: '[ADD: GitHub repo URL for Storybook AI (or leave as-is to hide)]',
  },
  {
    id: 'winchurch',
    title: 'Winchurch',
    tagline: 'Email management platform with claim workflows',
    categories: ['Backend'],
    tech: ['Node.js', 'Express', 'Prisma', 'Azure Email Service'],
    problem:
      'The team needed to handle the whole email lifecycle and route claims to the right people from one platform, not across scattered inboxes.',
    solution:
      'Built backend support for the full email lifecycle (send, reply, forward, drafts and folders) on Azure Email Service, plus claim assignment and unassignment workflows, with a Prisma-backed data layer.',
    result:
      'Email handling and claim ownership live in one system, with a clear record of who is responsible for each claim.',
    highlights: [
      'Send, reply, forward, draft & folder management',
      'Azure Email Service integration',
      'Claim assignment / unassignment workflows',
      'Type-safe data access with Prisma',
    ],
    repoUrl: '[ADD: GitHub repo URL for Winchurch (or leave as-is to hide)]',
  },
  {
    id: 'crickedge',
    title: 'Crickedge',
    tagline: 'Fantasy cricket backend',
    categories: ['Backend'],
    tech: ['Node.js', 'Express', 'Mongoose', 'BullMQ', 'Cron'],
    problem:
      'Fantasy sports users expect points, rankings and commentary to update as the match unfolds, and manual updates can’t keep up.',
    solution:
      'Built a point calculation engine, real-time leaderboards and match commentary, with automated score refresh driven by BullMQ queues and Cron schedules.',
    result:
      'Scores, points and leaderboards refresh automatically throughout a match, without anyone triggering updates by hand.',
    highlights: [
      'Fantasy point calculation engine',
      'Real-time leaderboards',
      'Match commentary feed',
      'Automated score refresh with BullMQ + Cron',
    ],
    repoUrl: '[ADD: GitHub repo URL for Crickedge (or leave as-is to hide)]',
  },
  {
    id: 'hrms-automation',
    title: 'HRMS Recruitment Automation',
    tagline: 'End-to-end hiring pipeline, automated',
    categories: ['Automation'],
    tech: ['n8n', 'OpenClaw'],
    problem:
      'Recruiters were spending their time opening emails, downloading CVs and screening resumes by hand before candidates ever reached the HRMS.',
    solution:
      'Automated the full pipeline: email receipt, attachment extraction, resume parsing, candidate creation, interview scheduling and HRMS sync, orchestrated in n8n with OpenClaw.',
    result: 'Manual resume screening was removed from the process; candidates flow from inbox to HRMS automatically.',
    highlights: [
      'Inbound email & attachment extraction',
      'Automated resume parsing',
      'Candidate creation & interview scheduling',
      'Sync with the HRMS',
    ],
    repoUrl: '[ADD: GitHub repo URL for HRMS Automation (or leave as-is to hide)]',
  },
  {
    id: 'rail-scraper',
    title: 'Train & Station Data Scraper',
    tagline: 'Queue-driven data collection system',
    categories: ['Automation', 'Backend'],
    tech: ['Node.js', 'Puppeteer', 'Cheerio', 'BullMQ'],
    problem:
      'Train and station data had to be collected from web sources reliably, without hammering the sources or failing on dynamic pages.',
    solution:
      'Built a scraping system using Puppeteer for dynamic pages and Cheerio for fast HTML parsing, with jobs distributed through BullMQ and controlled concurrency.',
    result: 'Data collection runs as managed background jobs with predictable, controlled load on the sources.',
    highlights: [
      'Puppeteer for JavaScript-rendered pages',
      'Cheerio for lightweight parsing',
      'BullMQ job queue with concurrency control',
    ],
    repoUrl: '[ADD: GitHub repo URL for the scraper (or leave as-is to hide)]',
  },
  {
    id: 'android-messenger',
    title: 'Real-time Android Messenger',
    tagline: 'Native chat app on Firebase',
    categories: ['Mobile'],
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase Auth', 'Firebase Realtime Database', 'MVVM'],
    problem: 'A messaging app needs secure sign-in and messages that appear instantly, without building and running a custom server.',
    solution:
      'Built a native Android app with Jetpack Compose and an MVVM architecture, using Firebase Authentication for sign-in and Firebase Realtime Database for live message sync.',
    result: 'Messages sync in real time between users, on a clean, maintainable architecture with no custom server to run.',
    highlights: ['Firebase Authentication', 'Realtime Database message sync', 'Jetpack Compose UI', 'MVVM architecture'],
    repoUrl: '[ADD: GitHub repo URL for the Android messenger (or leave as-is to hide)]',
  },
  // ── Dev-only placeholders: replace with real case studies, then remove `placeholder: true`
  {
    id: 'flutter-case-study',
    title: '[ADD: Flutter project title]',
    tagline: '[ADD: Flutter case study one-liner]',
    categories: ['Mobile'],
    tech: ['Flutter', 'Dart'],
    problem: '[ADD: the client problem]',
    solution: '[ADD: what you built with Flutter]',
    result: '[ADD: the real outcome]',
    highlights: [],
    repoUrl: '[ADD: repo URL]',
    placeholder: true,
  },
  {
    id: 'websocket-case-study',
    title: '[ADD: WebSocket / real-time project title]',
    tagline: '[ADD: real-time case study one-liner]',
    categories: ['Backend'],
    tech: ['WebSockets', 'NestJS'],
    problem: '[ADD: the client problem]',
    solution: '[ADD: what you built with WebSockets]',
    result: '[ADD: the real outcome]',
    highlights: [],
    repoUrl: '[ADD: repo URL]',
    placeholder: true,
  },
];

/* ───────────────────────────── Experience ───────────────────────────── */

export const experience: Role[] = [
  {
    title: 'Software Developer',
    company: 'YoHOsys',
    period: 'Sep 2026 – Present',
    start: '2026-09',
    end: 'Present',
    bullets: [
      'Develop and maintain scalable backend APIs using Node.js, NestJS, Prisma, and PostgreSQL for the Haven platform.',
      'Implement backend features for user management, Haven Circles, incident tracking, evidence management, and data export.',
      'Develop Flutter applications and integrate REST APIs, authentication flows, and backend services.',
      'Implement real-time communication using WebSockets and Socket.IO for live messaging and event-driven features.',
      'Integrate Firebase Phone Authentication for OTP verification and coordinate authentication flows between Flutter and backend APIs.',
      'Manage database schemas, relationships, queries, and pagination using Prisma ORM and PostgreSQL.',
      'Work with Docker and AWS deployment environments to support application configuration and deployment troubleshooting.',
      'Follow Clean Architecture principles to build maintainable, reusable, and scalable application components.'
    ],
  },
  {
    title: 'Software Developer',
    company: 'MatlabInfotech',
    period: 'Jun 2025 – Jul 2026',
    start: '2025-06',
    end: '2026-07',
    bullets: [
      'Built a payment-gated, multi-step checkout API for an AI storybook platform, integrating Stripe, Gelato print-on-demand and Klaviyo email workflows.',
      'Delivered the full email lifecycle (send, reply, forward, drafts, folders) on Azure Email Service, plus claim assignment workflows, using Prisma.',
      'Engineered a fantasy cricket backend with a points engine, real-time leaderboards and automated score refresh via BullMQ + Cron.',
      'Automated an end-to-end recruitment pipeline with n8n and OpenClaw, removing manual resume screening.',
    ],
  },
  {
    title: 'Software Intern',
    company: 'MatlabInfotech',
    period: 'Dec 2024 – Jun 2025',
    start: '2024-12',
    end: '2025-06',
    bullets: [
      '[ADD: 2–3 concrete highlights from your internship, e.g. what you built, shipped or learned]',
      'Moved into the Software Developer role in June 2025.',
    ],
  },
];

/* ───────────────────────────── Process ───────────────────────────── */

export const processSteps: ProcessStep[] = [
  {
    icon: MessagesSquare,
    title: 'Discuss',
    description: 'A free call to understand your goals, users, constraints and budget, so we agree on what “done” means before any code.',
  },
  {
    icon: ClipboardList,
    title: 'Plan',
    description: 'A written scope with milestones, tech choices and a clear quote. No surprises, and you approve everything upfront.',
  },
  {
    icon: Code2,
    title: 'Build',
    description: 'Iterative development in your repository with regular progress updates, demos and an API you can test as it grows.',
  },
  {
    icon: Rocket,
    title: 'Deliver & support',
    description: 'Deployment, documentation and handover, with post-launch support so you’re never left alone with the code.',
  },
];

/* ───────────────────────────── Testimonials ─────────────────────────────
 * Leave the array empty and the whole section hides itself.
 * Example entry:
 *   { quote: '...', name: 'Jane Doe', role: 'CTO', company: 'Acme' },
 */
export const testimonials: Testimonial[] = [];

/* ───────────────────────────── FAQ ─────────────────────────────
 * These describe how you work. Review and edit them to match your own policies.
 */
export const faqs: Faq[] = [
  {
    q: 'How do you price projects?',
    a: 'Well-defined projects get a fixed-price quote after a short discovery call, so you know the cost upfront. Ongoing or evolving work can be billed hourly or as a monthly retainer. [ADD: optional starting rate or package range]',
  },
  {
    q: 'How long will my project take?',
    a: 'It depends on scope. After our first call I share a written plan with milestones and a realistic timeline. Focused tasks like a single integration move fastest; larger products are split into weekly milestones so you see working software early.',
  },
  {
    q: 'How will we communicate?',
    a: 'Whatever suits you: email, Slack, WhatsApp, Google Meet or Zoom. You get regular progress updates, and you have access to the code repository from day one.',
  },
  {
    q: 'You’re in India. What about time zones?',
    a: 'I’m based in Surat, India (IST, UTC+5:30) and work remotely with clients worldwide. I keep a few hours of overlap with your working day for calls and quick feedback, and use async updates for everything else.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. Once the project is paid for, all source code, documentation and access credentials are yours. Wherever possible I work directly in repositories and accounts that you own.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. Every project includes a post-launch support window for fixes [ADD: length of included support, e.g. 30 days], and ongoing maintenance or new features can be arranged after that.',
  },
];

/* ───────────────────────────── Contact ───────────────────────────── */

export const contact = {
  heading: 'Let’s build something that ships.',
  subline:
    'Tell me about your project: what you’re building, your timeline and your budget. I usually reply within [ADD: typical reply time, e.g. 24 hours].',
  budgets: ['Not sure yet', '< $1k', '$1k – $3k', '$3k – $10k', '$10k+'],
};
