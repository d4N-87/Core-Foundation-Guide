<!-- src/lib/components/NodeGrid.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import NodeCard from '$lib/components/NodeCard.svelte';
  import type { Post } from '$lib/server/posts';
  import type { gsap as GSAP } from 'gsap';
  import { fly } from 'svelte/transition';

  export let posts: Post[] = [];
  // Rimosso 'export let t'

  const dispatch = createEventDispatcher();

  let gridElement: HTMLDivElement;
  let gsap: typeof GSAP;

  function handleCardClick(event: MouseEvent | KeyboardEvent, post: Post) {
    dispatch('cardclick', {
      post: post,
      element: event.currentTarget
    });
  }

  onMount(async () => {
    const mod = await import('gsap');
    gsap = mod.gsap;
    
    setTimeout(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.card-container');
      
      function createFloatingAnimation() {
        cards.forEach((card: any) => {
          if (card.floatingTween) card.floatingTween.kill();
          card.floatingTween = gsap.to(card, {
            y: gsap.utils.random(-8, 8),
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: gsap.utils.random(0, 4)
          });
        });
      }

      cards.forEach((card: any) => {
        const border = card.querySelector('.card-border');
        const title = card.querySelector('.card-title');
        const dividers = card.querySelectorAll('.card-divider');
        const categoryText = card.querySelector('.card-category-text');
        const categoryDot = card.querySelector('.card-category-dot');
        card.colorTimeline = gsap.timeline({ paused: true })
          .to([border, ...dividers], { borderColor: '#FBBF24' }, 0)
          .to(title, { color: '#FBBF24' }, 0)
          .to(categoryText, { color: '#F59E0B' }, 0)
          .to(categoryDot, { backgroundColor: '#F59E0B' }, 0);
      });

      createFloatingAnimation();

      gridElement.addEventListener('mouseenter', () => {
        cards.forEach((card: any) => card.floatingTween.kill());
      });

      gridElement.addEventListener('mousemove', (e) => {
        const { left: gridX, top: gridY } = gridElement.getBoundingClientRect();
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
            card.colorTimeline.play();
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
            card.colorTimeline.reverse();
          }
        });
      });

      gridElement.addEventListener('mouseleave', () => {
        cards.forEach((card: any) => {
          gsap.to(card, {
            x: 0, y: 0, scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.75)',
            onComplete: () => {
              createFloatingAnimation();
            }
          });
          card.colorTimeline.reverse();
        });
      });
    }, 100);
  });
</script>

<div class="isolate grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5" bind:this={gridElement}>
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