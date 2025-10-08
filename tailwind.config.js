/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts,md}'
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-bold': theme('colors.amber[400]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};