import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

type Variant = 'primary' | 'ghost';

const styles: Record<Variant, string> = {
  primary:
    'text-ink bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-[length:200%_auto] hover:bg-right shadow-glow hover:shadow-glow-violet',
  ghost: 'text-white border border-white/15 bg-white/[0.03] hover:border-cyan-300/50 hover:bg-white/[0.06] hover:shadow-glow',
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

/** Link-styled button that is gently pulled toward the cursor. */
export function MagneticButton({ href, children, variant = 'primary', className = '', external, onClick }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.a
      href={href}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-[background-position,box-shadow,border-color,background-color] duration-500 ${styles[variant]} ${className}`}
    >
      {children}
    </m.a>
  );
}
