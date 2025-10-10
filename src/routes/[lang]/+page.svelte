<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import NodeGrid from '$lib/components/NodeGrid.svelte';
  import { goto } from '$app/navigation';
  import type { Post } from '$lib/server/posts';
  import { type Language, fallbackTranslations } from '$lib/translations';
  import { transitionStore } from '$lib/transitionStore';
  import { gsap } from 'gsap';

  export let data: PageData;
  
  const allPosts = data?.posts ?? [];
  const lang = data?.lang as Language | undefined;
  const t = (lang && data?.translations) ? data.translations[lang] : fallbackTranslations;

  const categories = [...new Set(allPosts.map(p => p.categorySlug))].map(slug => ({
    slug,
    name: allPosts.find(p => p.categorySlug === slug)?.categoryName || slug,
    color: allPosts.find(p => p.categorySlug === slug)?.categoryColor || 'slate'
  }));

  let searchTerm = '';
  let selectedCategories: string[] = [];

  $: filteredPosts = allPosts.filter(post => {
    const searchMatch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.plainExcerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategories.length === 0 || 
      selectedCategories.includes(post.categorySlug);
    return searchMatch && categoryMatch;
  });

  async function handleCardClick(event: CustomEvent<{ post: Post, element: HTMLElement }>) {
    const { post, element } = event.detail;
    if (!lang) return;

    transitionStore.set({
      rect: element.getBoundingClientRect(),
      scrollY: window.scrollY
    });
    
    const gridContainer = document.querySelector('.max-w-7xl');
    if (gridContainer) {
      await gsap.to(gridContainer, { opacity: 0, duration: 0.3 }).then();
    }
    
    goto(`/${lang}/${post.categorySlug}/${post.slug}`);
  }
</script>

<header class="mb-8 md:mb-12 pt-12 text-center">
  <h1 class="text-4xl font-bold tracking-widest uppercase text-white">
    A.I. FIELD <span class="text-cyan-400">MANUAL</span>
  </h1>

  <div class="mt-8 max-w-lg mx-auto">
    <input
      type="text"
      bind:value={searchTerm}
      placeholder={t.searchPlaceholder}
      class="w-full bg-slate-900/50 border-2 border-slate-700 rounded-lg px-4 py-2 text-white
             placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400
             transition-all"
    />
  </div>

  <div class="mt-6 flex justify-center items-center gap-x-4 gap-y-3 flex-wrap">
    {#each categories as category}
      <label 
        class="flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-all 
               border-2 border-transparent hover:bg-slate-800/50 
               has-[:checked]:border-amber-500 has-[:checked]:bg-amber-900/30
               has-[:checked]:shadow-[0_0_15px_theme(colors.amber.500/0.4)]"
      >
        <input 
          type="checkbox" 
          value={category.slug}
          bind:group={selectedCategories}
          class="h-4 w-4 rounded-sm appearance-none bg-slate-700 border-2 border-slate-600 
                 checked:bg-amber-500 checked:border-transparent focus:ring-offset-0 
                 focus:ring-2 focus:ring-amber-400 transition"
        />
        <!-- 🔹 CORREZIONE: Testo sempre bianco e leggibile -->
        <span class="text-sm font-medium text-slate-300 has-[:checked]:text-white transition-colors">
          {category.name}
        </span>
      </label>
    {/each}
  </div>
</header>

<div class="max-w-7xl mx-auto px-4 pb-12">
  <NodeGrid posts={filteredPosts} on:cardclick={handleCardClick} />
  
  {#if filteredPosts.length === 0 && allPosts.length > 0}
    <p class="text-center text-slate-500 mt-8">{t.noPostsFound}</p>
  {/if}
</div>