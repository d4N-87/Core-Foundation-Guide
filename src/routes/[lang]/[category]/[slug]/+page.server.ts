// src/routes/[lang]/[category]/[slug]/+page.server.ts
import { getPost } from '$lib/server/posts';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

// Funzione helper per creare un estratto pulito per la meta description
function generateExcerpt(content: string, maxLength = 155): string {
	// Rimuove i tag HTML, i link markdown, e accorcia il testo
	const plainText = content
		.replace(/<[^>]*>/g, '') // Rimuove tag HTML
		.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Converte [testo](link) in "testo"
		.replace(/\s+/g, ' ') // Normalizza gli spazi
		.trim();

	if (plainText.length <= maxLength) {
		return plainText;
	}

	// Accorcia e aggiunge "..." senza tagliare una parola a metà
	const trimmed = plainText.substring(0, maxLength);
	return trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(' '))) + '...';
}

export const load: PageServerLoad = async ({ params, parent }) => {
	const { lang, category, slug } = params;

	if (lang.startsWith('.') || category.startsWith('.') || slug.startsWith('.')) {
		throw error(404, 'Not Found');
	}

	const { translations } = await parent();
	const post = await getPost(lang, category, slug);

	if (!post) {
		throw error(404, 'Not Found');
	}

	// LA CORREZIONE È QUI:
	// Prepariamo i dati SEO, gestendo il caso in cui 'post.content' sia undefined.
	const seo = {
		title: post.title,
		// Se 'post.excerpt' esiste, usalo. Altrimenti, genera l'estratto solo se 'post.content' esiste.
		// Se entrambi sono assenti, usa una stringa vuota come fallback sicuro.
		description: post.excerpt || (post.content ? generateExcerpt(post.content) : '')
	};

	// E ANCHE QUI:
	// Convertiamo il contenuto del post in HTML solo se esiste.
	if (post.content) {
		post.content = await marked.parse(post.content);
	}

	return {
		post,
		translations,
		seo
	};
};