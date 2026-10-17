import { Fragment } from 'react';

const IS_DEV = import.meta.env.DEV;
const PLACEHOLDER_RE = /(\[ADD:[^\]]*\])/g;

/** True when a value is empty or still an "[ADD: ...]" placeholder. */
export function isPlaceholder(value?: string | null): boolean {
  return !value || value.trim().startsWith('[ADD');
}

/** Strip placeholders from text (used for attributes like alt/aria-label). */
export function stripPlaceholders(text: string): string {
  return text.replace(PLACEHOLDER_RE, '').replace(/\s{2,}/g, ' ').trim();
}

/** Resolve a /public asset path against Vite's base URL (needed for GitHub Pages sub-paths). */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

/** A link target, or null if it's still a placeholder. */
export function link(url?: string | null): string | null {
  if (isPlaceholder(url)) return null;
  return asset(url!);
}

/** Visible amber marker in dev; renders nothing in production. */
export function DevPlaceholder({ text }: { text: string }) {
  if (!IS_DEV) return null;
  return (
    <span
      title="Placeholder: only visible in dev mode"
      className="mx-0.5 inline rounded border border-dashed border-amber-400/70 bg-amber-400/10 px-1.5 py-0.5 font-mono text-[0.75em] text-amber-300"
    >
      {text}
    </span>
  );
}

/**
 * Renders a string, turning any "[ADD: ...]" segments into dev-only markers.
 * In production those segments are removed.
 */
export function Txt({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER_RE);
  if (parts.length === 1) return <>{children}</>;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[ADD:') ? <DevPlaceholder key={i} text={part} /> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** Is a text value fully a placeholder? Used to hide whole list items in prod. */
export function showText(text: string): boolean {
  return IS_DEV || stripPlaceholders(text).length > 0;
}

export const isDev = IS_DEV;
