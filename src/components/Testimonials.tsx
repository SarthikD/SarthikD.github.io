import { Quote } from 'lucide-react';
import { testimonials } from '../data/content';
import { DevPlaceholder, isDev } from '../lib/placeholder';
import { Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';

/** Hides itself entirely when there are no testimonials (dev mode shows a reminder). */
export function Testimonials() {
  if (testimonials.length === 0) {
    if (!isDev) return null;
    return (
      <div className="container-x py-10 text-center">
        <DevPlaceholder text="[ADD: client testimonials in src/data/content.ts → testimonials (section hidden while empty)]" />
      </div>
    );
  }

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading id="testimonials-title" index="06" eyebrow="Testimonials" title="What clients say" />
        <Stagger as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem as="li" key={t.name + t.quote.slice(0, 12)} className="glass flex flex-col p-6">
              <Quote size={22} className="text-violet-300" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-slate-300">“{t.quote}”</blockquote>
              <p className="mt-6 text-sm">
                <span className="font-semibold text-white">{t.name}</span>
                <span className="block text-slate-500">
                  {t.role}
                  {t.company ? `, ${t.company}` : ''}
                </span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
