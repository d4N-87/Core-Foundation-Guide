<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<article class="space-y-6">
  <h1 class="text-4xl uppercase text-yellow-300">
    &gt; {data.metadata.title}
  </h1>

  <svelte:component this={data.content} />

  {#if data.metadata.sources && data.metadata.sources.length > 0}
    <div class="mt-12 border-t-2 border-green-700 pt-4">
      <h3 class="text-xl uppercase text-green-300 mb-2">Fonti & Risorse</h3>
      <ol class="list-decimal list-inside space-y-1">
        {#each data.metadata.sources as source}
          <li>
            <a href={source.url} target="_blank" rel="noopener noreferrer" class="underline hover:text-white">
              {source.text}
            </a>
          </li>
        {/each}
      </ol>
    </div>
  {/if}
</article>