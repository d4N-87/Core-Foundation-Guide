// tailwind.config.js

const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	// English: Tells Tailwind where to look for class names to generate the necessary CSS.
	//          It scans all relevant files in the `src` directory.
	// Italiano: Indica a Tailwind dove cercare i nomi delle classi per generare il CSS necessario.
	//           Analizza tutti i file rilevanti nella cartella `src`.
	content: ['./src/**/*.{html,js,svelte,ts,md}'],

	theme: {
		// English: The `extend` block allows us to add new values to the default theme without overwriting it.
		// Italiano: Il blocco `extend` ci permette di aggiungere nuovi valori al tema predefinito senza sovrascriverlo.
		extend: {
			// English: We are explicitly adding the `cyan` and `amber` color palettes to be available for use.
			// Italiano: Aggiungiamo esplicitamente le palette di colori `cyan` e `amber` per renderle disponibili.
			colors: {
				cyan: colors.cyan,
				amber: colors.amber
			},
			// English: Configuration for the `@tailwindcss/typography` plugin.
			// Italiano: Configurazione per il plugin `@tailwindcss/typography`.
			typography: ({ theme }) => ({
				// English: We are customizing the 'invert' theme (used for dark mode prose).
				// Italiano: Stiamo personalizzando il tema 'invert' (usato per la prosa in modalità scura).
				invert: {
					css: {
						// English: This sets the color of bold text within prose elements to amber-400.
						// Italiano: Questo imposta il colore del testo in grassetto all'interno degli elementi "prose" su amber-400.
						'--tw-prose-bold': theme('colors.amber[400]')
					}
				}
			})
		}
	},

	// English: Registers the official Tailwind CSS typography plugin, which provides the `prose` classes.
	// Italiano: Registra il plugin ufficiale di tipografia di Tailwind CSS, che fornisce le classi `prose`.
	plugins: [require('@tailwindcss/typography')]
};