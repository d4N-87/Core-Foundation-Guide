<script lang="ts">
  import type { PageData } from './$types';
  import NodeCard from '$lib/components/NodeCard.svelte';
  export let data: PageData;
</script>

<header class="mb-12 pt-12 text-center">
  <h1 class="text-4xl font-bold tracking-widest uppercase">
    {data.category}
  </h1>
</header>

<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto px-4 pb-12">
  {#if data.posts && data.posts.length > 0}
    {#each data.posts as post}
      <NodeCard
        lang={data.lang}
        category={post.category}
        slug={post.slug}
        title={post.title}
        excerpt={post.excerpt}
      />
    {/each}
  {:else}
    <p class="col-span-full text-center text-slate-500">Nessun articolo trovato per questa categoria.</p>
  {/if}
</div>
