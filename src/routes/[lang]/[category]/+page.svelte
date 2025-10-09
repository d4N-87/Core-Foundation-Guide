<!-- src/routes/[lang]/[category]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import NodeGrid from '$lib/components/NodeGrid.svelte';
  import { goto } from '$app/navigation';
  import type { Post } from '$lib/server/posts';
  import { type Language, fallbackTranslations } from '$lib/translations';
  import { transitionStore } from '$lib/transitionStore';
  import { gsap } from 'gsap'; // Importiamo gsap per l'animazione di uscita

  export let data: PageData;
  
  const posts = data?.posts ?? [];
  const lang = data?.lang as Language | undefined;
  const category = data?.category;
  const t = (lang && data?.translations) ? data.translations[lang] : fallbackTranslations;

  async function handleCardClick(event: CustomEvent<{ post: Post, element: HTMLElement }>) {
    const { post, element } = event.detail;
    if (!lang) return;

    // 🔹 CORREZIONE: Passiamo l'oggetto completo con entrambe le proprietà
    transitionStore.set({
      rect: element.getBoundingClientRect(),
      scrollY: window.scrollY
    });
    
    // Aggiungiamo anche qui l'animazione di fade-out per coerenza
    const gridContainer = document.querySelector('.max-w-7xl');
    if (gridContainer) {
      await gsap.to(gridContainer, { opacity: 0, duration: 0.3 }).then();
    }
    
    goto(`/${lang}/${post.categorySlug}/${post.slug}`);
  }
</script>

<header class="mb-8 md:mb-12 pt-12 text-center">
  <h1 class="text-4xl font-bold tracking-widest uppercase text-white">
    {t.pageTitleCategory}: <span class="text-cyan-400">{category}</span>
  </h1>
  <a href={`/${lang}`} class="text-amber-400 hover:underline mt-4 block">
    {t.backToHub}
  </a>
</header>

<div class="max-w-7xl mx-auto px-4 pb-12">
  {#if posts.length > 0}
    <NodeGrid {posts} {t} on:cardclick={handleCardClick} />
  {:else}
    <p class="text-center text-slate-500">{t.noPostsFound}</p>
  {/if}
</div>