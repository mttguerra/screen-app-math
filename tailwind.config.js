/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#ffffff',
        ink2: '#c8c8d2',
        muted: '#8a8a94',
        muted2: '#77777f',
        muted3: '#b2b2bc',
        muted4: '#6c6c76',

        canvas: '#d0cdd4',
        surface: '#0b0a0e',
        card: '#151519',
        cardDeep: '#101015',
        line: '#26262d',
        line2: '#232329',
        icobtn: '#1b1b20',
        chip: '#26262d',
        chipDeep: '#222229',
        cat: '#191920',
        done: '#1d1430',
        doneLine: '#4a2c7a',
        doneText: '#c3a0ff',
        haze: '#241a38',

        primary: {
          DEFAULT: '#8b3fe8',
          deeper: '#6d1fc4',
          darkest: '#5313a0',
          statusFrom: '#7c2fd4',
          text: '#a970ff',
          soft: '#c9a6ff',
          softer: '#f0e4ff',
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
