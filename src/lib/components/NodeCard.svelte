<!-- src/lib/components/NodeCard.svelte -->
<script lang="ts">
  import { translations } from '$lib/translations';

  export let lang: string;
  export let category: string = '';
  export let slug: string | undefined;
  export let title: string;
  export let related: string[] | undefined = [];
  export let allPosts: any[];

  function findPostBySlug(relatedSlug: string) {
    return allPosts.find(p => p.slug === relatedSlug);
  }

  // Trasforma "advanced_topics" in "Advanced Topics"
  function formatCategory(cat: string): string {
    if (!cat) return '';
    return cat
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const t = translations[lang as keyof typeof translations] || translations.it;
</script>

<div class="group relative bg-slate-900/60 border border-slate-700/80 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_theme(colors.cyan.400/0.4)] hover:-translate-y-1">
  
  <div class="absolute -top-px -left-px w-4 h-4 border-t border-l border-cyan-400 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <div class="absolute -top-px -right-px w-4 h-4 border-t border-r border-cyan-400 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <div class="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-cyan-400 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <div class="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-cyan-400 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

  <a href={`/${lang}/${category}/${slug}`}>
    <h3 class="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
  </a>
  
  <div class="text-sm text-slate-400 mt-2 flex-grow">
    {t.category}: 
    <a href={`/${lang}/${category}`} class="text-amber-400 underline hover:text-cyan-400 transition-colors">
      {formatCategory(category)}
    </a>
  </div>

  {#if related && related.length > 0}
    <div class="mt-4 pt-4 border-t border-slate-700/50">
      <h4 class="text-xs text-slate-500 mb-2 uppercase tracking-wider">{t.connections}:</h4>
      <div class="flex flex-wrap gap-x-3 gap-y-1">
        {#each related as relationSlug}
          {@const relatedPost = findPostBySlug(relationSlug)}
          {#if relatedPost}
            <a href={`/${lang}/${relatedPost.category}/${relatedPost.slug}`} class="text-xs text-slate-300 underline hover:text-cyan-400 transition-colors">
              {relatedPost.title}
            </a>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>