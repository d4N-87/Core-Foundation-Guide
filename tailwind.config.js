// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}'], // Aggiunto '.md'
	theme: {
		extend: {
			// Abbiamo rimosso la sezione 'fontFamily' per ridurre la complessità.
			// Applicheremo il font direttamente nel layout.
		}
	},
	plugins: []
};