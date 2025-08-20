/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const modules = import.meta.glob('/src/content/**/*.md');

  const posts = [];
  for (const path in modules) {
    const module = await modules[path]();
    
    // Estraiamo lo slug e ci assicuriamo che non sia undefined
    const slug = path.split('/').pop()?.replace('.md', '');
    if (!slug) continue; // Se non c'è slug, salta al prossimo file

    // Controlliamo che il modulo sia un oggetto e abbia la proprietà 'metadata'
    if (typeof module === 'object' && module && 'metadata' in module) {
      // Ora TypeScript sa che module.metadata esiste
      const metadata = module.metadata;
      
      const lang = path.split('/')[3];
      
      // Controlliamo che anche i metadati siano un oggetto con le proprietà che ci servono
      if (
        typeof metadata === 'object' && metadata &&
        'category' in metadata && 'title' in metadata &&
        lang === params.lang && metadata.category === 'System Anatomy'
      ) {
        posts.push({
          title: metadata.title,
          slug: slug,
        });
      }
    }
  }

  return {
    posts: posts,
    params: params
  };
}