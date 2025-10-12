// src/routes/[lang]/[category]/[slug]/+page.server.ts
import { getPost } from '$lib/server/posts';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

function htmlToPlainText(html: string): string {
	return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanTextForSpeech(markdown: string): string {
	return (
		markdown
			.replace(/---[\s\S]*?---/, '')
			.replace(/\[\d+\]/g, '')
			.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
			.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
			.replace(/(\*\*|\*|_)/g, '')
			// LA CORREZIONE È QUI:
			// Sostituiamo i titoli (da 1 a 6 cancelletti) con un punto e virgola per suggerire una pausa.
			.replace(/^[#]{1,6}\s+(.*)/gm, '$1;')
			.replace(/\s+/g, ' ')
			.trim()
	);
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

	const markdownContent = post.content || '';
	const htmlContent = await marked.parse(markdownContent);
	const cleanText = cleanTextForSpeech(markdownContent);
	const textContent = `${post.title}. ${cleanText}`;

	const seo = {
		title: post.title,
		description: post.excerpt || htmlToPlainText(htmlContent).substring(0, 155)
	};

	post.content = htmlContent;

	return {
		post,
		translations,
		seo,
		textContent
	};
};