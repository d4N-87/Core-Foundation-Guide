// src/routes/[lang]/[category]/[slug]/+page.server.ts
import { getPost } from '$lib/server/posts';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { lang, category, slug } = params;

  if (lang.startsWith('.') || category.startsWith('.') || slug.startsWith('.')) {
    throw error(404, 'Not Found');
  }

  // Ereditiamo le traduzioni dal layout genitore
  const { translations } = await parent();

  // Carichiamo il post specifico
  const post = await getPost(lang, category, slug);

  // Convertiamo il suo contenuto
  if (post.content) {
    post.content = await marked.parse(post.content);
  }

  // Restituiamo TUTTI i dati necessari alla pagina
  return {
    post,
    translations
  };
};