/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        terminal: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
};