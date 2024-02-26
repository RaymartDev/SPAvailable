/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'poppins': ['Poppins'],
      'mont': ['Montserrat'],
      'pd': ['Playfair Display']
    },
  },

  plugins: [],

}

