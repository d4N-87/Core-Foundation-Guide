// src/lib/server/posts.ts
import { compile } from 'mdsvex';
import fm from 'front-matter'; // Dobbiamo installare questa dipendenza

// Definiamo un tipo per i metadati estratti da front-matter
type PostMetadata = {
  title: string;
  related?: string[];
};

export type Post = {
  slug: string;
  category: string;
  title: string;
  related?: string[];
  content?: string; // Sarà una stringa HTML
};

// Carichiamo i file come testo grezzo
const modules = import.meta.glob('/src/content/**/*.md', { as: 'raw', eager: true });

// Funzione helper per processare un singolo file
async function processMarkdown(path: string, markdown: string): Promise<Post | null> {
  const { attributes, body } = fm<PostMetadata>(markdown);
  const compiled = await compile(body);

  if (!compiled) return null;

  const pathParts = path.split('/');
  const slug = pathParts.pop()?.replace('.md', '');
  const category = pathParts.pop();

  if (slug && category) {
    return {
      slug,
      category,
      title: attributes.title,
      related: attributes.related,
      content: compiled.code,
    };
  }
  return null;
}

export async function getAllPosts(lang: string): Promise<Post[]> {
  const posts: Post[] = [];
  for (const path in modules) {
    if (path.startsWith(`/src/content/${lang}/`)) {
      const post = await processMarkdown(path, modules[path]);
      if (post) {
        posts.push(post);
      }
    }
  }
  return posts;
}

export async function getPost(lang: string, category: string, slug: string): Promise<Post | null> {
  const path = `/src/content/${lang}/${category}/${slug}.md`;
  const markdown = modules[path];

  if (markdown) {
    return processMarkdown(path, markdown);
  }
  return null;
}