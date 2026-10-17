import { AnimatePresence, m } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { faqs, testimonials } from '../data/content';
import { Txt } from '../lib/placeholder';
import { Reveal } from './Motion';
import { SectionHeading } from './SectionHeading';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div className="container-x max-w-3xl">
        <SectionHeading id="faq-title" index={testimonials.length ? '07' : '06'} eyebrow="FAQ" title="Questions clients usually ask" />
        <Reveal>
          <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${baseId}-q${i}`;
              const panelId = `${baseId}-a${i}`;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-medium text-white transition hover:bg-white/[0.03] sm:px-6"
                    >
                      {f.q}
                      <Plus
                        size={18}
                        aria-hidden="true"
                        className={`shrink-0 text-cyan-300 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 leading-relaxed text-slate-400 sm:px-6">
                          <Txt>{f.a}</Txt>
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
