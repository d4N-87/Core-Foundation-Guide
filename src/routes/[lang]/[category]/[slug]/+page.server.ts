// src/routes/[lang]/[category]/[slug]/+page.server.ts
import { getPost } from '$lib/server/posts';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
  const { lang, category, slug } = params;
  // 🔹 CORREZIONE: Aggiunto 'await'
  const post = await getPost(lang, category, slug);

  if (post.content) {
    post.content = await marked.parse(post.content);
  }

  return {
    post,
  };
};