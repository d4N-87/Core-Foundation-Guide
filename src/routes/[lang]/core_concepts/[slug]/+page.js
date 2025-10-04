import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {
    // Il percorso è costruito dinamicamente, quindi dobbiamo solo cambiare la categoria
    const post = await import(`../../../../content/${params.lang}/core_concepts/${params.slug}.md`);

    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
}