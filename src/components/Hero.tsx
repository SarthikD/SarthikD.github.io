import { m, useInView } from 'framer-motion';
import { ArrowRight, FileText, MapPin } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';
import { coreSkills, experience, hero, projects, site, skillGroups } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { useTypewriter } from '../hooks/useTypewriter';
import { link } from '../lib/placeholder';
import { MagneticButton } from './MagneticButton';
import { Terminal } from './Terminal';

// Real, derived facts only.
const now = new Date();
const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const firstStart = experience.map((r) => r.start).sort()[0];
const lastEnd = experience.map((r) => (r.end === 'Present' ? thisMonth : r.end)).sort().reverse()[0];
const monthsExp = (() => {
  const [y1, m1] = firstStart.split('-').map(Number);
  const [y2, m2] = lastEnd.split('-').map(Number);
  return (y2 - y1) * 12 + (m2 - m1);
})();
const stats = [
  { value: Math.floor((monthsExp / 12) * 10) / 10, decimals: 1, suffix: '+', label: 'years professional experience' },
  { value: projects.filter((p) => !p.placeholder).length, suffix: '', label: 'featured projects' },
  { value: coreSkills.length + skillGroups.reduce((n, g) => n + g.items.length, 0), suffix: '', label: 'technologies & tools' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const typed = useTypewriter(hero.typingWords);
  const ref = useRef<HTMLElement>(null);
  const resume = link(site.resumeUrl);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="hero-spotlight relative isolate overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0 animate-grid-pan" />
        <div className="absolute -left-32 top-10 h-[420px] w-[420px] animate-float rounded-full bg-cyan-500/20 blur-[110px]" />
        <div className="absolute -right-24 top-40 h-[460px] w-[460px] animate-float-slow rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          {site.availableForWork && (
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300"
            >
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" aria-hidden="true" />
              {site.availabilityText}
            </m.p>
          )}

          <m.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero.headlineStart} <span className="text-gradient animate-gradient-x bg-[length:200%_auto]">{hero.headlineAccent}</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            {hero.subline}
          </m.p>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex min-h-[1.75rem] flex-wrap items-center gap-x-2 font-mono text-sm text-slate-300 sm:text-base"
          >
            <span className="text-violet-300">{'>'}</span>
            <span>{hero.typingPrefix}</span>
            <span className="text-cyan-300" aria-live="off">
              {typed}
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-cyan-300" aria-hidden="true" />
            </span>
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact">
              Hire me <ArrowRight size={16} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost">
              View work
            </MagneticButton>
            {resume && (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2 py-3 text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline"
              >
                <FileText size={16} aria-hidden="true" /> Resume
              </a>
            )}
          </m.div>

          <p className="mt-6 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={14} aria-hidden="true" /> {site.location} · {site.remote}
          </p>

          <Stats />
        </div>

        <m.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="[perspective:1200px]"
        >
          <Terminal />
        </m.div>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <dl ref={ref} className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
      {stats.map((s) => (
        <Stat key={s.label} {...s} start={inView} />
      ))}
    </dl>
  );
}

function Stat({
  value,
  decimals = 0,
  suffix,
  label,
  start,
}: {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const n = useCountUp(value, start, undefined, decimals);
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-2xl font-semibold text-white sm:text-3xl">
        <span aria-hidden="true">
          {n.toFixed(decimals)}
          {suffix}
        </span>
        <span className="sr-only">
          {value.toFixed(decimals)}
          {suffix}
        </span>
      </dd>
      <dd aria-hidden="true" className="mt-1 text-xs leading-snug text-slate-500">
        {label}
      </dd>
    </div>
  );
}
