<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import NodeGrid from '$lib/components/NodeGrid.svelte';
  export let data: PageData;

  // I dati dei post arrivano dal +page.server.ts
  const posts = data.posts ?? [];
</script>

<header class="mb-8 md:mb-12 pt-12 text-center">
  <h1 class="text-4xl font-bold tracking-widest uppercase">
    A.I. FIELD <span class="text-cyan-400">MANUAL</span>
  </h1>
</header>

<!-- 
  🔹 CORREZIONE: L'unico contenitore qui serve a centrare la griglia.
  NON ci sono classi 'grid' o loop qui.
-->
<div class="max-w-7xl mx-auto px-4 pb-12">
  {#if posts.length > 0}
    <!-- Tutta la responsabilità della griglia è delegata a NodeGrid -->
    <NodeGrid {posts} lang={data.lang} />
  {:else}
    <p class="text-center text-slate-500">Nessun articolo trovato per questa lingua.</p>
  {/if}
</div>