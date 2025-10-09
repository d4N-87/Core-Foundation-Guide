<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import NodeGrid from '$lib/components/NodeGrid.svelte';
  import { transitionStore } from '$lib/transitionStore';
  import { goto } from '$app/navigation';

  export let data: PageData;
  const posts = data.posts ?? [];

  function handleCardClick(event: CustomEvent) {
    const { slug, categorySlug, element } = event.detail;
    
    // 1. Salviamo le coordinate dell'elemento cliccato
    transitionStore.set(element.getBoundingClientRect());
    
    // 2. Navighiamo alla pagina dell'articolo
    goto(`/${data.lang}/${categorySlug}/${slug}`);
  }
</script>

<header class="mb-8 md:mb-12 pt-12 text-center">
  <h1 class="text-4xl font-bold tracking-widest uppercase">
    A.I. FIELD <span class="text-cyan-400">MANUAL</span>
  </h1>
</header>

<div class="max-w-7xl mx-auto px-4 pb-12">
  {#if posts.length > 0}
    <!-- Ascoltiamo l'evento 'cardclick' dal nostro NodeGrid -->
    <NodeGrid {posts} lang={data.lang} on:cardclick={handleCardClick} />
  {:else}
    <p class="text-center text-slate-500">Nessun articolo trovato.</p>
  {/if}
</div>