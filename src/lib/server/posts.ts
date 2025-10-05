// src/lib/server/posts.ts
import { compile } from 'mdsvex';
import fm from 'front-matter';
import remarkGfm from 'remark-gfm'; // 1. Importiamo il plugin

type PostMetadata = {
  title: string;
  category?: string;
  [key: string]: any;
};

export type Post = {
  slug: string;
  category: string;
  title: string;
  content?: string;
  [key: string]: any;
};

const modules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default', eager: true });

async function processMarkdown(path: string, markdown: string): Promise<Post | null> {
  try {
    const { attributes, body } = fm<PostMetadata>(markdown);
    
    // --- LA CORREZIONE È QUI ---
    // 2. Passiamo la configurazione direttamente alla funzione 'compile'
    const compiled = await compile(body, {
      smartypants: true,
      remarkPlugins: [remarkGfm], // Abilitiamo la sintassi GFM
    });

    if (!compiled) return null;
    
    const { category: ignoredCategory, ...otherAttributes } = attributes;

    const pathParts = path.split('/');
    const slug = pathParts.pop()?.replace('.md', '');
    const category = pathParts.pop();

    if (slug && category) {
      return {
        slug,
        category,
        ...otherAttributes,
        content: compiled.code,
      };
    }
    return null;
  } catch (e) {
    console.error(`Errore nel processare il file Markdown: ${path}`, e);
    return null;
  }
}

// ... il resto del file (getAllPosts e getPost) rimane identico ...
export async function getAllPosts(lang: string): Promise<Post[]> {
  const posts: Post[] = [];
  for (const path in modules) {
    if (typeof path === 'string' && path.startsWith(`/src/content/${lang}/`)) {
      const markdown = modules[path] as string;
      const post = await processMarkdown(path, markdown);
      if (post) {
        const { content, ...postWithoutContent } = post;
        posts.push(postWithoutContent as Post);
      }
    }
  }
  return posts;
}

export async function getPost(lang: string, category: string, slug: string): Promise<Post | null> {
  const path = `/src/content/${lang}/${category}/${slug}.md`;
  const markdown = modules[path] as string;

  if (markdown) {
    return processMarkdown(path, markdown);
  }
  return null;
}