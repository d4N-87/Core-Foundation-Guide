<!-- src/lib/components/NodeCard.svelte -->
<script lang="ts">
  export let title: string;
  export let slug: string;
  export let categorySlug: string;
  export let categoryName: string;
  export let lang: string;
  export let excerpt: string | undefined;

  const cardHref = `/${lang}/${categorySlug}/${slug}`;
</script>

<a href={cardHref} class="block h-full w-full text-left">
  <div
    class="relative h-full w-full rounded-xl
           bg-gradient-to-br from-cyan-950/20 to-slate-950/10
           backdrop-blur-lg border-2 border-cyan-500/30
           shadow-lg shadow-cyan-900/50
           group-hover:border-amber-400/80 group-hover:shadow-xl group-hover:shadow-amber-500/20
           overflow-hidden
           ease-in-out duration-300
           grid grid-rows-[auto_1fr_auto]" 
    >
    <!-- SEZIONE 1: Titolo -->
    <div class="p-4 pb-3 md:p-5 md:pb-4">
      <!-- 🔹 CORREZIONE 2: Ridotta la dimensione del titolo su desktop (rimosso md:text-lg) -->
      <h2 class="font-bold text-gray-100 text-base transition-colors group-hover:text-amber-400">
        {title}
      </h2>
    </div>

    <!-- SEZIONE 2: Contenuto con divisore superiore -->
    <div class="overflow-y-hidden border-t border-cyan-500/20 group-hover:border-amber-400/30 transition-colors">
      <div class="p-4 pt-3 md:p-5 md:pt-4 h-full">
        {#if excerpt}
          <!-- 🔹 CORREZIONE 3: Rimossa la classe md:prose-base per mantenere il testo piccolo -->
          <div class="text-gray-400 leading-snug 
                      prose prose-sm prose-invert prose-p:text-gray-400 prose-strong:text-amber-400
                      line-clamp-5 md:line-clamp-6 xl:line-clamp-9">
            {@html excerpt}
          </div>
        {:else}
          <div class="text-transparent">Nessuna anteprima.</div>
        {/if}
      </div>
    </div>
    
    <!-- SEZIONE 3: Categoria con divisore superiore -->
    <div>
      <div class="border-t border-cyan-500/20 group-hover:border-amber-400/30 transition-colors"></div>
      <div class="p-3 text-right text-xs font-semibold text-cyan-400 group-hover:text-amber-500 transition-colors flex items-center justify-end gap-2">
        <span>{categoryName}</span>
        <div class="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-amber-500 transition-colors"></div>
      </div>
    </div>
  </div>
</a>