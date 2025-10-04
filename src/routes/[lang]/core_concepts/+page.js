/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const modules = import.meta.glob('/src/content/**/*.md');

  const posts = [];
  for (const path in modules) {
    const module = await modules[path]();
    
    const slug = path.split('/').pop()?.replace('.md', '');
    if (!slug) continue;

    if (typeof module === 'object' && module && 'metadata' in module) {
      const metadata = module.metadata;
      const lang = path.split('/')[3];
      
      if (
        typeof metadata === 'object' && metadata &&
        'category' in metadata && 'title' in metadata &&
        lang === params.lang && metadata.category === 'Core Concepts' // <-- Modifica chiave
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