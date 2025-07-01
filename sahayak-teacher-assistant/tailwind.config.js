/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff3ed',
          100: '#ffe4d4',
          200: '#ffc6a9',
          300: '#ff9b72',
          400: '#ff6b39',
          500: '#ff4713',
          600: '#f0330a',
          700: '#c7210a',
          800: '#9e1d10',
          900: '#7f1d10',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'Arial', 'sans-serif'],
        'tamil': ['Noto Sans Tamil', 'Arial', 'sans-serif'],
        'marathi': ['Noto Sans Devanagari', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}