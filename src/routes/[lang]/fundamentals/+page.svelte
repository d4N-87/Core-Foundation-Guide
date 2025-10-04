<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="space-y-4">
  <h1 class="text-3xl uppercase text-yellow-300">
    &gt; Fundamentals Index
  </h1>

  {#if data.posts.length > 0}
    <ul class="space-y-2">
      {#each data.posts as post}
        <li>
          <a href="/{data.params.lang}/fundamentals/{post.slug}" class="text-xl hover:underline">
            - {post.title}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Nessun articolo trovato in questa sezione.</p>
  {/if}
</div>