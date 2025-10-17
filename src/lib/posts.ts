// EN: Import 'front-matter' to parse YAML front matter from Markdown files.
// IT: Importa 'front-matter' per analizzare il front matter YAML dai file Markdown.
import fm from 'front-matter';

// EN: Import the 'error' helper from SvelteKit for handling server-side errors, although it is not used in the current code.
// IT: Importa l'helper 'error' da SvelteKit per la gestione degli errori lato server, sebbene non sia utilizzato nel codice corrente.
import { error } from '@sveltejs/kit';

// EN: Import 'marked' to convert Markdown content into HTML.
// IT: Importa 'marked' per convertire il contenuto Markdown in HTML.
import { marked } from 'marked';

// EN: Import color configuration for categories from a local config file.
// IT: Importa la configurazione dei colori per le categorie da un file di configurazione locale.
import { categoryColors, defaultCategoryColor } from '$lib/config';


/**
 * EN: Converts a string into a URL-friendly slug.
 * IT: Converte una stringa in uno "slug" compatibile con gli URL.
 * @param {string} text The input string.
 * @returns {string} The slugified string.
 */
function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/_/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

/**
 * EN: Formats a category slug (e.g., 'core_concepts') into a human-readable name (e.g., 'Core Concepts').
 * IT: Formatta uno slug di categoria (es. 'core_concepts') in un nome leggibile (es. 'Core Concepts').
 * @param {string} text The category slug.
 * @returns {string} The formatted category name.
 */
