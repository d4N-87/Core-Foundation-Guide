<!-- src/routes/test/+page.svelte -->

<!-- 
  Questo è un test in ambiente controllato.
  Applichiamo le classi 'prose' a un contenitore con HTML statico.
-->
<div class="p-12">
  <article class="prose prose-invert prose-lg">
    <h1>Questo è un Titolo H1</h1>
    <p>
      Questo è un paragrafo di testo normale. Se le classi prose funzionano,
      dovrebbe avere una spaziatura e una dimensione del font corrette.
    </p>
    <p>
      Questo è un altro paragrafo con del testo <strong>in grassetto</strong>.
      Se la nostra configurazione in tailwind.config.js funziona, questo testo
      dovrebbe essere <strong>ambrato</strong>.
    </p>
    <ul>
      <li>Questo è un elemento di una lista.</li>
      <li>Questo è un altro elemento.</li>
    </ul>
  </article>
</div>