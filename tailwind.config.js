/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aws: {
          orange: '#FF9900',
          blue: '#232F3E',
          dark: '#161E2D',
          light: '#F2F3F3',
        }
      }
    },
  },
  plugins: [],
}
