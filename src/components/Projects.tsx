import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import { projectFilters, projects, type Project } from '../data/content';
import { isDev, Txt } from '../lib/placeholder';
import { SectionHeading } from './SectionHeading';

const ProjectModal = lazy(() => import('./ProjectModal'));

type Filter = (typeof projectFilters)[number];

const visibleProjects = projects.filter((p) => isDev || !p.placeholder);

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const list = useMemo(
    () => (filter === 'All' ? visibleProjects : visibleProjects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  };

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="03"
          eyebrow="Selected work"
          title="Projects that solved real problems"
          subtitle="Each one started with a business problem. Here’s what I built and what it changed."
        />

        <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-2">
          {projectFilters.map((f) => {
            const activeF = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={activeF}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeF ? 'text-ink' : 'border border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {activeF && (
                  <m.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {f}
              </button>
            );
          })}
        </div>

        <m.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <m.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, delay: i * 0.05 } }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`group glass relative flex flex-col p-6 transition-[border-color,box-shadow] duration-300 hover:border-cyan-300/30 hover:shadow-glow ${
                  p.placeholder ? 'border-dashed !border-amber-400/50' : ''
                }`}
              >
                <div className="flex flex-wrap gap-1.5">
                  {p.categories.map((c) => (
                    <span key={c} className="rounded-md bg-violet-500/15 px-2 py-0.5 font-mono text-[11px] text-violet-200">
                      {c}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  <Txt>{p.title}</Txt>
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  <Txt>{p.tagline}</Txt>
                </p>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-rose-300/90">Problem</dt>
                    <dd className="mt-1 line-clamp-3 leading-relaxed text-slate-400">
                      <Txt>{p.problem}</Txt>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-emerald-300/90">Result</dt>
                    <dd className="mt-1 line-clamp-3 leading-relaxed text-slate-300">
                      <Txt>{p.result}</Txt>
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {p.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTrigger.current = e.currentTarget;
                      setSelected(p);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                    aria-haspopup="dialog"
                  >
                    Read case study <Maximize2 size={14} aria-hidden="true" />
                    <span className="sr-only">: {p.title}</span>
                  </button>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="ml-auto text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                  />
                </div>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal project={selected} onClose={close} />}</AnimatePresence>
      </Suspense>
    </section>
  );
}
