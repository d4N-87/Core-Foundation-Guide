// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      // Rimuoviamo la configurazione 'typography' da qui
    },
  },
  // Rimuoviamo anche la sezione plugins da qui
  plugins: [],
};