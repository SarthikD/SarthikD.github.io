import { processSteps } from '../data/content';
import { Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          index="05"
          eyebrow="How I work"
          title="A simple, transparent process"
          subtitle="You always know what’s being built, when it’s landing and what it costs."
        />
        <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
        />
        <Stagger as="ol" className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="glass group relative p-6 transition hover:border-violet-400/40 hover:shadow-glow-violet">
              <div className="flex items-center justify-between">
                <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-ink-800 text-cyan-300 transition group-hover:text-violet-300">
                  <step.icon size={22} aria-hidden="true" />
                </span>
                <span className="font-mono text-3xl font-medium text-white/10" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
        </div>
      </div>
    </section>
  );
}
