// src/routes/[lang]/+page.server.ts

// NON importiamo più nulla da './$types'

type PostMetadata = { title: string; related?: string[] };

// DEFINIAMO A MANO IL TIPO PER LA FUNZIONE 'load'
// Sappiamo che riceve un oggetto con una proprietà 'params', che a sua volta contiene 'lang'.
export const load = async ({ params }: { params: { lang: string } }) => {
  const lang = params.lang || 'it';
  
  // Questa parte è corretta e la manteniamo
  const modules = import.meta.glob('/src/content/**/*.md');

  const filteredModules = Object.fromEntries(
    Object.entries(modules).filter(([path]) => path.startsWith(`/src/content/${lang}/`))
  );

  const postsPromises = Object.entries(filteredModules).map(async ([path, resolver]) => {
    // Aggiungiamo un tipo esplicito per 'resolver' per massima sicurezza
    const resolved = await (resolver as () => Promise<{ metadata: PostMetadata }>)();
    const metadata = resolved.metadata;

    const pathParts = path.split('/');
    const slug = pathParts.pop()?.replace('.md', '');
    const category = pathParts.pop();
    
    if (!slug || !category) return null;
    
    return { slug, category, ...metadata };
  });

  const postsUnfiltered = await Promise.all(postsPromises);
  const posts = postsUnfiltered.filter(p => p !== null);

  return { posts, lang };
};