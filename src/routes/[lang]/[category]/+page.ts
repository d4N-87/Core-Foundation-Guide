// src/routes/[lang]/[category]/+page.ts
import { getPosts } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	// Correzione: Pulisce i parametri
	const lang = params.lang.replace(/\.html$/, '');
	const category = params.category.replace(/\.html$/, '');

	const { translations } = await parent();

	const allPosts = await getPosts();
	const posts = allPosts.filter((p) => p.lang === lang && p.categorySlug === category);

	return {
		posts,
		lang,
		category,
		translations
	};
};