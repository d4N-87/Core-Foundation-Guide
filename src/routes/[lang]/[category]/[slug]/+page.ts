// src/routes/[lang]/[category]/[slug]/+page.ts

// EN: Import the main function to fetch all posts.
// IT: Importa la funzione principale per recuperare tutti i post.
import { getPosts } from '$lib/posts';
// EN: Import the type definition for a SvelteKit page load function.
// IT: Importa la definizione del tipo per una funzione di load di pagina di SvelteKit.
import type { PageLoad } from './$types';
// EN: Import the 'marked' library to parse Markdown into HTML.
// IT: Importa la libreria 'marked' per analizzare il Markdown e trasformarlo in HTML.
import { marked } from 'marked';
// EN: Import SvelteKit's error helper to handle cases where a post is not found.
// IT: Importa l'helper 'error' di SvelteKit per gestire i casi in cui un post non viene trovato.
import { error } from '@sveltejs/kit';

/**
 * EN: A simple utility function to strip all HTML tags from a string.
 * IT: Una semplice funzione di utilità per rimuovere tutti i tag HTML da una stringa.
 * @param html The input HTML string.
 * @returns The plain text representation.
 */
function htmlToPlainText(html: string): string {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * EN: Cleans the Markdown text to make it suitable for a Text-to-Speech (TTS) engine.
 * IT: Pulisce il testo Markdown per renderlo adatto a un motore Text-to-Speech (TTS).
 * @param markdown The raw Markdown content.
 * @returns A cleaned string ready for speech synthesis.
 */
function cleanTextForSpeech(markdown: string): string {
	return (
		markdown
			// EN: Remove YAML front matter. / IT: Rimuove il front matter YAML.
			.replace(/---[\s\S]*?---/, '')
			// EN: Remove citation numbers like [1], [2], etc. / IT: Rimuove i numeri di citazione come [1], [2], ecc.
			.replace(/\[\d+\]/g, '')
			// EN: Decode HTML character entities. / IT: Decodifica le entità carattere HTML.
			.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
			// EN: Extract text from Markdown links. / IT: Estrae il testo dai link Markdown.
			.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
			// EN: Remove Markdown emphasis characters (*, _, **). / IT: Rimuove i caratteri di enfasi Markdown (*, _, **).
			.replace(/(\*\*|\*|_)/g, '')
			// EN: Convert Markdown headings to plain text followed by a semicolon for a slight pause.
			// IT: Converte le intestazioni Markdown in testo semplice seguito da un punto e virgola per una leggera pausa.
			.replace(/^[#]{1,6}\s+(.*)/gm, '$1;')
			// EN: Normalize whitespace. / IT: Normalizza gli spazi bianchi.
			.replace(/\s+/g, ' ')
			.trim()
	);
}

/**
 * EN: This load function runs for each individual post page.
 * It finds the specific post based on the URL parameters, processes its content, and prepares it for rendering.
 * IT: Questa funzione di load viene eseguita per ogni singola pagina di un post.
 * Trova il post specifico in base ai parametri dell'URL, elabora il suo contenuto e lo prepara per il rendering.
 */
export const load: PageLoad = async ({ params, parent }) => {
	// EN: Cleans the route parameters by removing the '.html' suffix.
	// IT: Pulisce i parametri della rotta rimuovendo il suffisso '.html'.
	const lang = params.lang.replace(/\.html$/, '');
	const category = params.category.replace(/\.html$/, '');
	const slug = params.slug.replace(/\.html$/, '');

	// EN: A basic security check to prevent attempts to access hidden files (e.g., .git, .env).
	// IT: Un controllo di sicurezza di base per prevenire tentativi di accesso a file nascosti (es. .git, .env).
	if (lang.startsWith('.') || category.startsWith('.') || slug.startsWith('.')) {
		throw error(404, 'Not Found');
	}

	// EN: Fetches the global translations object from the parent layout.
	// IT: Recupera l'oggetto globale delle traduzioni dal layout genitore.
	const { translations } = await parent();

	// EN: Fetch all posts and find the one that matches the lang, category, and slug from the URL.
	// IT: Recupera tutti i post e trova quello che corrisponde a lingua, categoria e slug dall'URL.
	const allPosts = await getPosts();
	const post = allPosts.find((p) => p.lang === lang && p.categorySlug === category && p.slug === slug);

	// EN: If no post is found, throw a 404 error to render the not-found page.
	// IT: Se nessun post viene trovato, lancia un errore 404 per renderizzare la pagina di errore.
	if (!post) {
		throw error(404, 'Not Found');
	}

	// EN: Process the post's content.
	// IT: Elabora il contenuto del post.
	const markdownContent = post.content || '';
	const htmlContent = await marked.parse(markdownContent); // EN: Convert Markdown to HTML. / IT: Converte Markdown in HTML.
	const cleanText = cleanTextForSpeech(markdownContent); // EN: Prepare text for TTS. / IT: Prepara il testo per il TTS.
	const textContent = `${post.title}. ${cleanText}`; // EN: Prepend title for TTS context. / IT: Aggiunge il titolo per il contesto del TTS.

	// EN: Prepare an object with data for the SEO component.
	// IT: Prepara un oggetto con i dati per il componente SEO.
	const seo = {
		title: post.title,
		description: post.plainExcerpt || htmlToPlainText(htmlContent).substring(0, 155)
	};

	// EN: Create a new post object where the raw Markdown content is replaced by the processed HTML.
	// IT: Crea un nuovo oggetto post in cui il contenuto Markdown grezzo è sostituito dall'HTML elaborato.
	const processedPost = { ...post, content: htmlContent };

	// EN: Return all the necessary data to the +page.svelte component.
	// IT: Restituisce tutti i dati necessari al componente +page.svelte.
	return {
		post: processedPost,
		translations,
		seo,
		textContent // EN: This will be used by the SpeechControl component. / IT: Questo verrà usato dal componente SpeechControl.
	};
};