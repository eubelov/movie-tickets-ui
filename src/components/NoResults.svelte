<script>
  import { slide } from "svelte/transition";

  export let title;
</script>

<div class="d-flex flex-column align-center mt-4 centered">
  {#key title}
    <h2 class="text-center" transition:slide>{title}</h2>
  {/key}
</div>

<style>
  h2 {
    color: #ff3e00;
    font-size: 2em;
    font-weight: 300;
  }
</style>