function formatCategoryName(text: string) {
	const words = text.replace(/_/g, ' ').split(' ');
	return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * EN: Creates a short excerpt from the post content in both HTML and plain text formats.
 * IT: Crea un breve estratto (excerpt) dal contenuto del post, sia in formato HTML che testo semplice.
 * @param {string} content The full Markdown content of the post.
 * @param {number} [maxLength=150] The maximum length of the excerpt.
 * @returns {Promise<{ html: string; plain: string }>} An object containing the HTML and plain text excerpts.
 */
async function createExcerpt(
	content: string,
	maxLength = 150
): Promise<{ html: string; plain: string }> {
	// EN: Remove the front matter section to process only the actual content.
	// IT: Rimuove la sezione del front matter per elaborare solo il contenuto effettivo.
	const contentWithoutFrontmatter = content.replace(/---[\s\S]*?---/, '').trim();

	// EN: Truncate the content to the specified max length, ensuring it doesn't cut words in half.
	// IT: Tronca il contenuto alla lunghezza massima specificata, assicurandosi di non tagliare le parole a metà.
	let truncated =
		contentWithoutFrontmatter.length <= maxLength
			? contentWithoutFrontmatter
			: contentWithoutFrontmatter.slice(0, maxLength).slice(
					0,
					Math.min(contentWithoutFrontmatter.length, contentWithoutFrontmatter.lastIndexOf(' '))
				) + '...';

	// EN: Convert the truncated Markdown to HTML.
	// IT: Converte il Markdown troncato in HTML.
	const html = await marked.parse(truncated);

	// EN: Create a plain text version by stripping Markdown syntax.
	// IT: Crea una versione in testo semplice rimuovendo la sintassi Markdown.
	const plain = truncated
		.replace(/(\*\*|__)(.*?)\1/g, '$2')
		.replace(/(\*|_)(.*?)\1/g, '$2')
		.replace(/#{1,6}\s+(.*)/g, '$1')
		.replace(/\[(.*?)\]\(.*?\)/g, '$1');

	return { html, plain };
}


// EN: Defines the structure for a source or citation.
// IT: Definisce la struttura per una fonte o una citazione.
export interface Source {
	text: string;
	url: string;
}

// EN: Defines the main data structure for a post.
// IT: Definisce la struttura dati principale per un post.
export interface Post {
	lang: string;
	categorySlug: string;
	categoryName: string;
	categoryColor: string;
	slug: string;
	title: string;
	excerpt: string; // HTML version
	plainExcerpt: string; // Plain text version
	content?: string; // Full Markdown content
	sources?: Source[];
}


// EN: A simple in-memory cache to store posts after the first load, preventing reprocessing.
// IT: Una semplice cache in memoria per archiviare i post dopo il primo caricamento, evitando di rielaborarli.
let allPosts: Post[] = [];

/**
 * EN: Fetches, parses, and caches all posts from the '/src/content' directory.
 * IT: Recupera, analizza e mette in cache tutti i post dalla directory '/src/content'.
 * @returns {Promise<Post[]>} A promise that resolves to an array of all posts.
 */
export const getPosts = async (): Promise<Post[]> => {
	// EN: If the cache is already populated, return it immediately.
	// IT: Se la cache è già popolata, la restituisce immediatamente.
	if (allPosts.length > 0) {
		return allPosts;
	}

	// EN: Use Vite's `import.meta.glob` to discover all Markdown files. The '?raw' query imports them as raw text strings.
	// IT: Usa `import.meta.glob` di Vite per trovare tutti i file Markdown. La query '?raw' li importa come stringhe di testo grezzo.
	const allPostFiles = import.meta.glob('/src/content/**/*.md', { query: '?raw' });

	// EN: Create an array of promises, where each promise processes one Markdown file.
	// IT: Crea un array di promise, dove ogni promise elabora un file Markdown.
	const postPromises = Object.entries(allPostFiles).map(async ([path, resolver]) => {
		// EN: The resolver function loads the module; we need the 'default' export which contains the raw content.
		// IT: La funzione resolver carica il modulo; abbiamo bisogno dell'export 'default' che contiene il contenuto grezzo.
		const mod = (await resolver()) as { default: string };
		const rawContent = mod.default;

		// EN: Parse the front matter and the body from the raw content.
		// IT: Analizza il front matter e il corpo del testo dal contenuto grezzo.
		const { attributes, body } = fm<any>(rawContent);

		if (!attributes) {
			console.warn(`ATTENZIONE: Frontmatter non trovato per il file: ${path}`);
			return null; // EN: Skip files without front matter. / IT: Salta i file senza front matter.
		}

		// EN: Use a regular expression to extract language, category, and slug from the file path.
		// IT: Usa un'espressione regolare per estrarre lingua, categoria e slug dal percorso del file.
		const match = path.match(/\/src\/content\/([^/]+)\/([^/]+)\/([^/]+)\.md$/);
		if (!match) {
			return null; // EN: Skip files that don't match the expected path structure. / IT: Salta i file che non corrispondono alla struttura di percorso prevista.
		}

		const [, lang, categorySlug, slug] = match;

		// EN: If an excerpt is provided in the front matter, use it; otherwise, generate one from the body.
		// IT: Se un estratto è fornito nel front matter, usa quello; altrimenti, ne genera uno dal corpo del testo.
		const excerptData = attributes.excerpt
			? { html: await marked.parse(attributes.excerpt), plain: attributes.excerpt }
			: await createExcerpt(body);

		// EN: Assemble the final Post object.
		// IT: Assembla l'oggetto Post finale.
		const post: Post = {
			lang,
			categorySlug,
			slug,
			categoryName: formatCategoryName(categorySlug),
			categoryColor: categoryColors[categorySlug] || defaultCategoryColor,
			title: attributes.title || 'Senza Titolo',
			excerpt: excerptData.html,
			plainExcerpt: excerptData.plain,
			sources: attributes.sources,
			content: body
		};

		return post;
	});

	// EN: Wait for all files to be processed.
	// IT: Attende che tutti i file siano stati elaborati.
	const resolvedPosts = await Promise.all(postPromises);

	// EN: Filter out any null values (from skipped files) and populate the cache.
	// IT: Filtra eventuali valori nulli (dai file saltati) e popola la cache.
	allPosts = resolvedPosts.filter((p): p is Post => p !== null);

	return allPosts;
};