<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { transitionStore, type TransitionData } from '$lib/transitionStore';
  import { gsap } from 'gsap';
  import type { PageData } from './$types';
  import { type Language, fallbackTranslations } from '$lib/translations';

  export let data: PageData;
  
  const post = data.post;
  const translations = data.translations;

  const lang = post?.lang as Language;
  const t = (lang && translations) ? translations[lang] : fallbackTranslations;

  let articleWrapper: HTMLElement;
  let startRect: DOMRect | null = null;

  onMount(() => {
    const transitionData = $transitionStore;
    startRect = transitionData?.rect || null;
    transitionStore.set(null);

    if (!startRect) {
      gsap.to(articleWrapper, { autoAlpha: 1, duration: 0.3 });
      return;
    }

    gsap.delayedCall(0.01, () => {
        const endRect = articleWrapper.getBoundingClientRect();
        if (startRect) {
            gsap.set(articleWrapper, {
              position: 'fixed', top: startRect.top, left: startRect.left,
              width: startRect.width, height: startRect.height, margin: 0, zIndex: 50,
            });
            gsap.to(articleWrapper, {
              top: endRect.top, left: endRect.left, width: endRect.width, height: endRect.height,
              duration: 0.4,
              ease: 'power3.inOut',
              autoAlpha: 1,
              onComplete: () => {
                gsap.set(articleWrapper, { position: 'relative', top: 'auto', left: 'auto', width: '100%', height: 'auto', overwrite: true });
              }
            });
        }
    });
  });

  async function goBack() {
    const targetLang = post?.lang || 'it'; 

    if (!startRect) {
      await goto(`/${targetLang}`);
      return;
    }
    
    await gsap.to(articleWrapper, {
      top: startRect.top, left: startRect.left, width: startRect.width, height: startRect.height,
      duration: 0.4,
      ease: 'power3.inOut',
      autoAlpha: 0,
    }).then();
    
    await goto(`/${targetLang}`);
  }
</script>

<div class="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
  <div 
    bind:this={articleWrapper}
    class="w-full max-w-4xl rounded-xl
           bg-gradient-to-br from-cyan-950/20 to-slate-950/10
           backdrop-blur-lg border-2 border-cyan-500/30
           shadow-2xl shadow-cyan-900/50
           p-6 md:p-10"
    style="visibility: hidden;"
  >
    {#if post}
      <button on:click={goBack} class="text-cyan-400 hover:text-amber-400 transition-colors mb-8 block font-semibold">
        &larr; {t.backToArticles}
      </button>

      <article class="prose prose-invert lg:prose-xl prose-strong:text-amber-400 prose-hr:border-cyan-500/30 prose-ol:text-gray-400">
        <h1>{post.title}</h1>
        {@html post.content}

        {#if post.sources && post.sources.length > 0}
          <hr />
          <h2>{t.sources}</h2>
          <ol>
            {#each post.sources as source}
              <li>
                <a href={source.url} target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-amber-400 hover:underline transition-colors">
                  {source.text}
                </a>
              </li>
            {/each}
          </ol>
        {/if}
      </article>
    {/if}
  </div>
</div>