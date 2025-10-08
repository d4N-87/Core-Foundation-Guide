import { getAllPosts, Post } from '$lib/server/posts';

export const load = async ({ params }) => {
  const lang = params.lang;
  const allPosts: Post[] = await getAllPosts(lang);

  // Filtra i post per categoria
  const posts = allPosts.filter(p => p.category.toLowerCase() === params.category.toLowerCase());

  return { posts, lang, category: params.category };
};
