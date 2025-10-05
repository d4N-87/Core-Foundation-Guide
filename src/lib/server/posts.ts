// src/lib/server/posts.ts
import { compile } from 'mdsvex';
import fm from 'front-matter';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import visit from 'unist-util-visit';

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt?: string;
  content?: string;
  [key: string]: any;
};

const modules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default', eager: true });

async function processMarkdown(path: string, markdown: string): Promise<Post | null> {
  try {
    const { attributes, body } = fm<any>(markdown);
    const compiled = await compile(body, {
      smartypants: true,
      remarkPlugins: [remarkGfm],
    });
    if (!compiled) return null;

    const processedContent = await unified()
      .use(rehypeParse, { fragment: true })
      .use(() => (tree: any) => {
        visit(tree, 'element', (node: any) => {
          if (node.tagName === 'strong') {
            node.properties = node.properties || {};
            if (!Array.isArray(node.properties.className)) {
              node.properties.className = [];
            }
            node.properties.className.push('text-amber-400');
          }
        });
      })
      .use(rehypeStringify)
      .process(compiled.code);
    
    const content = String(processedContent);

    const firstParagraphMatch = content.match(/<p>(.*?)<\/p>/);
    let excerpt = '';
    if (firstParagraphMatch && firstParagraphMatch[1]) {
      excerpt = firstParagraphMatch[1].substring(0, 150) + '...';
    }

    const { category: ignoredCategory, ...otherAttributes } = attributes;
    const pathParts = path.split('/');
    const slug = pathParts.pop()?.replace('.md', '');
    const category = pathParts.pop();

    if (slug && category) {
      return { slug, category, ...otherAttributes, excerpt, content };
    }
    return null;
  } catch (e) { return null; }
}

export async function getAllPosts(lang: string): Promise<Post[]> {
  const posts: Post[] = [];
  for (const path in modules) {
    if (typeof path === 'string' && path.startsWith(`/src/content/${lang}/`)) {
      const markdown = modules[path] as string;
      const post = await processMarkdown(path, markdown);
      if (post) {
        posts.push(post as Post);
      }
    }
  }
  return posts;
}

export async function getPost(lang: string, category: string, slug: string): Promise<Post | null> {
  const path = `/src/content/${lang}/${category}/${slug}.md`;
  const markdown = modules[path] as string;
  if (markdown) { return processMarkdown(path, markdown); }
  return null;
}