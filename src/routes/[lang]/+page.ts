// src/routes/[lang]/+page.ts
import { getPosts } from '$lib/posts';
import type { PageLoad } from './$types';
import { type Language, fallbackTranslations } from '$lib/translations';

export interface PostForIndex {
	title: string;
	slug: string;
}
export interface CategoryIndex {
	categoryName: string;
	categorySlug: string;
	posts: PostForIndex[];
}

export const load: PageLoad = async ({ params, parent }) => {
	// Correzione: Pulisce il parametro 'lang' rimuovendo '.html'
	const lang = params.lang.replace(/\.html$/, '');

    const { translations } = await parent();
    const t = (translations && translations[lang as Language]) ? translations[lang as Language] : fallbackTranslations;

	const allPosts = await getPosts();
	const posts = allPosts.filter(p => p.lang === lang);

	const categoryOrder = ['fundamentals', 'system-anatomy', 'core-concepts', 'advanced-topics'];

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
		lang, // Passiamo il 'lang' pulito
		posts,
		postIndex,
        translations
	};
};