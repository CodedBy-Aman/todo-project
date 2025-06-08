/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        main: '#EAEAEA',
        create: '#3ab7bf',
        read: '#78dcca',
        heading: '#2B2F46',
      },
    },
  },
  plugins: [],
} 