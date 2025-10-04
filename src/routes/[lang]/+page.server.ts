// src/routes/[lang]/+page.server.ts
import { getAllPosts } from '$lib/server/posts';

export const load = async ({ params }) => {
  const lang = params.lang || 'it';
  const posts = await getAllPosts(lang);

  // Non c'è più il console.log
  return { posts, lang };
};