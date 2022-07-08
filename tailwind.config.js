module.exports = {
  content: [
    './dist/**/*.{html,js}',
    './*.html',
    './node_modules/tw-elements/dist/**/*.js'
  ],
  theme: {
    extend: {

      colors: {
        'light-green': '#BEF0BF',
        'light-brown': '#D9D6C3',
        'forest-green': '#2A4D4C',
        'standard-green': '#BEE4AF',
        'deep-green': '#008000',
      }




    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tw-elements/dist/plugin")
  ]
}