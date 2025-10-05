<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import { translations } from '$lib/translations';

  export let data: PageData;

  const t = translations[data.lang as keyof typeof translations] || translations.it;
</script>

{#if data.post}
  <div class="max-w-5xl mx-auto bg-slate-900/60 border border-slate-700/80 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-[0_0_20px_theme(colors.cyan.400/0.1)]">
    
    <!-- 
      --- L'UNICA MODIFICA È QUI ---
      Applichiamo le classi 'prose' direttamente al tag <article>.
      Questo assicura che ogni elemento al suo interno (header, div, footer)
      erediti correttamente gli stili tipografici.
    -->
    <article class="prose prose-invert prose-lg max-w-none prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
      
      <header class="mb-8 pb-8 border-b border-slate-700/50">
        <h1 class="text-4xl lg:text-5xl font-bold text-slate-100 leading-tight">
          {data.post.title}
        </h1>
        <p class="mt-4 text-amber-400">
          {t.category}: <a href={`/${data.lang}/${data.post.category}`} class="underline hover:text-cyan-400">{data.post.category}</a>
        </p>
      </header>

      <!-- Questo div non ha più bisogno delle classi prose -->
      <div>
        {@html data.post.content}
      </div>

      {#if data.post.sources && data.post.sources.length > 0}
        <footer class="mt-12 pt-8 border-t border-slate-700/50">
          <h3 class="text-xl font-bold text-slate-300 mb-4">Fonti e Approfondimenti</h3>
          <ol class="space-y-2 list-decimal list-inside">
            {#each data.post.sources as source}
              <li>
                <a href={source.url} target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">
                  {source.text}
                </a>
              </li>
            {/each}
          </ol>
        </footer>
      {/if}

    </article>
  </div>

  <div class="text-center mt-12">
    <a href={`/${data.lang}`} class="text-lg text-cyan-400 hover:underline">← {t.backToHub}</a>
  </div>
{:else}
  <!-- blocco errore -->
{/if}