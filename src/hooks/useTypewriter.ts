import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Cycles through words with a type / pause / delete loop. Static rotation if reduced motion. */
export function useTypewriter(words: string[], { typeMs = 55, deleteMs = 30, holdMs = 1600 } = {}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 3000);
      return () => window.clearInterval(id);
    }
    const word = words[index % words.length];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;

    const id = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [text, deleting, index, words, reduce, typeMs, deleteMs, holdMs]);

  return reduce ? words[index % words.length] : text;
}
