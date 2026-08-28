import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        glow: '0 20px 60px rgba(13, 148, 136, 0.16)',
        card: '0 10px 35px rgba(15, 23, 42, 0.06)',
        'card-lg': '0 24px 64px rgba(15, 23, 42, 0.12)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        modal: '0 32px 96px rgba(15, 23, 42, 0.28)'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(110deg, #102f61 5%, #1468a8 48%, #11b7a2 96%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(16,47,97,0.08), rgba(17,183,162,0.08))',
        'dark-surface': 'linear-gradient(160deg, #0c1629 0%, #0f2040 50%, #0a1f3a 100%)',
        'glow-teal': 'radial-gradient(circle, rgba(17,183,162,0.15) 0%, transparent 70%)',
        'glow-blue': 'radial-gradient(circle, rgba(20,104,168,0.15) 0%, transparent 70%)',
        'dot-matrix': 'radial-gradient(circle, rgba(15,47,97,0.07) 1px, transparent 1px)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'marquee': 'marquee 22s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    }
  },
  plugins: []
};

export default config;
