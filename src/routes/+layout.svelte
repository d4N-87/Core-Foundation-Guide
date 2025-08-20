<script lang="ts">
  import '../app.css';
</script>

<main class="bg-black text-green-400 min-h-screen p-4">
  
  <header class="border-2 border-green-400 p-2 mb-4">
    <h1 class="text-3xl text-center uppercase">A.I. Field Manual</h1>
  </header>

  <nav class="flex space-x-2 mb-4">
    <a href="/core_concepts" class="border-2 border-green-400 px-4 py-1 uppercase hover:bg-green-400 hover:text-black">
      [ 01_CORE_CONCEPTS ]
    </a>
    <a href="/system_anatomy" class="border-2 border-green-400 px-4 py-1 uppercase hover:bg-green-400 hover:text-black">
      [ 02_SYSTEM_ANATOMY ]
    </a>
    <a href="/lexicon" class="border-2 border-green-400 px-4 py-1 uppercase hover:bg-green-400 hover:text-black">
      [ 03_LEXICON ]
    </a>
  </nav>

  <div class="border-2 border-green-400 p-4">
    <slot />
  </div>

</main>