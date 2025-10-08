// src/routes/[lang]/+page.server.ts
import { getPosts } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { lang } = params;
  // 🔹 CORREZIONE: Aggiunto 'await'
  const posts = await getPosts(lang);

  return {
    lang,
    posts,
  };
};