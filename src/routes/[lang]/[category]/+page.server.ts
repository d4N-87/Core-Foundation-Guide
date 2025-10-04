// src/routes/[lang]/[category]/+page.server.ts
import { getAllPosts } from '$lib/server/posts';

export const load = async ({ params }) => {
  const lang = params.lang;
  const allPosts = await getAllPosts(lang);
  
  // Filtriamo i post per mantenere solo quelli della categoria corrente
  const posts = allPosts.filter(p => p.category === params.category);

  return { 
    posts, 
    lang,
    category: params.category
  };
};