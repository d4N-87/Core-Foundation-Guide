<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const { post } = data;
</script>

<div class="max-w-4xl mx-auto px-4 py-16">
  <a href={`/${post.lang}`} class="text-cyan-400 hover:text-amber-400 transition-colors mb-8 block font-semibold">
    &larr; Torna agli articoli
  </a>

  <!-- 
    🔹 CORREZIONE: La sezione delle fonti è stata spostata QUI DENTRO.
    Ho anche aggiunto una classe per stilizzare i marker (i numeri) della lista.
  -->
  <article class="prose prose-invert lg:prose-xl prose-strong:text-amber-400 prose-hr:border-cyan-500/30 prose-ol:text-gray-400">
    <h1>{post.title}</h1>
    {@html post.content}

    <!-- Sezione Fonti (ora all'interno dell'articolo) -->
    {#if post.sources && post.sources.length > 0}
      <!-- 'prose' si occuperà di aggiungere lo spazio corretto e lo stile a hr e h2 -->
      <hr />
      <h2>Fonti</h2>
      
      <!-- 'prose' applicherà automaticamente lo stile di elenco numerato a <ol> -->
      <ol>
        {#each post.sources as source}
          <li>
            <a href={source.url} target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-amber-400 hover:underline transition-colors">
              {source.text}
            </a>
          </li>
        {/each}
      </ol>
    {/if}
  </article>
</div>