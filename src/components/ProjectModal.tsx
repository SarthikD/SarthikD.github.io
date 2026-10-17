import { m } from 'framer-motion';
import { Check, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Project } from '../data/content';
import { DevPlaceholder, isPlaceholder, link, Txt } from '../lib/placeholder';
import { GithubIcon } from './BrandIcons';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const repo = link(project.repoUrl);
  const live = link(project.liveUrl);

  // Esc to close, focus trap, scroll lock
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const titleId = `modal-title-${project.id}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <m.div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/10 bg-ink-900 p-6 shadow-glow-violet sm:rounded-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label="Close case study"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <X size={18} />
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">{project.categories.join(' · ')}</p>
        <h3 id={titleId} className="mt-2 pr-10 font-display text-2xl font-semibold text-white sm:text-3xl">
          <Txt>{project.title}</Txt>
        </h3>
        <p className="mt-1 text-slate-400">
          <Txt>{project.tagline}</Txt>
        </p>

        <div className="mt-8 space-y-6">
          <Block label="The problem" color="text-rose-300" text={project.problem} />
          <Block label="The solution" color="text-cyan-300" text={project.solution} />
          <Block label="The result" color="text-emerald-300" text={project.result} />
        </div>

        {project.highlights.length > 0 && (
          <div className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500">Key features</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-slate-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500">Tech stack</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
          {repo ? (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-cyan-300/50 hover:shadow-glow"
            >
              <GithubIcon size={16} /> View code
            </a>
          ) : (
            isPlaceholder(project.repoUrl) && <DevPlaceholder text={project.repoUrl} />
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-cyan-300/50 hover:shadow-glow"
            >
              <ExternalLink size={16} aria-hidden="true" /> Live site
            </a>
          )}
          <a
            href="#contact"
            onClick={onClose}
            className="ml-auto inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-300 to-violet-400 px-4 py-2 text-sm font-semibold text-ink hover:shadow-glow"
          >
            Build something similar
          </a>
        </div>
      </m.div>
    </div>
  );
}

function Block({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div>
      <h4 className={`font-mono text-xs uppercase tracking-wider ${color}`}>{label}</h4>
      <p className="mt-2 leading-relaxed text-slate-300">
        <Txt>{text}</Txt>
      </p>
    </div>
  );
}
