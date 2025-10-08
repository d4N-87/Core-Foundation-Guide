<!-- src/lib/components/NodeGrid.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import NodeCard from '$lib/components/NodeCard.svelte';
  import type { Post } from '$lib/server/posts';
  import type { gsap as GSAP } from 'gsap';

  export let posts: Post[] = [];
  export let lang: string;

  let gridElement: HTMLDivElement;
  let gsap: typeof GSAP;

  onMount(async () => {
    const mod = await import('gsap');
    gsap = mod.gsap;
    
    requestAnimationFrame(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.card-container');
      
      // 🔹 Per ogni card, creiamo e salviamo la sua timeline di animazione dei colori
      cards.forEach((card: any) => {
        const border = card.querySelector('.card-border');
        const title = card.querySelector('.card-title');
        const dividers = card.querySelectorAll('.card-divider');
        const categoryText = card.querySelector('.card-category-text');
        const categoryDot = card.querySelector('.card-category-dot');

        const tl = gsap.timeline({ paused: true });
        tl.to(border, { borderColor: '#FBBF24' }, 0)
          .to(title, { color: '#FBBF24' }, 0)
          .to(dividers, { borderColor: 'rgba(251, 191, 36, 0.3)' }, 0)
          .to(categoryText, { color: '#F59E0B' }, 0)
          .to(categoryDot, { backgroundColor: '#F59E0B' }, 0);
        
        card.colorTimeline = tl; // Salviamo la timeline direttamente sull'elemento
      });

      // 🔹 Listener sull'INTERA GRIGLIA
      gridElement.addEventListener('mousemove', (e) => {
        const { left: gridX, top: gridY } = gridElement.getBoundingClientRect();
        const mouseX = e.clientX - gridX;
        const mouseY = e.clientY - gridY;

        cards.forEach((card: any) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const cardX = (left - gridX) + width / 2;
          const cardY = (top - gridY) + height / 2;
          
          const distance = Math.hypot(mouseX - cardX, mouseY - cardY);
          const angle = Math.atan2(mouseY - cardY, mouseX - cardX);

          // Se siamo molto vicini (sopra la card)
          if (distance < width * 0.8) {
            gsap.to(card, { x: 0, y: -10, scale: 1.1, ease: 'power2.out', duration: 0.4, overwrite: 'auto' });
            card.colorTimeline.play();
          } 
          // Se siamo nel "campo di influenza"
          else if (distance < width * 2) {
            const move = -80 / distance; // Invertiamo la forza per respingere
            gsap.to(card, { x: Math.cos(angle) * move, y: Math.sin(angle) * move, scale: 1, ease: 'power2.out', duration: 0.4, overwrite: 'auto' });
            card.colorTimeline.reverse();
          } 
          // Se siamo lontani
          else {
            gsap.to(card, { x: 0, y: 0, scale: 1, ease: 'power2.out', duration: 0.4, overwrite: 'auto' });
            card.colorTimeline.reverse();
          }
        });
      });

      // 🔹 Quando il mouse LASCIA L'INTERA GRIGLIA, resetta tutto
      gridElement.addEventListener('mouseleave', () => {
        cards.forEach((card: any) => {
          gsap.to(card, {
            x: 0, y: 0, scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.75)'
          });
          card.colorTimeline.reverse();
        });
      });
    });
  });
</script>

<!-- Il markup HTML di NodeGrid rimane invariato -->
<div class="isolate grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5" bind:this={gridElement}>
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