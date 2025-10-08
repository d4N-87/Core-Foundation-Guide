<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  // 'data' viene popolato automaticamente da SvelteKit con il risultato della funzione 'load'
  export let data: PageData;
  const { post } = data;
</script>

<div class="max-w-4xl mx-auto px-4 py-16">
  <!-- Un link per tornare indietro, utile per la navigazione -->
  <a href={`/${post.lang}`} class="text-cyan-400 hover:text-amber-400 transition-colors mb-8 block font-semibold">
    &larr; Torna agli articoli
  </a>

  <!-- 
    Usiamo le classi 'prose' del plugin typography per dare uno stile
    predefinito e leggibile al contenuto HTML generato dal Markdown.
    'prose-invert' è per lo sfondo scuro.
    'prose-strong:text-amber-400' applica il nostro colore custom al testo in grassetto.
  -->
  <article class="prose prose-invert lg:prose-xl prose-strong:text-amber-400">
    <h1>{post.title}</h1>

    <!-- 
      {@html ...} renderizza la stringa HTML che abbiamo generato nel file .server.ts.
      È sicuro perché il contenuto proviene dai tuoi file .md, non da input esterni.
    -->
    {@html post.content}
  </article>
</div>