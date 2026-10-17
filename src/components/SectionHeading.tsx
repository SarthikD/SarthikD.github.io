import { Reveal } from './Motion';

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  id: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
        <span className="text-slate-500">{index} //</span> {eyebrow}
      </p>
      <h2 id={id} className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>}
    </Reveal>
  );
}
