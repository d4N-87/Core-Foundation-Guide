/// <reference types="@sveltejs/kit" />

declare module '*.md' {
  // "default" è il componente Svelte renderizzato dal Markdown
  export { SvelteComponent as default } from 'svelte';

  // "metadata" è il nostro frontmatter (titolo, fonti, etc.)
  export const metadata: Record<string, any>;
}