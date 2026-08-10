/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0E3B26',
          deep: '#071F14',
          soft: '#155338',
        },
        gold: {
          DEFAULT: '#E3B23C',
          soft: '#F3D488',
        },
        cream: {
          DEFAULT: '#F6EFDC',
          dim: '#EAE0C4',
        },
        coral: '#E8607A',
        ink: '#16241A',
        line: 'rgba(246,239,220,.16)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
