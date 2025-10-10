// src/lib/server/posts.ts
import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { categoryColors, defaultCategoryColor } from '$lib/config';

// --- Funzioni Helper ---
function slugify(text: string) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

function formatCategoryName(text: string) {
  const words = text.replace(/_/g, ' ').split(' ');
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function createExcerpt(content: string, maxLength = 150): Promise<{ html: string; plain: string }> {
    const contentWithoutFrontmatter = content.replace(/---[\s\S]*?---/, '').trim();
    let truncated = contentWithoutFrontmatter.length <= maxLength
        ? contentWithoutFrontmatter
        : contentWithoutFrontmatter.slice(0, maxLength).slice(0, Math.min(contentWithoutFrontmatter.length, contentWithoutFrontmatter.lastIndexOf(' '))) + '...';
    
    const html = await marked.parse(truncated);
    const plain = truncated.replace(/(\*\*|__)(.*?)\1/g, '$2').replace(/(\*|_)(.*?)\1/g, '$2').replace(/#{1,6}\s+(.*)/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1');

    return { html, plain };
}

// --- Tipi ---
export interface Source {
  text: string;
  url: string;
}

export interface Post {
  lang: string;
  categorySlug: string;
  categoryName: string;
  categoryColor: string;
  slug: string;
  title: string;
  excerpt: string;
  plainExcerpt: string;
  content?: string;
  sources?: Source[];
}

const contentDir = path.resolve(process.cwd(), 'src/content');

// --- Funzioni Principali ---

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
      const excerptData = attributes.excerpt ? { html: await marked.parse(attributes.excerpt), plain: attributes.excerpt } : await createExcerpt(body);
      const categorySlug = slugify(categoryName);

      allPosts.push({
        lang: lang,
        categorySlug: categorySlug,
        categoryName: formatCategoryName(categoryName),
        categoryColor: categoryColors[categorySlug] || defaultCategoryColor,
        slug: file.replace(/\.md$/, ''),
        title: attributes.title || 'Senza Titolo',
        excerpt: excerptData.html,
        plainExcerpt: excerptData.plain,
      });
    }
  }
  return allPosts;
}

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
  const excerptData = attributes.excerpt ? { html: await marked.parse(attributes.excerpt), plain: attributes.excerpt } : await createExcerpt(body);

  return {
    lang,
    categorySlug,
    categoryName: formatCategoryName(categoryDirName),
    categoryColor: categoryColors[categorySlug] || defaultCategoryColor,
    slug,
    title: attributes.title || 'Senza Titolo',
    excerpt: excerptData.html,
    plainExcerpt: excerptData.plain,
    content: body,
    sources: attributes.sources || [],
  };
}