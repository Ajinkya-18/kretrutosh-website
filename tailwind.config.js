/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1C3E', // Deep Navy
        secondary: '#FF9933', // Saffron
      }
    },
  },
  plugins: [],
}