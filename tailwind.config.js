const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    layers: ['utilities'],
    content: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md'],
  },
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
        default: '#001012',
      },
      spacing: {
        100: '28rem',
        '572px': '572px',
        '05': '0.2rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
