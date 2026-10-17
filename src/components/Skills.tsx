import { m } from 'framer-motion';
import { coreSkills, skillGroups } from '../data/content';
import { Reveal, Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          index="02"
          eyebrow="Skills"
          title="A backend-first toolkit"
          subtitle="The core stack I lead with, backed by the tools and integrations I’ve used in production work."
        />

        <Reveal>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Core stack</h3>
        </Reveal>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreSkills.map((s) => (
            <StaggerItem
              as="li"
              key={s.name}
              className="group relative rounded-2xl bg-gradient-to-br from-cyan-400/40 via-white/10 to-violet-500/40 p-px transition hover:shadow-glow"
            >
              <div className="flex h-full flex-col rounded-[15px] bg-ink-900/95 p-5">
                <div className="flex items-center gap-3">
                  <m.span
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300"
                  >
                    <s.icon size={20} aria-hidden="true" />
                  </m.span>
                  <span className="font-display text-base font-semibold text-white">{s.name}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.use}</p>
                {s.usedIn.length > 0 && (
                  <p className="mt-3 font-mono text-[11px] text-emerald-300/90">
                    <span className="text-slate-500">used in:</span> {s.usedIn.join(', ')}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Supporting stack</h3>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <StaggerItem key={g.title} className="glass p-5">
              <h4 className="text-sm font-semibold text-slate-200">{g.title}</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-300 transition hover:border-violet-400/50 hover:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
