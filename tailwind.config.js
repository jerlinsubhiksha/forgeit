/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-serve': '#E8DDD8',
        'flip-side': '#E8E16D',
        'coral': '#EB7F7F',
        'razzle-dazzle': '#E2267A',
        'helio': '#D67ACB',
        'disco-queen': '#7C3DB8',
        'opal': '#7FC7B7',
        'star-board': '#127A78',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
