import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {
    // MODIFICA
    const post = await import(`../../../../content/${params.lang}/advanced_topics/${params.slug}.md`);

    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
}