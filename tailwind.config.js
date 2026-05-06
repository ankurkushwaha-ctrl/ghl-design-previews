const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: colors.yellow,
        amber: colors.amber,
        apple: {
          50: '#F5FBF5',
          100: '#EAF7EA',
          200: '#CBEBCB',
          300: '#ABDEAB',
          400: '#6DC66D',
          500: '#2EAD2E',
          600: '#299C29',
          700: '#1C681C',
          800: '#154E15',
          900: '#0E340E',
        },
        'dodger-blue': {
          50: '#F3F9FF',
          100: '#E8F3FE',
          200: '#C5E2FD',
          300: '#A2D0FB',
          400: '#5DADF9',
          500: '#178AF6',
          600: '#157CDD',
          700: '#0E5394',
          800: '#0A3E6F',
          900: '#07294A',
        },
        'curious-blue': {
          50: '#F5FAFD',
          100: '#EBF6FB',
          200: '#CDE7F6',
          300: '#AFD9F1',
          400: '#74BDE6',
          500: '#38A0DB',
          600: '#3290C5',
          700: '#226083',
          800: '#194863',
          900: "#113042",
        },
        elephant: {
          50: '#F3F5F5',
          100: '#E7EAEC',
          200: '#C2CBCF',
          300: '#9EABB2',
          400: '#556C79',
          500: '#0C2D3F',
          600: '#0B2939',
          700: '#071B26',
          800: '#05141C',
          900: '#040E13',
        },
        
      },
      transitionProperty: {
        'width': 'width'
      },
      height: {
        'fit': 'fit-content'
      },
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5':'80%',
        '5/6':'83%',
        '9/10':'90%',
        '50vh':'50vh',
        '60vh':'60vh'
       },
       maxWidth:{
         '1/10':'10%',
         '3/10':'30%',
       },
       width:{
         '1/10':'10%'
       }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
      'conversationBadge': '#3B82F6'
     }),
    divideColor: theme => ({
      ...theme('borderColors'),
      'conversationSeparator': "#D1D5DB"
    }),
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '25': 25,
      '50': 50,
      '75': 75,
      '100': 100,
      '999': 999,
      'auto': 'auto',
    }
  },
  variants: {
    extend: {
      opacity: ({ after }) => after(['disabled']),
      display: ["group-hover"],
      backgroundColor: ['hover'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}
