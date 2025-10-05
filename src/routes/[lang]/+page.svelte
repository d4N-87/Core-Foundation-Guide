<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import NodeCard from '$lib/components/NodeCard.svelte';
  import { fade } from 'svelte/transition';
  import { translations } from '$lib/translations';
  import { afterUpdate } from 'svelte';
  import gsap from 'gsap';

  export let data: PageData;
  const t = translations[data.lang as keyof typeof translations] || translations.it;
  
  let activeConnectors: { path: { d: string, id: string }, startCircle: { cx: number, cy: number }, endCircle: { cx: number, cy: number } }[] = [];
  let gridContainer: HTMLElement;

  function getConnectorPoints(element: HTMLElement, side: 'left' | 'right') {
    const rect = element.getBoundingClientRect();
    const gridRect = gridContainer.getBoundingClientRect();
    const x = side === 'right' ? rect.right - gridRect.left : rect.left - gridRect.left;
    const y = rect.top - gridRect.top + rect.height / 2;
    return { x, y };
  }

  function showConnections(slug: string | null) {
    if (!slug || !gridContainer) { activeConnectors = []; return; }
    const post = data.posts.find(p => p.slug === slug);
    const target = document.getElementById(`container-node-${slug}`);
    if (!post || !post.related || !target) { activeConnectors = []; return; }

    const newConnectors = [];
    const originPoint = getConnectorPoints(target, 'right');

    for (const relatedSlug of post.related) {
      const relatedElement = document.getElementById(`container-node-${relatedSlug}`);
      if (relatedElement) {
        const destPoint = getConnectorPoints(relatedElement, 'left');
        const horizontalDistance = Math.abs(destPoint.x - originPoint.x);
        const controlOffset = horizontalDistance * 0.75;
        const control1X = originPoint.x + controlOffset;
        const control1Y = originPoint.y;
        const control2X = destPoint.x - controlOffset;
        const control2Y = destPoint.y;
        const pathData = `M ${originPoint.x},${originPoint.y} C ${control1X},${control1Y} ${control2X},${control2Y} ${destPoint.x},${destPoint.y}`;
        
        newConnectors.push({
          path: { d: pathData, id: `path-${slug}-${relatedSlug}` },
          startCircle: { cx: originPoint.x, cy: originPoint.y },
          endCircle: { cx: destPoint.x, cy: destPoint.y }
        });
      }
    }
    activeConnectors = newConnectors;
  }

  function hideConnections() {
    activeConnectors = [];
  }
  
  afterUpdate(() => {
    const stops = document.querySelectorAll('.gradient-stop-animate');
    stops.forEach(stop => {
      gsap.fromTo(stop, 
        { attr: { 'stop-color': '#22d3ee' } },
        { attr: { 'stop-color': '#facc15' }, duration: 0.6, ease: 'power2.inOut' }
      );
    });
  });
</script>

<header class="mb-12 pt-12 text-center">
  <h1 class="text-4xl font-bold tracking-widest uppercase">
    A.I. FIELD <span class="text-cyan-400">MANUAL</span>
  </h1>
</header>

<div class="relative" bind:this={gridContainer}>
  <svg class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
    {#each activeConnectors as connector (connector.path.id)}
      <path
        transition:fade={{ duration: 200, delay: 0 }}
        d={connector.path.d}
        stroke={`url(#grad-${connector.path.id})`}
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
      />
      <circle transition:fade={{ duration: 200, delay: 0 }} cx={connector.startCircle.cx} cy={connector.startCircle.cy} r="4" fill="#22d3ee" />
      <circle transition:fade={{ duration: 200, delay: 0 }} cx={connector.endCircle.cx} cy={connector.endCircle.cy} r="4" fill="#facc15" />
    {/each}
    <defs>
      {#each activeConnectors as connector (connector.path.id)}
        <linearGradient id={`grad-${connector.path.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22d3ee" />
          <stop class="gradient-stop-animate" offset="100%" stop-color="#22d3ee" />
        </linearGradient>
      {/each}
    </defs>
  </svg>

  <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 pb-12">
    {#if data.posts && data.posts.length > 0}
      {#each data.posts as post}
        <div 
          role="button"
          tabindex="0"
          on:mouseover={() => showConnections(post.slug)}
          on:mouseout={hideConnections}
          on:focus={() => showConnections(post.slug)}
          on:blur={hideConnections}
          on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { location.href = `/${data.lang}/${post.category}/${post.slug}`; } }}
          id="container-node-{post.slug}"
        >
          <NodeCard 
            lang={data.lang}
            category={post.category}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
          />
        </div>
      {/each}
    {:else}
      <p class="col-span-full text-center text-slate-500">{t.noPostsFound}</p>
    {/if}
  </div>
</div>