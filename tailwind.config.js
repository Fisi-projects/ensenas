/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        third: 'var(--color-third)',
        fourth: 'var(--color-fourth)',
        lessons: 'var(--color-lessons)',
        card: 'var(--color-card)',
        'card-text': 'var(--color-card-text)', // Color del texto de las tarjetas
        purple:'#8570FF'
      }
    },
  },
  plugins: [],
}
