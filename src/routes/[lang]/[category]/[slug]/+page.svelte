<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const { post } = data;
</script>

<div class="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
  <div
    class="w-full max-w-4xl rounded-xl
           bg-gradient-to-br from-cyan-950/20 to-slate-950/10
           backdrop-blur-lg border-2 border-cyan-500/30
           shadow-2xl shadow-cyan-900/50
           p-6 md:p-10"
    style="view-transition-name: article-{post.categorySlug}-{post.slug}"
  >
    <a 
      href={`/${post.lang}`} 
      class="text-cyan-400 hover:text-amber-400 transition-colors mb-8 block font-semibold"
    >
      &larr; Torna agli articoli
    </a>

    <article class="prose prose-invert lg:prose-xl prose-strong:text-amber-400 prose-hr:border-cyan-500/30 prose-ol:text-gray-400">
      <h1>{post.title}</h1>
      {@html post.content}

      {#if post.sources && post.sources.length > 0}
        <hr />
        <h2>Fonti</h2>
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
</div>