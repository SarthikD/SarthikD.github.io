import { ArrowUp, Mail } from 'lucide-react';
import { nav, site } from '../data/content';
import { link } from '../lib/placeholder';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export function Footer() {
  const year = new Date().getFullYear();
  const resume = link(site.resumeUrl);

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#top" className="font-display text-lg font-semibold text-white">
            {site.name}
          </a>
          <p className="mt-2 text-sm text-slate-400">
            {site.role}. Scalable backends and mobile apps for startups, agencies and small businesses.
          </p>
          <div className="mt-5 flex gap-2">
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-icon">
              <GithubIcon size={18} />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-icon">
              <LinkedinIcon size={18} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="footer-icon">
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-slate-400 transition hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
            {resume && (
              <li>
                <a href={resume} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition hover:text-white">
                  Resume
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="container-x mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <a href="#top" className="inline-flex items-center gap-1 hover:text-white">
          Back to top <ArrowUp size={13} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
