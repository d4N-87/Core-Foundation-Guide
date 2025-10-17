// generate-paths.js

// EN: Import Node.js built-in modules: 'fs' for interacting with the file system, and 'path' for handling file paths.
// IT: Importa i moduli integrati di Node.js: 'fs' per interagire con il file system e 'path' per gestire i percorsi dei file.
import fs from 'fs';
import path from 'path';

/**
 * EN: Scans the 'src/content' directory to dynamically generate a list of all possible URL paths for the site.
 * This is essential for SvelteKit's prerendering process, as it needs to know which pages to build into static HTML files.
 * IT: Analizza la directory 'src/content' per generare dinamicamente una lista di tutti i possibili percorsi URL del sito.
 * Questo è essenziale per il processo di prerendering di SvelteKit, che ha bisogno di sapere quali pagine trasformare in file HTML statici.
 * @returns {string[]} An array of unique URL paths to be prerendered.
 */
export function generatePaths() {
	// EN: Define the absolute path to the content directory.
	// IT: Definisce il percorso assoluto della directory dei contenuti.
	const contentDir = path.resolve(process.cwd(), 'src/content');

	// EN: Read all items in the content directory and filter to keep only the subdirectories, which represent the languages (e.g., 'en', 'it').
	// IT: Legge tutti gli elementi nella directory dei contenuti e filtra per mantenere solo le sottodirectory, che rappresentano le lingue (es. 'en', 'it').
	const languages = fs
		.readdirSync(contentDir)
		.filter((item) => fs.statSync(path.join(contentDir, item)).isDirectory());

	// EN: Use a Set to store paths, which automatically prevents duplicates.
	// IT: Utilizza un Set per memorizzare i percorsi, il che previene automaticamente i duplicati.
	const paths = new Set();

	// EN: Add the root path for the homepage.
	// IT: Aggiunge il percorso radice per la homepage.
	paths.add('/');

	// EN: Loop through each language directory.
	// IT: Itera su ogni directory di lingua.
	for (const lang of languages) {
		// EN: Add the language's index page path (e.g., '/en.html').
		// IT: Aggiunge il percorso della pagina indice della lingua (es. '/en.html').
		paths.add(`/${lang}.html`);
		const langDir = path.join(contentDir, lang);

		// EN: Read all items in the language directory and filter to keep only the category subdirectories.
		// IT: Legge tutti gli elementi nella directory della lingua e filtra per mantenere solo le sottodirectory delle categorie.
		const categories = fs
			.readdirSync(langDir)
			.filter((item) => fs.statSync(path.join(langDir, item)).isDirectory());

		// EN: Loop through each category directory.
		// IT: Itera su ogni directory di categoria.
		for (const category of categories) {
			// EN: Add the category's index page path (e.g., '/en/core_concepts.html').
			// IT: Aggiunge il percorso della pagina indice della categoria (es. '/en/core_concepts.html').
			paths.add(`/${lang}/${category}.html`);
			const categoryDir = path.join(langDir, category);

			// EN: Read all files in the category directory and filter to keep only Markdown files.
			// IT: Legge tutti i file nella directory della categoria e filtra per mantenere solo i file Markdown.
			const files = fs.readdirSync(categoryDir).filter((file) => file.endsWith('.md'));

			// EN: Loop through each Markdown file to generate the final article path.
			// IT: Itera su ogni file Markdown per generare il percorso finale dell'articolo.
			for (const file of files) {
				// EN: Create the 'slug' by removing the '.md' extension from the filename.
				// IT: Crea lo 'slug' rimuovendo l'estensione '.md' dal nome del file.
				const slug = file.replace(/\.md$/, '');
				// EN: Add the full article path (e.g., '/en/core_concepts/cfg.html').
				// IT: Aggiunge il percorso completo dell'articolo (es. '/en/core_concepts/cfg.html').
				paths.add(`/${lang}/${category}/${slug}.html`);
			}
		}
	}
	// EN: Log the total number of unique paths found to the console during the build process for debugging purposes.
	// IT: Stampa nella console il numero totale di percorsi unici trovati durante il processo di build, per finalità di debug.
	console.log(`Trovati ${paths.size} percorsi unici da generare.`);

	// EN: Convert the Set to an Array and return it, as required by the 'prerender.entries' configuration in SvelteKit.
	// IT: Converte il Set in un Array e lo restituisce, come richiesto dalla configurazione 'prerender.entries' in SvelteKit.
	return Array.from(paths);
}