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

<div
  class="relative h-full w-full rounded-xl
         bg-gradient-to-br from-cyan-950/20 to-slate-950/10
         backdrop-blur-lg border-2 border-cyan-500/30 card-border
         shadow-lg shadow-cyan-900/50 card-shadow
         grid grid-rows-[auto_1fr_auto]"
>
  <!-- SEZIONE 1: Titolo -->
  <div class="p-4 pb-3 md:p-5 md:pb-4">
    <h2 class="font-bold text-gray-100 text-base card-title">
      {title}
    </h2>
  </div>

  <!-- 
    SEZIONE 2: Contenuto.
    - 'relative' è necessario per posizionare l'overlay del gradiente.
  -->
  <div class="relative overflow-hidden border-t border-cyan-500/20 card-divider">
    <div class="p-4 pt-3 md:p-5 md:pt-4 h-full">
      {#if excerpt}
        <!-- 🔹 CORREZIONE: Rimossa la classe 'line-clamp-*' -->
        <div class="text-gray-400 leading-snug 
                    prose prose-sm prose-invert prose-p:text-gray-400 prose-strong:text-amber-400">
          {@html excerpt}
        </div>
      {:else}
        <div class="text-transparent">Nessuna anteprima.</div>
      {/if}
    </div>

    <!-- 
      🔹 CORREZIONE: Aggiunto un 'div' per la maschera a gradiente.
      - 'absolute inset-x-0 bottom-0 h-12': Lo posiziona in fondo alla cella.
      - 'bg-gradient-to-t from-slate-950/50': Crea un gradiente che va da un colore
        semi-trasparente (che si fonde con lo sfondo) a completamente trasparente.
        Questo nasconde il testo che va sotto.
      - 'pointer-events-none': Assicura che non interferisca con il mouse.
    -->
    <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none"></div>
  </div>
  
  <!-- SEZIONE 3: Categoria -->
  <div>
    <div class="border-t border-cyan-500/20 card-divider"></div>
    <div class="p-3 text-right text-xs font-semibold text-cyan-400 card-category-text flex items-center justify-end gap-2">
      <span>{categoryName}</span>
      <div class="w-2 h-2 rounded-full bg-cyan-400 card-category-dot"></div>
    </div>
  </div>

  <a href={cardHref} class="absolute inset-0 z-10">
    <span class="sr-only">Leggi l'articolo: {title}</span>
  </a>
</div>