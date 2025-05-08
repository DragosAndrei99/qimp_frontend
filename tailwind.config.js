/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '1380px': '1380px',
        '1470px': '1470px',
        '1520px': '1520px',
        '1850px': '1850px',
        '2400px': '2400px',
      },
    },
  },
  plugins: [],
}