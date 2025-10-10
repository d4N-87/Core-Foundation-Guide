<!-- src/lib/components/NodeGrid.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import NodeCard from '$lib/components/NodeCard.svelte';
  import type { Post } from '$lib/server/posts';
  import type { gsap as GSAP } from 'gsap';
  import { fly } from 'svelte/transition';

  export let posts: Post[] = [];

  const dispatch = createEventDispatcher();
  let gsap: typeof GSAP;

  function handleCardClick(event: MouseEvent | KeyboardEvent, post: Post) {
    dispatch('cardclick', {
      post: post,
      element: event.currentTarget
    });
  }

  /**
   * L'AZIONE SVELTE PER LE ANIMAZIONI
   */
  // 🔹 CORREZIONE: La funzione ora accetta il secondo parametro 'posts'
  function animateGrid(node: HTMLElement, posts: Post[]) {
    let ctx: gsap.Context;

    function init() {
      if (!gsap) return;
      if (ctx) ctx.revert();

      const cards = gsap.utils.toArray<HTMLElement>('.card-container');
      
      ctx = gsap.context(() => {
        function createFloatingAnimation() {
          gsap.to(cards, {
            y: (i) => gsap.utils.random(-8, 8),
            duration: (i) => gsap.utils.random(3, 5),
            repeat: -1, yoyo: true, ease: 'sine.inOut',
            delay: (i) => gsap.utils.random(0, 4)
          });
        }

        cards.forEach((card: any) => {
          card.colorTimeline = gsap.timeline({ paused: true })
            .to(card.querySelectorAll('.card-border, .card-divider'), { borderColor: '#FBBF24' }, 0)
            .to(card.querySelector('.card-title'), { color: '#FBBF24' }, 0)
            .to(card.querySelector('.card-category-text'), { color: '#F59E0B' }, 0)
            .to(card.querySelector('.card-category-dot'), { backgroundColor: '#F59E0B' }, 0);
        });

        createFloatingAnimation();

        node.addEventListener('mouseenter', () => gsap.killTweensOf(cards, 'y'));
        node.addEventListener('mousemove', (e: MouseEvent) => {
          const { left: gridX, top: gridY } = node.getBoundingClientRect();
          const mouseX = e.clientX - gridX;
          const mouseY = e.clientY - gridY;

          let activeCard: HTMLElement | null = null;
          for (const card of cards) {
              const { left, top, width, height } = card.getBoundingClientRect();
              const cardLeft = left - gridX;
              const cardTop = top - gridY;
              if (mouseX >= cardLeft && mouseX <= cardLeft + width && mouseY >= cardTop && mouseY <= cardTop + height) {
                  activeCard = card;
                  break;
              }
          }

          cards.forEach((card: any) => {
            if (card === activeCard) {
              gsap.to(card, { x: 0, y: -10, scale: 1.1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
              if(card.colorTimeline) card.colorTimeline.play();
            } 
            else {
              const { left, top, width, height } = card.getBoundingClientRect();
              const cardX = (left - gridX) + width / 2;
              const cardY = (top - gridY) + height / 2;
              const distance = Math.hypot(mouseX - cardX, mouseY - cardY);
              let targetX = 0, targetY = 0;
              if (distance < width * 4) { 
                const angle = Math.atan2(mouseY - cardY, mouseX - cardX);
                const move = -400 / distance;
                targetX = Math.cos(angle) * move;
                targetY = Math.sin(angle) * move;
              }
              gsap.to(card, { x: targetX, y: targetY, scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
              if(card.colorTimeline) card.colorTimeline.reverse();
            }
          });
        });
        node.addEventListener('mouseleave', () => {
          gsap.to(cards, {
            x: 0, y: 0, scale: 1,
            duration: 0.6, ease: 'elastic.out(1, 0.75)',
            onComplete: createFloatingAnimation
          });
          cards.forEach((card: any) => {
            if (card.colorTimeline) card.colorTimeline.reverse();
          });
        });
      }, node);
    }

    // Diamo a Svelte il tempo di far finire la transizione 'fly'
    setTimeout(init, 350);

    return {
      update() {
        // Questa funzione viene chiamata da Svelte ogni volta che 'posts' cambia
        setTimeout(init, 350);
      },
      destroy() {
        if (ctx) ctx.revert();
      }
    };
  }

  onMount(async () => {
    const mod = await import('gsap');
    gsap = mod.gsap;
  });
</script>

<div 
  class="isolate grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5" 
  use:animateGrid={posts}
>
  {#each posts as post (post.slug)}
    <div 
      class="card-container aspect-square cursor-pointer"
      role="button"
      tabindex="0"
      on:click={(e) => handleCardClick(e, post)}
      on:keydown={(e) => { if (e.key === 'Enter') handleCardClick(e, post) }}
      in:fly={{ y: 20, duration: 300, delay: 100 }}
      out:fly={{ y: 20, duration: 200 }}
    >
      <NodeCard
        categoryName={post.categoryName}
        title={post.title}
        excerpt={post.excerpt}
      />
    </div>
  {/each}
</div>