const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    layers: ['utilities'],
    content: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md'],
  },
  theme: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen-Sans',
        'Ubuntu',
        'Cantarell',
        'Helvetica Neue',
        'sans-serif',
      ],
      display: ['Heebo', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '972px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      xs: '.75em',
      sm: '.875em',
      tiny: '.875em',
      base: '1em',
      lg: '1.125em',
      xl: '1.25em',
      '2xl': '1.5em',
      '3xl': '1.875em',
      '4xl': '2.25em',
      '5xl': '3em',
      '6xl': '4em',
      '7xl': '5em',
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
        '40rem': '40rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
