import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {
    // Costruisce il percorso al file .md dinamicamente usando i parametri dall'URL
    const post = await import(`../../../../content/${params.lang}/system_anatomy/${params.slug}.md`);

    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch (e) {
    // Se il file .md non viene trovato, lancia un errore 404
    throw error(404, `Could not find ${params.slug}`);
  }
}