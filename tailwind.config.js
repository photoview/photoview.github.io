const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.njk'],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '972px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#168fd4',
        primaryDark: '#00598e',
        default: '#565656',
      },
      spacing: {
        '572px': '572px',
      },
    },
  },
  variants: {},
  plugins: [],
}
