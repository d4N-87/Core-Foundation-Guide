// src/routes/[lang]/[category]/[slug]/+page.ts
import { getPosts } from '$lib/posts';
import type { PageLoad } from './$types';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

function htmlToPlainText(html: string): string {
	return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanTextForSpeech(markdown: string): string {
	return markdown
		.replace(/---[\s\S]*?---/, '')
		.replace(/\[\d+\]/g, '')
		.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
		.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
		.replace(/(\*\*|\*|_)/g, '')
		.replace(/^[#]{1,6}\s+(.*)/gm, '$1;')
		.replace(/\s+/g, ' ')
		.trim();
}

export const load: PageLoad = async ({ params, parent }) => {
	// Correzione: Pulisce i parametri
	const lang = params.lang.replace(/\.html$/, '');
	const category = params.category.replace(/\.html$/, '');
	const slug = params.slug.replace(/\.html$/, '');

	if (lang.startsWith('.') || category.startsWith('.') || slug.startsWith('.')) {
		throw error(404, 'Not Found');
	}

	const { translations } = await parent();
	
	const allPosts = await getPosts();
	const post = allPosts.find(p => p.lang === lang && p.categorySlug === category && p.slug === slug);

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

	const processedPost = { ...post, content: htmlContent };

	return {
		post: processedPost,
		translations,
		seo,
		textContent
	};
};