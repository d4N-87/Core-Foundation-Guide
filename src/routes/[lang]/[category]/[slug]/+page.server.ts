// src/routes/[lang]/[category]/[slug]/+page.server.ts
import { getPost } from '$lib/server/posts';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

// English: A simple utility to strip all HTML tags from a string, useful for creating plain text excerpts.
// Italiano: Una semplice utility per rimuovere tutti i tag HTML da una stringa, utile per creare estratti in testo semplice.
function htmlToPlainText(html: string): string {
	return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

// English: Prepares raw markdown text for the Web Speech API by removing syntax that shouldn't be read aloud.
// Italiano: Prepara il testo markdown grezzo per la Web Speech API rimuovendo la sintassi che non dovrebbe essere letta ad alta voce.
function cleanTextForSpeech(markdown: string): string {
	return (
		markdown
			// English: Remove frontmatter. / Italiano: Rimuove il frontmatter.
			.replace(/---[\s\S]*?---/, '')
			// English: Remove citation numbers like [1], [2], etc. / Italiano: Rimuove i numeri di citazione come [1], [2], ecc.
			.replace(/\[\d+\]/g, '')
			// English: Decode HTML entities. / Italiano: Decodifica le entità HTML.
			.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
			// English: Extract text from markdown links. / Italiano: Estrae il testo dai link markdown.
			.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
			// English: Remove bold/italic markers. / Italiano: Rimuove i marcatori di grassetto/corsivo.
			.replace(/(\*\*|\*|_)/g, '')
			// English: Replace markdown headings with the heading text followed by a semicolon to suggest a pause.
			// Italiano: Sostituisce i titoli markdown con il testo del titolo seguito da un punto e virgola per suggerire una pausa.
			.replace(/^[#]{1,6}\s+(.*)/gm, '$1;')
			// English: Normalize whitespace. / Italiano: Normalizza gli spazi bianchi.
			.replace(/\s+/g, ' ')
			.trim()
	);
}

// English: SvelteKit's server-side load function. It runs on the server before the page is rendered.
// Italiano: Funzione di load lato server di SvelteKit. Viene eseguita sul server prima del rendering della pagina.
export const load: PageServerLoad = async ({ params, parent }) => {
	const { lang, category, slug } = params;

	// English: Basic security check to prevent path traversal attempts.
	// Italiano: Controllo di sicurezza base per prevenire tentativi di path traversal.
	if (lang.startsWith('.') || category.startsWith('.') || slug.startsWith('.')) {
		throw error(404, 'Not Found');
	}

	// English: Load data from the parent layout's load function (in this case, translations).
	// Italiano: Carica i dati dalla funzione di load del layout genitore (in questo caso, le traduzioni).
	const { translations } = await parent();
	// English: Fetch the specific post data from the filesystem.
	// Italiano: Recupera i dati del post specifico dal filesystem.
	const post = await getPost(lang, category, slug);

	if (!post) {
		throw error(404, 'Not Found');
	}

	const markdownContent = post.content || '';
	// English: Parse the markdown content into HTML for rendering in the component.
	// Italiano: Esegue il parsing del contenuto markdown in HTML per il rendering nel componente.
	const htmlContent = await marked.parse(markdownContent);
	// English: Clean the original markdown for the text-to-speech engine.
	// Italiano: Pulisce il markdown originale per il motore di sintesi vocale.
	const cleanText = cleanTextForSpeech(markdownContent);
	// English: Prepend the title to the cleaned text to be spoken.
	// Italiano: Aggiunge il titolo all'inizio del testo pulito che verrà letto.
	const textContent = `${post.title}. ${cleanText}`;

	// English: Prepare SEO metadata for the page.
	// Italiano: Prepara i metadati SEO per la pagina.
	const seo = {
		title: post.title,
		description: post.excerpt || htmlToPlainText(htmlContent).substring(0, 155)
	};

	// English: Replace the raw markdown content with the parsed HTML.
	// Italiano: Sostituisce il contenuto markdown grezzo con l'HTML processato.
	post.content = htmlContent;

	// English: Return all the processed data to the page component.
	// Italiano: Restituisce tutti i dati elaborati al componente della pagina.
	return {
		post,
		translations,
		seo,
		textContent
	};
};