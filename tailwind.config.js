/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0f',
          900: '#0d0d14',
          800: '#12121b',
          700: '#1a1a26',
        },
        accent: {
          cyan: '#22d3ee',
          violet: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,0.25), 0 8px 40px -8px rgba(34,211,238,0.35)',
        'glow-violet': '0 0 0 1px rgba(139,92,246,0.3), 0 8px 40px -8px rgba(139,92,246,0.45)',
      },
      keyframes: {
        'grid-pan': { to: { backgroundPosition: '48px 48px' } },
        float: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '100%': { transform: 'translate3d(40px,-30px,0) scale(1.08)' },
        },
        blink: { '50%': { opacity: '0' } },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseDot: {
          '0%': { boxShadow: '0 0 0 0 rgba(52,211,153,0.6)' },
          '70%': { boxShadow: '0 0 0 8px rgba(52,211,153,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(52,211,153,0)' },
        },
      },
      animation: {
        'grid-pan': 'grid-pan 6s linear infinite',
        float: 'float 14s ease-in-out infinite alternate',
        'float-slow': 'float 20s ease-in-out infinite alternate-reverse',
        blink: 'blink 1s step-end infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'pulse-dot': 'pulseDot 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
