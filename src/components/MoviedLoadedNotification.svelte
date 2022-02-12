<script>
  import { slide } from "svelte/transition";
  import { Divider } from "svelte-materialify";
  export let title;
</script>

<div
  class="d-flex flex-column align-center align-content-center"
  transition:slide
>
  <h2 class="text-center">{title}</h2>
</div>
<Divider />

<style>
  h2 {
    color: #ff3e00;
    font-size: 2em;
    font-weight: 300;
  }
</style>
