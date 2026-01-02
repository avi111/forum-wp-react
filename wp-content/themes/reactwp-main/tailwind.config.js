/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
        heebo: ['Heebo', 'sans-serif'],
      },
      colors: {
        // Add any custom colors if needed, otherwise rely on default
      }
    },
  },
  plugins: [],
}
