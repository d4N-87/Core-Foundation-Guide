// src/routes/[lang]/+page.server.ts
import { getPosts } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export interface PostForIndex {
	title: string;
	slug: string;
}
export interface CategoryIndex {
	categoryName: string;
	categorySlug: string;
	posts: PostForIndex[];
}

export const load: PageServerLoad = async ({ params }) => {
	const { lang } = params;

	// LA CORREZIONE CHIAVE DI SICUREZZA:
	// Aggiungiamo '|| []' per garantire che 'posts' sia sempre un array,
	// anche se getPosts restituisce undefined o null.
	const posts = (await getPosts(lang)) || [];

	const categoryOrder = ['fundamentals', 'system_anatomy', 'core_concepts', 'advanced_topics'];

	const postIndex = posts.reduce<CategoryIndex[]>((accumulator, currentPost) => {
		let categoryGroup = accumulator.find((group) => group.categorySlug === currentPost.categorySlug);
		if (!categoryGroup) {
			categoryGroup = {
				categoryName: currentPost.categoryName,
				categorySlug: currentPost.categorySlug,
				posts: []
			};
			accumulator.push(categoryGroup);
		}
		categoryGroup.posts.push({
			title: currentPost.title,
			slug: currentPost.slug
		});
		return accumulator;
	}, []);

	postIndex.sort((a, b) => {
		const indexA = categoryOrder.indexOf(a.categorySlug);
		const indexB = categoryOrder.indexOf(b.categorySlug);
		if (indexA === -1) return 1;
		if (indexB === -1) return -1;
		return indexA - indexB;
	});

	return {
		lang,
		posts,
		postIndex
	};
};