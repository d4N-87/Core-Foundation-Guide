// Rinomina questo file in: src/lib/posts.ts
import fm from 'front-matter';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { categoryColors, defaultCategoryColor } from '$lib/config';

// --- Le tue funzioni helper rimangono IDENTICHE ---
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

// --- I tuoi Tipi rimangono IDENTICI ---
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

// --- NUOVA LOGICA DI CARICAMENTO DATI ---

let allPosts: Post[] = []; // Cache per i post

/**
 * Recupera TUTTI i post di TUTTE le lingue.
 * Questa funzione sostituisce la tua vecchia 'getPosts' e 'getPost'.
 */
export const getPosts = async (): Promise<Post[]> => {
    if (allPosts.length > 0) {
        return allPosts;
    }

    // ▼▼▼ SINTASSI CORRETTA PER 'glob' ▼▼▼
    const allPostFiles = import.meta.glob('/src/content/**/*.md', { query: '?raw' });

    const postPromises = Object.entries(allPostFiles).map(async ([path, resolver]) => {
        // La funzione resolver ora restituisce un modulo, dobbiamo accedere alla proprietà 'default'
        const mod = await resolver() as { default: string };
        const rawContent = mod.default;
        
        const { attributes, body } = fm<any>(rawContent);

        if (!attributes) {
            console.warn(`ATTENZIONE: Frontmatter non trovato per il file: ${path}`);
            return null;
        }

        const match = path.match(/\/src\/content\/([^/]+)\/([^/]+)\/([^/]+)\.md$/);
        if (!match) {
            return null;
        }

        const [, lang, categorySlug, slug] = match;
        const excerptData = attributes.excerpt 
            ? { html: await marked.parse(attributes.excerpt), plain: attributes.excerpt } 
            : await createExcerpt(body);

        const post: Post = {
            lang,
            categorySlug,
            slug,
            categoryName: formatCategoryName(categorySlug),
            categoryColor: categoryColors[categorySlug] || defaultCategoryColor,
            title: attributes.title || 'Senza Titolo',
            excerpt: excerptData.html,
            plainExcerpt: excerptData.plain,
            sources: attributes.sources,
            content: body,
        };
        
        return post;
    });

    const resolvedPosts = await Promise.all(postPromises);
    allPosts = resolvedPosts.filter((p): p is Post => p !== null);
    
    return allPosts;
};