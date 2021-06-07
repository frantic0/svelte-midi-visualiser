<style>

  :host { display: block; }

  #svelte-midi-viz-container {
    overflow-x: auto;
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
      containerWidth;

  const dispatch = createEventDispatcher();

  onMount( () => {
    const sizeObserver = new ResizeObserver((entries) => {
      let width = entries[0].contentRect.width;

      if (width === containerWidth) return;

      // getComputedCols = getColumn(width, cols);

      // xPerPx = width / getComputedCols;

      // if (!containerWidth) {
      //   dispatch("mount", {
      //     cols: getComputedCols,
      //     xPerPx,
      //     yPerPx, // same as rowHeight
      //   });
      // } else {
      //   onResize();
      // }

      containerWidth = width;
    });

    sizeObserver.observe(container);

    return () => sizeObserver.disconnect();
  });



</script>


