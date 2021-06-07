<style>

  :host { display: block; }

  #canvas {
    height: 100%;
    width: 100%;
  }
  #svelte-midi-viz-container {
    overflow-x: auto;
    height: 100%;
    width: 100%;
  }

</style>

<div  id="svelte-midi-viz-container"
      style="height: { containerHeight }px"
      bind:this={ container }
      >

  <canvas id="canvas"
          bind:this={ canvas }
          />


</div>

<script>

  import { onMount, createEventDispatcher } from "svelte";
  import { NoteSequenceDrawing } from "./NoteSequenceDrawing.js";

  let container,
      canvas,
      containerHeight,
      containerWidth,
      rederer;

  const dispatch = createEventDispatcher();

  onMount( () => {
    const sizeObserver = new ResizeObserver((entries) => {
      let width = entries[0].contentRect.width;

      if (width === containerWidth) return;

      // renderer = new NoteSequenceDrawing( null, canvas);

      containerWidth = width;
    });

    sizeObserver.observe(container);

    return () => sizeObserver.disconnect();
  });



</script>


