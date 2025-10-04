<!-- src/routes/[lang]/+page.svelte -->

<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  // Definiamo il tipo per un singolo post per TypeScript
  type Post = {
    slug: string | undefined;
    category: string | undefined;
    title: string;
    related?: string[];
    [key: string]: any;
  };

  const translations = {
    it: {
      category: "Categoria",
      connections: "Collegamenti"
    },
    en: {
      category: "Category",
      connections: "Connections"
    }
  };

  const t = translations[data.lang as keyof typeof translations] || translations.it;

  function findPostBySlug(slug: string) {
    return data.posts.find((p: Post) => p.slug === slug);
  }
</script>

<div class="bg-slate-900 text-white min-h-screen font-['Inter']">
  <header class="mb-12 pt-12 text-center">
    <h1 class="text-4xl font-bold tracking-widest uppercase">
      A.I. FIELD <span class="text-cyan-400">MANUAL</span>
    </h1>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 pb-12">
    {#if data.posts && data.posts.length > 0}
      {#each data.posts as post}
        <div class="bg-slate-800/50 border border-cyan-400/20 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:scale-105 hover:bg-slate-800">
          
          <a href={`/${data.lang}/${post.category}/${post.slug}`}>
            <h3 class="text-lg font-bold text-white hover:text-cyan-400 transition-colors">{post.title}</h3>
          </a>
          
          <div class="text-sm text-gray-400 mt-2 flex-grow">
            {t.category}: 
            <a href={`/${data.lang}/${post.category}`} class="underline hover:text-cyan-400 transition-colors">
              {post.category}
            </a>
          </div>

          {#if post.related && post.related.length > 0}
            <div class="mt-4 pt-3 border-t border-gray-700/50">
              <h4 class="text-xs text-gray-500 mb-2">{t.connections}:</h4>
              <div class="flex flex-wrap gap-x-3 gap-y-1">
                {#each post.related as relationSlug}
                  {@const relatedPost = findPostBySlug(relationSlug)}
                  {#if relatedPost}
                    <a href={`/${data.lang}/${relatedPost.category}/${relatedPost.slug}`} class="text-xs underline hover:text-cyan-400 transition-colors">
                      {relatedPost.title}
                    </a>
                  {/if}
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    {:else}
      <p class="col-span-full text-center text-gray-500">Nessun articolo trovato per questa lingua.</p>
    {/if}
  </div>
</div>