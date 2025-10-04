// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: { /* ... */ },
  plugins: [
    require('@tailwindcss/typography'), // Aggiungi questa riga
  ],
};