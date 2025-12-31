/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#ff8d1aff', // <--- Set your desired Saffron Hex here
          dark: '#ff9900ff',    // <--- Set your desired Hover Hex here
        }
      }
    },
  },
  plugins: [],
}