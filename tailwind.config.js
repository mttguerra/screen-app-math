/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', '-apple-system', 'sans-serif'],
        hanken: ['"Hanken Grotesk"', '-apple-system', 'sans-serif'],
      },
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        canvasChrome: 'rgb(var(--canvas-chrome) / <alpha-value>)',
        track: 'rgb(var(--track) / <alpha-value>)',

        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        muted3: 'rgb(var(--muted3) / <alpha-value>)',
        muted4: 'rgb(var(--muted4) / <alpha-value>)',

        line: 'rgb(var(--line) / <alpha-value>)',

        accent: 'rgb(var(--accent) / <alpha-value>)',
        accent100: 'rgb(var(--accent100) / <alpha-value>)',
        accentSoft: 'rgb(var(--accent-soft) / <alpha-value>)',
      },
      boxShadow: {
        phone: '0 30px 70px rgba(23, 24, 26, 0.15)',
      },
      borderRadius: {
        phone: '44px',
      },
    },
  },
  plugins: [],
}
