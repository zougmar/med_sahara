/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9e1e0',
          100: '#f1b3b1',
          200: '#e6827e',
          300: '#da4e47',
          400: '#c9302c',
          500: '#b82824',
          600: '#9b1d1a',
          700: '#7a1714',
          800: '#5d1210',
          900: '#440e0c',
        },
        secondary: {
          50: '#fef9e7',
          100: '#fdf1ce',
          200: '#fbe5a1',
          300: '#f9d670',
          400: '#f0ad4e',
          500: '#ec971f',
          600: '#d58512',
          700: '#b06d0f',
          800: '#8b570b',
          900: '#704509',
        },
        accent: {
          50: '#eef9fc',
          100: '#d6f1f8',
          200: '#b4e6f2',
          300: '#80d4eb',
          400: '#5bc0de',
          500: '#46b8da',
          600: '#31b0d5',
          700: '#269abc',
          800: '#1f7e9a',
          900: '#1a6480',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f8f3e9',
          200: '#f1e7d1',
          300: '#e8d8b3',
          400: '#dcc591',
          500: '#d1b274',
          600: '#c9a05e',
          700: '#bc8b4a',
          800: '#a6743c',
          900: '#2c3e50',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1548919175-b36508a0b1f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-in-top': 'slideInFromTop 0.8s ease-in-out',
        'slide-in-bottom': 'slideInFromBottom 0.8s ease-in-out',
      }
    },
  },
  plugins: [],
}
