import { useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { hero } from '../data/content';

type Line = { kind: 'cmd' | 'out'; text: string };

/** Animated terminal that "types" commands and prints their output. */
export function Terminal() {
  const reduce = useReducedMotion();
  const lines = useMemo<Line[]>(
    () => hero.terminal.flatMap((b) => [{ kind: 'cmd', text: b.cmd } as Line, ...b.out.map((o) => ({ kind: 'out', text: o }) as Line)]),
    [],
  );
  const total = lines.length;

  // lineIdx = how many lines are fully shown; charIdx = chars typed of current cmd line
  const [lineIdx, setLineIdx] = useState(reduce ? total : 0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (reduce) {
      setLineIdx(total);
      return;
    }
    if (lineIdx >= total) {
      // loop after a pause
      const id = window.setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
      }, 6000);
      return () => window.clearTimeout(id);
    }
    const line = lines[lineIdx];
    if (line.kind === 'out') {
      const id = window.setTimeout(() => setLineIdx((i) => i + 1), 140);
      return () => window.clearTimeout(id);
    }
    if (charIdx < line.text.length) {
      const id = window.setTimeout(() => setCharIdx((c) => c + 1), 45 + Math.random() * 45);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 380);
    return () => window.clearTimeout(id);
  }, [lineIdx, charIdx, lines, total, reduce]);

  const plain = hero.terminal.map((b) => `$ ${b.cmd}\n${b.out.join('\n')}`).join('\n');

  return (
    <figure className="glass relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(139,92,246,0.35)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <figcaption className="ml-2 font-mono text-xs text-slate-500">~/sarthik — zsh</figcaption>
      </div>
      <pre className="sr-only">{plain}</pre>
      <div aria-hidden="true" className="min-h-[248px] px-4 py-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        {lines.slice(0, Math.min(lineIdx + 1, total)).map((line, i) => {
          const isCurrent = i === lineIdx && lineIdx < total;
          if (line.kind === 'cmd') {
            const shown = isCurrent ? line.text.slice(0, charIdx) : line.text;
            return (
              <div key={i} className="whitespace-pre-wrap break-words">
                <span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span>{' '}
                <span className="text-slate-100">{shown}</span>
                {isCurrent && <Caret />}
              </div>
            );
          }
          if (isCurrent) return null;
          const ok = line.text.startsWith('✔');
          return (
            <div key={i} className={`whitespace-pre-wrap break-words ${ok ? 'text-emerald-300' : 'text-violet-200/90'}`}>
              {line.text}
            </div>
          );
        })}
        {lineIdx >= total && (
          <div>
            <span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span> <Caret />
          </div>
        )}
      </div>
    </figure>
  );
}

function Caret() {
  return <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cyan-300" />;
}
