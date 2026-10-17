import { ArrowRight } from 'lucide-react';
import { services } from '../data/content';
import { Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          index="01"
          eyebrow="Services"
          title="What I can build for you"
          subtitle="From the first API endpoint to the app in your users’ hands: backend-first engineering that is built to scale and easy to hand over."
        />
        <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <StaggerItem
              as="li"
              key={s.title}
              className={`group glass relative flex flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-glow lg:col-span-2 ${
                i === 3 ? 'lg:col-start-2' : ''
              }`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-violet-500/15 text-cyan-300">
                <s.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm font-medium text-cyan-200/90">{s.benefit}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{s.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                {s.stack.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-10 text-center">
          <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200">
            Need something not listed? Let’s talk <ArrowRight size={15} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
