// src/routes/[lang]/[category]/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { getPost } from '$lib/server/posts'; // Deve usare getPost (singolare)

export const load = async ({ params }) => {
  // Rimuoviamo tutti i log di debug per pulizia
  const post = await getPost(params.lang, params.category, params.slug);

  if (!post) {
    // Se getPost restituisce null, lanciamo un errore 404
    throw error(404, 'Articolo non trovato');
  }

  // Restituiamo un oggetto con la proprietà 'post' (singolare)
  return {
    post,
    lang: params.lang
  };
};