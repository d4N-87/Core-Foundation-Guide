<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="space-y-4">
  <h1 class="text-3xl uppercase text-yellow-300">
    &gt; Core Concepts Index <!-- <-- Modifica titolo -->
  </h1>

  {#if data.posts.length > 0}
    <ul class="space-y-2">
      {#each data.posts as post}
        <li>
          <!-- Modifica percorso del link -->
          <a href="/{data.params.lang}/core_concepts/{post.slug}" class="text-xl hover:underline">
            - {post.title}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Nessun articolo trovato in questa sezione.</p>
  {/if}
</div>