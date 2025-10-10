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

  let searchTerm = '';

  $: filteredPosts = searchTerm === '' ? allPosts : allPosts.filter(post => {
    const term = searchTerm.toLowerCase();
    return post.title.toLowerCase().includes(term) || 
           post.plainExcerpt.toLowerCase().includes(term) ||
           post.categoryName.toLowerCase().includes(term);
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
</header>

<div class="max-w-7xl mx-auto px-4 pb-12">
  <NodeGrid posts={filteredPosts} on:cardclick={handleCardClick} />
  
  {#if filteredPosts.length === 0 && allPosts.length > 0}
    <p class="text-center text-slate-500 mt-8">{t.noPostsFound}</p>
  {/if}
</div>