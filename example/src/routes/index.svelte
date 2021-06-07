<script context="module">
	export const prerender = true;
</script>

<script>

  import { onMount } from 'svelte';
	import MidiVisualiser from '../components/svelte-midi-visualiser/index.svelte';

  onMount(() => {
    console.log('hello viz!');
  });

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h2>
    svelte-midi-visualiser
	</h2>

	<MidiVisualiser />

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}


</style>
