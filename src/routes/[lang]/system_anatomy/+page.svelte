<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="space-y-4">
  <h1 class="text-3xl uppercase text-yellow-300">
    &gt; System Anatomy Index
  </h1>

  {#if data.posts.length > 0}
    <ul class="space-y-2">
      <!-- Cicliamo sulla lista di post che abbiamo ricevuto dal +page.js -->
      {#each data.posts as post}
        <li>
          <!-- Ogni link punta alla pagina dinamica del singolo articolo -->
          <a href="/{data.params.lang}/system_anatomy/{post.slug}" class="text-xl hover:underline">
            - {post.title}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Nessun articolo trovato in questa sezione.</p>
  {/if}
</div>