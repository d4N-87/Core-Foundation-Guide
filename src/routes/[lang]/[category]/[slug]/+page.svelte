<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import { translations } from '$lib/translations';

  export let data: PageData;

  const t = translations[data.lang as keyof typeof translations] || translations.it;
</script>

{#if data.post}
  <!-- Contenitore dell'articolo con padding e larghezza massima -->
  <article class="max-w-3xl mx-auto">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-slate-100 leading-tight">
        {data.post.title}
      </h1>
      <p class="mt-2 text-amber-400">
        {t.category}: <a href={`/${data.lang}/${data.post.category}`} class="underline hover:text-cyan-400">{data.post.category}</a>
      </p>
    </header>

    <!-- 
      Applichiamo le classi 'prose' per lo stile.
      - prose: Stili di base
      - prose-invert: Tema scuro (testo chiaro su sfondo scuro)
      - prose-lg: Aumenta leggermente la dimensione del testo per leggibilità
      - max-w-none: Rimuove il limite di larghezza di prose per usare quello del nostro contenitore
      - prose-a: Stile personalizzato per i link
    -->
    <div class="prose prose-invert prose-lg max-w-none prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
      {@html data.post.content}
    </div>

    <div class="mt-12 pt-6 border-t border-slate-700">
      <a href={`/${data.lang}`} class="text-cyan-400 hover:underline">{t.backToHub}</a>
    </div>
  </article>
{:else}
  <div class="text-center py-20">
    <h1 class="text-2xl text-red-500 font-bold">ERRORE</h1>
    <p class="text-slate-300 mt-2">I dati per questo articolo non sono stati caricati.</p>
  </div>
{/if}