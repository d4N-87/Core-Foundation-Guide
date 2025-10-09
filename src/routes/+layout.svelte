<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import NeuralBackground from '$lib/components/NeuralBackground.svelte';
</script>

<NeuralBackground />

<main class="relative z-10 isolate">
  <div class="p-4 md:p-8">
    <slot />
  </div>
</main>