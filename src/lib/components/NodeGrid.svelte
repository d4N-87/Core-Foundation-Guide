<!-- src/lib/components/NodeGrid.svelte -->
<script lang="ts">
  // La parte <script> rimane ESATTAMENTE la stessa di prima
  import { onMount } from 'svelte';
  import NodeCard from '$lib/components/NodeCard.svelte';
  import type { Post } from '$lib/server/posts';
  import type { gsap as GSAP } from 'gsap';

  export let posts: Post[] = [];
  export let lang: string;

  let gridElement: HTMLDivElement;
  let gsap: typeof GSAP;

  const getDistance = (el1: HTMLElement, el2: HTMLElement) => {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const dx = rect1.left + rect1.width / 2 - (rect2.left + rect2.width / 2);
    const dy = rect1.top + rect1.height / 2 - (rect2.top + rect2.height / 2);
    return Math.sqrt(dx * dx + dy * dy);
  };

  onMount(async () => {
    const mod = await import('gsap');
    gsap = mod.gsap;
    
    requestAnimationFrame(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.card-container');
      const strength = 80;

      const ctx = gsap.context(() => {
        cards.forEach((card: HTMLElement) => {
          gsap.from(card, {
            opacity: 0,
            scale: 0.9,
            y: 30,
            duration: 0.5,
            delay: cards.indexOf(card) * 0.05,
            ease: 'power3.out'
          });

          card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.08, y: -10, duration: 0.4, ease: 'power3.out' });
            cards.forEach((otherCard: HTMLElement) => {
              if (otherCard === card) return;
              const distance = getDistance(card, otherCard);
              const angle = Math.atan2(
                otherCard.getBoundingClientRect().top - card.getBoundingClientRect().top,
                otherCard.getBoundingClientRect().left - card.getBoundingClientRect().left
              );
              const move = strength / Math.max(distance, 50);
              gsap.to(otherCard, {
                x: Math.cos(angle) * move,
                y: Math.sin(angle) * move,
                scale: 1 - (move / strength) * 0.1,
                duration: 0.4,
                ease: 'power3.out',
              });
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(cards, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'elastic.out(1, 0.75)',
            });
          });
        });
      }, gridElement);

      return () => ctx.revert();
    });
  });
</script>

<!-- 
  🔹 CORREZIONE: Modificata la responsività della griglia.
  - Smartphone: 2 colonne
  - Tablet (md): 3 colonne
  - Desktop (lg): 4 colonne (rende le card più grandi)
  - Desktop Larghi (xl): 5 colonne (leggermente più dense su schermi molto ampi)
-->
<div
  class="isolate grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5"
  bind:this={gridElement}
>
  {#if posts && posts.length > 0}
    {#each posts as post (post.slug)}
      <div class="card-container aspect-square">
        <NodeCard
          lang={lang}
          categorySlug={post.categorySlug}
          categoryName={post.categoryName}
          slug={post.slug}
          title={post.title}
          excerpt={post.excerpt}
        />
      </div>
    {/each}
  {/if}
</div>