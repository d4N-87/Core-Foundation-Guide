<!-- src/lib/components/NodeCard.svelte -->
<script lang="ts">
  export let title: string;
  export let categoryName: string;
  export let excerpt: string | undefined;
</script>

<div
  class="relative h-full w-full rounded-xl
         bg-gradient-to-br from-cyan-950/20 to-slate-950/10
         backdrop-blur-lg border-2 card-border
         shadow-lg card-shadow
         grid grid-rows-[auto_1fr_auto]
         
         border-cyan-500/30 group-hover:border-amber-400/80
         shadow-cyan-900/50 group-hover:shadow-amber-500/20"
>
  <div class="p-4 pb-3 md:p-5 md:pb-4">
    <h2 class="font-bold text-gray-100 text-base card-title group-hover:text-amber-400">{title}</h2>
  </div>

  <div class="relative overflow-hidden border-t card-divider border-cyan-500/20 group-hover:border-amber-400/30">
    <div class="p-4 pt-3 md:p-5 md:pt-4 h-full">
      {#if excerpt}
        <div class="text-gray-400 leading-snug 
                    prose prose-sm prose-invert prose-p:text-gray-400 prose-strong:text-amber-400">
          {@html excerpt}
        </div>
      {:else}
        <div class="text-transparent">Nessuna anteprima.</div>
      {/if}
    </div>
    <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none"></div>
  </div>
  
  <div>
    <div class="border-t card-divider border-cyan-500/20 group-hover:border-amber-400/30"></div>
    <div class="p-3 text-right text-xs font-semibold card-category-text text-cyan-400 group-hover:text-amber-500 flex items-center justify-end gap-2">
      <span>{categoryName}</span>
      <div class="w-2 h-2 rounded-full card-category-dot bg-cyan-400 group-hover:bg-amber-500"></div>
    </div>
  </div>
</div>