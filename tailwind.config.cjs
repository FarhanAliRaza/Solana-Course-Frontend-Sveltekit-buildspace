// tailwind.config.cjs

module.exports = {
  // add this section
  purge: [
    './src/**/*.html',
    './src/**/*.svelte'
  ],
  darkMode: true,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}