import { m } from 'framer-motion';
import { Briefcase, GraduationCap, Globe2, MapPin } from 'lucide-react';
import { experience, site } from '../data/content';
import { asset, isPlaceholder, showText, Txt } from '../lib/placeholder';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { Reveal } from './Motion';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  const hasPhoto = !isPlaceholder(site.photo);

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="04"
          eyebrow="Experience"
          title="Where I’ve been shipping"
          subtitle="Real production work on client products: payments, email, real-time data and automation."
        />

        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* About card */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="glass p-6">
              <div className="flex items-center gap-4">
                {hasPhoto ? (
                  <img
                    src={asset(site.photo)}
                    alt={`Portrait of ${site.name}`}
                    width={72}
                    height={72}
                    loading="lazy"
                    decoding="async"
                    className="h-[72px] w-[72px] rounded-2xl object-cover ring-1 ring-white/15"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`${site.name} initials`}
                    className="grid h-[72px] w-[72px] place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-display text-2xl font-bold text-ink"
                  >
                    {site.initials}
                  </div>
                )}
                <div>
                  <p className="font-display text-lg font-semibold text-white">{site.name}</p>
                  <p className="text-sm text-slate-400">{site.role}</p>
                </div>
              </div>
              {!hasPhoto && (
                <p className="mt-3">
                  <Txt>{site.photo}</Txt>
                </p>
              )}
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <MapPin size={18} className="shrink-0 text-cyan-300" aria-hidden="true" /> {site.location}
                </li>
                <li className="flex gap-3">
                  <Globe2 size={18} className="shrink-0 text-cyan-300" aria-hidden="true" /> {site.remote}
                </li>
                <li className="flex gap-3">
                  <GraduationCap size={18} className="shrink-0 text-cyan-300" aria-hidden="true" />
                  <span>
                    {site.education.degree}
                    <span className="block text-slate-500">
                      {site.education.school} · {site.education.period}
                    </span>
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex gap-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-cyan-300/50 hover:text-white hover:shadow-glow"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-cyan-300/50 hover:text-white hover:shadow-glow"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
          <m.div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <ol className="space-y-10 border-l border-white/10 pl-8">
            {experience.map((role, i) => (
              <li key={role.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[49px] top-1 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink-800 text-cyan-300 shadow-glow"
                >
                  <Briefcase size={15} />
                </span>
                <Reveal delay={i * 0.1}>
                  <div className="glass p-6">
                    <p className="font-mono text-xs text-cyan-300">
                      <time dateTime={role.start}>{role.period.split('–')[0].trim()}</time> –{' '}
                      <time dateTime={role.end}>{role.period.split('–')[1]?.trim()}</time>
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{role.title}</h3>
                    <p className="text-sm text-slate-400">{role.company}</p>
                    <ul className="mt-4 space-y-2.5">
                      {role.bullets.filter(showText).map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
                          <span>
                            <Txt>{b}</Txt>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
