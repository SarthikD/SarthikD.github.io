import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, CalendarDays, CheckCircle2, Copy, Loader2, Mail, Phone, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { contact, site, testimonials } from '../data/content';
import { DevPlaceholder, isPlaceholder, link, Txt } from '../lib/placeholder';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { Reveal } from './Motion';
import { SectionHeading } from './SectionHeading';

type Status = 'idle' | 'sending' | 'success' | 'error';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const hasKey = !isPlaceholder(site.web3formsKey);
  const bookCall = link(site.bookCallUrl);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields
    if (data.get('botcheck')) return;

    // No key configured yet: fall back to the visitor's email client
    if (!hasKey) {
      const subject = encodeURIComponent(`Project enquiry from ${data.get('name')}`);
      const body = encodeURIComponent(
        `${data.get('message')}\n\nBudget: ${data.get('budget')}\nFrom: ${data.get('name')} <${data.get('email')}>`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    setError('');
    data.append('access_key', site.web3formsKey);
    data.append('subject', `New portfolio enquiry from ${data.get('name')}`);
    data.append('from_name', 'Portfolio contact form');

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = (await res.json()) as { success: boolean; message?: string };
      if (!res.ok || !json.success) throw new Error(json.message || 'Something went wrong.');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; ignore */
    }
  }

  const inputCls =
    'mt-1.5 w-full rounded-xl border border-white/10 bg-ink-800/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/30';

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="container-x">
        <SectionHeading id="contact-title" index={testimonials.length ? '08' : '07'} eyebrow="Contact" title={contact.heading} />
        <Reveal className="-mt-8 mb-12 text-center text-slate-400 sm:-mt-12">
          <p className="mx-auto max-w-2xl">
            <Txt>{contact.subline}</Txt>
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          {/* Direct links */}
          <Reveal className="flex flex-col gap-4">
            <a href={`mailto:${site.email}`} className="glass group flex items-center gap-4 p-5 transition hover:border-cyan-300/40 hover:shadow-glow">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-slate-400">Email me</span>
                <span className="block truncate font-medium text-white">{site.email}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 self-start px-1 text-xs text-slate-400 hover:text-white"
              aria-live="polite"
            >
              <Copy size={13} aria-hidden="true" /> {copied ? 'Copied!' : 'Copy email address'}
            </button>

            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="glass group flex items-center gap-4 p-5 transition hover:border-cyan-300/40 hover:shadow-glow">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <Phone size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-slate-400">Call me</span>
                <span className="block truncate font-medium text-white">{site.phone}</span>
              </span>
            </a>

            {bookCall ? (
              <a
                href={bookCall}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 p-5 transition hover:border-violet-400/40 hover:shadow-glow-violet"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
                  <CalendarDays size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-slate-400">Prefer to talk?</span>
                  <span className="block font-medium text-white">Book a free intro call</span>
                </span>
              </a>
            ) : (
              <DevPlaceholder text={site.bookCallUrl} />
            )}

            <div className="grid grid-cols-2 gap-4">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center justify-center gap-2 p-4 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:shadow-glow"
              >
                <LinkedinIcon size={18} /> LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center justify-center gap-2 p-4 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:shadow-glow"
              >
                <GithubIcon size={18} /> GitHub
              </a>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Based in {site.location} · {site.timezone} · {site.remote.toLowerCase()}.
            </p>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass p-6 sm:p-8" noValidate={false}>
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-200">
                  Name
                  <input name="name" required autoComplete="name" className={inputCls} placeholder="Your name" />
                </label>
                <label className="block text-sm font-medium text-slate-200">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@company.com" />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-slate-200">
                Budget <span className="font-normal text-slate-500">(optional)</span>
                <select name="budget" className={inputCls} defaultValue={contact.budgets[0]}>
                  {contact.budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
              <label className="mt-5 block text-sm font-medium text-slate-200">
                Project details
                <textarea
                  name="message"
                  required
                  rows={5}
                  minLength={10}
                  className={`${inputCls} resize-y`}
                  placeholder="What are you building, what do you need help with, and when do you need it?"
                />
              </label>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-[length:200%_auto] px-5 py-3.5 text-sm font-semibold text-ink shadow-glow transition-[background-position,box-shadow] duration-500 hover:bg-right hover:shadow-glow-violet disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send size={16} aria-hidden="true" />
                  </>
                )}
              </button>
              {!hasKey && (
                <p className="mt-3 text-center text-xs text-slate-500">
                  Opens your email app. <DevPlaceholder text={site.web3formsKey} />
                </p>
              )}

              <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <m.p
                      key="ok"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-emerald-300"
                    >
                      <CheckCircle2 size={16} aria-hidden="true" /> Thanks! Your message is on its way. I’ll get back to you soon.
                    </m.p>
                  )}
                  {status === 'error' && (
                    <m.p
                      key="err"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-rose-300"
                    >
                      <AlertCircle size={16} aria-hidden="true" /> {error} You can also email me directly at {site.email}.
                    </m.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
