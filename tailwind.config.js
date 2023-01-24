/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,js,hbs}",
    "./assets/**/*.{js,css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ['Rubik, sans-serif']
      },
      colors: {
        'hover-blue': '#E0E7FF',
        'blue-logo': '#004268',
        'orange-logo': '#D5611D',
      }
    },
  },
  plugins: [],
}