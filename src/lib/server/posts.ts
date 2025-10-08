// src/lib/server/posts.ts
import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

// --- Funzioni Helper ---
function slugify(text: string) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

function formatCategoryName(text: string) {
  const words = text.replace(/_/g, ' ').split(' ');
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// 🔹 CORREZIONE: La funzione helper ora è asincrona
async function createExcerpt(content: string, maxLength = 100): Promise<string> {
  const contentWithoutFrontmatter = content.replace(/---[\s\S]*?---/, '').trim();
  const truncatedContent = contentWithoutFrontmatter.length <= maxLength
    ? contentWithoutFrontmatter
    : contentWithoutFrontmatter.slice(0, maxLength).trim() + '...';
  
  return await marked.parse(truncatedContent);
}

// --- Tipi ---
export interface Post {
  lang: string;
  categorySlug: string;
  categoryName: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
}

const contentDir = path.resolve(process.cwd(), 'src/content');

// --- Funzioni Principali Esportate ---

// 🔹 CORREZIONE: getPosts ora è una funzione asincrona
export async function getPosts(lang: string): Promise<Post[]> {
  const langDir = path.join(contentDir, lang);
  if (!fs.existsSync(langDir)) return [];

  const categories = fs.readdirSync(langDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allPosts: Post[] = [];

  for (const categoryName of categories) {
    const categoryDir = path.join(langDir, categoryName);
    const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { attributes, body } = fm<any>(fileContent);

      allPosts.push({
        lang: lang,
        categorySlug: slugify(categoryName),
        categoryName: formatCategoryName(categoryName),
        slug: file.replace(/\.md$/, ''),
        title: attributes.title || 'Senza Titolo',
        // 🔹 CORREZIONE: Usiamo 'await' per aspettare il risultato di marked
        excerpt: attributes.excerpt ? await marked.parse(attributes.excerpt) : await createExcerpt(body),
      });
    }
  }
  return allPosts;
}

// 🔹 CORREZIONE: getPost ora è una funzione asincrona
export async function getPost(lang: string, categorySlug: string, slug: string): Promise<Post> {
  const langDir = path.join(contentDir, lang);
  const categories = fs.readdirSync(langDir);
  const categoryDirName = categories.find(dir => slugify(dir) === categorySlug);

  if (!categoryDirName) {
    throw error(404, 'Categoria non trovata');
  }

  const filePath = path.join(langDir, categoryDirName, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw error(404, 'Articolo non trovato');
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { attributes, body } = fm<any>(fileContent);

  return {
    lang,
    categorySlug,
    categoryName: formatCategoryName(categoryDirName),
    slug,
    title: attributes.title || 'Senza Titolo',
    // 🔹 CORREZIONE: Usiamo 'await' anche qui
    excerpt: attributes.excerpt ? await marked.parse(attributes.excerpt) : await createExcerpt(body),
    content: body,
  };
}