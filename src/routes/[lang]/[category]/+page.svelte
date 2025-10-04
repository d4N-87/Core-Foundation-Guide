<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
  // ... lo script rimane uguale ...
  import type { PageData } from './$types';
  import NodeCard from '$lib/components/NodeCard.svelte';
  export let data: PageData;
</script>

<!-- Abbiamo rimosso il div contenitore esterno -->
<header class="mb-12 pt-12 text-center">
  <h1 class="text-4xl font-bold tracking-widest uppercase">
    A.I. FIELD <span class="text-cyan-400">MANUAL</span>
  </h1>
</header>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 pb-12">
  <!-- ... il resto del file rimane uguale ... -->
  {#if data.posts && data.posts.length > 0}
      {#each data.posts as post}
        <NodeCard 
          lang={data.lang}
          category={post.category}
          slug={post.slug}
          title={post.title}
          related={post.related}
          allPosts={data.posts}
        />
      {/each}
    {:else}
      <p class="col-span-full text-center text-slate-500">Nessun articolo trovato per questa lingua.</p>
    {/if}
</div>