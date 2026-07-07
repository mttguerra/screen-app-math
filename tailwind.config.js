/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        ink2: 'rgb(var(--ink2) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        muted2: 'rgb(var(--muted2) / <alpha-value>)',
        muted3: 'rgb(var(--muted3) / <alpha-value>)',
        muted4: 'rgb(var(--muted4) / <alpha-value>)',

        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        cardDeep: 'rgb(var(--card-deep) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        line2: 'rgb(var(--line2) / <alpha-value>)',
        icobtn: 'rgb(var(--icobtn) / <alpha-value>)',
        chip: 'rgb(var(--chip) / <alpha-value>)',
        chipDeep: 'rgb(var(--chip-deep) / <alpha-value>)',
        cat: 'rgb(var(--cat) / <alpha-value>)',
        done: 'rgb(var(--done) / <alpha-value>)',
        doneLine: 'rgb(var(--done-line) / <alpha-value>)',
        doneText: 'rgb(var(--done-text) / <alpha-value>)',
        haze: 'rgb(var(--haze) / <alpha-value>)',

        overlay: 'rgb(var(--overlay) / <alpha-value>)',

        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          deeper: 'rgb(var(--primary-deeper) / <alpha-value>)',
          darkest: 'rgb(var(--primary-darkest) / <alpha-value>)',
          statusFrom: 'rgb(var(--primary-status-from) / <alpha-value>)',
          text: 'rgb(var(--primary-text) / <alpha-value>)',
          soft: 'rgb(var(--primary-soft) / <alpha-value>)',
          softer: 'rgb(var(--primary-softer) / <alpha-value>)',
        },
      },
      boxShadow: {
        phone: '0 30px 70px rgba(10,6,24,.5)',
        glow: '0 12px 26px rgba(124,58,232,.5)',
        glowSoft: '0 10px 22px rgba(124,58,232,.45)',
        checkGlow: '0 14px 34px rgba(124,58,232,.55)',
      },
      borderRadius: {
        phone: '44px',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #8b3fe8, #6d1fc4)',
        'grad-primary-160': 'linear-gradient(160deg, #8b3fe8, #6d1fc4)',
        'grad-statusbar': 'linear-gradient(115deg, #7c2fd4, #5313a0)',
        'top-haze': 'linear-gradient(180deg, rgba(124,47,212,.28), rgba(11,10,14,0))',
      },
    },
  },
  plugins: [],
}
