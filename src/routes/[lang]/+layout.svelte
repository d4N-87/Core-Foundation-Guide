<!-- src/routes/[lang]/+layout.svelte -->

<!-- 
  Questo file funge da "contenitore" per tutte le pagine che iniziano con `/[lang]`.
  La sua sola presenza, con lo <slot /> all'interno, è ciò che
  abilita la navigazione lato client e le View Transitions tra le pagine
  che renderizza (la griglia e gli articoli).
-->

<slot />