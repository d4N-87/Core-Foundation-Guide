// src/lib/server/posts.ts
import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { categoryColors, defaultCategoryColor } from '$lib/config';

// --- Helper Functions / Funzioni di Supporto ---

// English: Creates a URL-friendly slug from a string.
// Italiano: Crea uno slug URL-friendly da una stringa.
function slugify(text: string) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

// English: Formats a category slug (e.g., 'core_concepts') into a readable name (e.g., 'Core Concepts').
// Italiano: Formatta uno slug di categoria (es. 'core_concepts') in un nome leggibile (es. 'Core Concepts').
function formatCategoryName(text: string) {
  const words = text.replace(/_/g, ' ').split(' ');
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// English: Generates an excerpt from the content if not provided in the frontmatter.
// Italiano: Genera un estratto dal contenuto se non è fornito nel frontmatter.
async function createExcerpt(content: string, maxLength = 150): Promise<{ html: string; plain: string }> {
    // English: Remove frontmatter from content to avoid including it in the excerpt.
    // Italiano: Rimuove il frontmatter dal contenuto per evitare di includerlo nell'estratto.
    const contentWithoutFrontmatter = content.replace(/---[\s\S]*?---/, '').trim();
    let truncated = contentWithoutFrontmatter.length <= maxLength
        ? contentWithoutFrontmatter
        : contentWithoutFrontmatter.slice(0, maxLength).slice(0, Math.min(contentWithoutFrontmatter.length, contentWithoutFrontmatter.lastIndexOf(' '))) + '...';
    
    // English: Parse the truncated content to HTML and create a plain text version.
    // Italiano: Esegue il parsing del contenuto troncato in HTML e crea una versione in testo semplice.
    const html = await marked.parse(truncated);
    const plain = truncated.replace(/(\*\*|__)(.*?)\1/g, '$2').replace(/(\*|_)(.*?)\1/g, '$2').replace(/#{1,6}\s+(.*)/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1');

    return { html, plain };
}

// --- Types / Tipi ---
export interface Source {
  text: string;
  url: string;
}

// English: Defines the structure for a single post object.
// Italiano: Definisce la struttura per un singolo oggetto post.
export interface Post {
  lang: string;
  categorySlug: string;
  categoryName: string;
  categoryColor: string;
  slug: string;
  title: string;
  excerpt: string; // HTML version
  plainExcerpt: string; // Plain text version
  content?: string; // Full markdown content, optional
  sources?: Source[];
}

// English: Defines the absolute path to the content directory.
// Italiano: Definisce il percorso assoluto alla cartella dei contenuti.
const contentDir = path.resolve(process.cwd(), 'src/content');

// --- Main Functions / Funzioni Principali ---

/**
 * English: Retrieves all posts for a specific language.
 * Italiano: Recupera tutti gli articoli per una lingua specifica.
 * @param lang The language code (e.g., 'it', 'en').
 * @returns A promise that resolves to an array of posts.
 */
export async function getPosts(lang: string): Promise<Post[]> {
  const langDir = path.join(contentDir, lang);
  // English: Return an empty array if the language directory doesn't exist.
  // Italiano: Restituisce un array vuoto se la cartella della lingua non esiste.
  if (!fs.existsSync(langDir)) return [];

  const categories = fs.readdirSync(langDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allPosts: Post[] = [];

  // English: Iterate through each category and then each markdown file.
  // Italiano: Itera attraverso ogni categoria e poi ogni file markdown.
  for (const categoryName of categories) {
    const categoryDir = path.join(langDir, categoryName);
    const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      // English: Parse front-matter and body from the markdown file.
      // Italiano: Esegue il parsing del front-matter e del corpo del file markdown.
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

/**
 * English: Retrieves a single post by its language, category, and slug.
 * Italiano: Recupera un singolo articolo tramite lingua, categoria e slug.
 * @param lang The language code.
 * @param categorySlug The category slug.
 * @param slug The post slug.
 * @returns A promise that resolves to a single post object with its full content.
 */
export async function getPost(lang: string, categorySlug: string, slug: string): Promise<Post> {
  const langDir = path.join(contentDir, lang);
  const categories = fs.readdirSync(langDir);
  // English: Find the original category directory name from its slug.
  // Italiano: Trova il nome originale della cartella della categoria dal suo slug.
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

  // English: Returns the full post object, including the markdown body and sources.
  // Italiano: Restituisce l'oggetto post completo, includendo il corpo del markdown e le fonti.
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