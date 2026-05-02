/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Monomaniac One', 'sans-serif'],
      },
      maxWidth: {
        content: '1100px',
        prose:   '660px',
      },
      colors: {
        ink:     '#1A1A1A',
        primary: '#2DB42D',
      },
    },
  },
  plugins: [],
}
