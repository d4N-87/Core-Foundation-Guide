// src/routes/[lang]/[category]/+page.server.ts
import { getPosts } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { lang, category } = params;
  const allPosts = await getPosts(lang);

  // 🔹 CORREZIONE: Filtriamo usando 'categorySlug' invece di 'category'
  const posts = allPosts.filter(p => p.categorySlug === category);
  
  const { translations } = await parent();

  return {
    posts,
    lang,
    category,
    translations
  };
};