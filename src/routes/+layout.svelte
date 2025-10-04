<script lang="ts">
  import '../app.css';
  import NeuralBackground from '$lib/components/NeuralBackground.svelte';
</script>

<NeuralBackground />

<main class="p-4 md:p-8">
  <slot />
</main>