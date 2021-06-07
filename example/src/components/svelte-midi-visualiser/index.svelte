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
  import Timidity from 'timidity';
  import WebMidi from 'webmidi';
  // import { NoteSequenceDrawing } from "./NoteSequenceDrawing.js";

  let container,
      canvas,
      containerHeight,
      containerWidth,
      renderer;

  const dispatch = createEventDispatcher();


  const subscribeMidiEvents = input => {

    input.addListener('pitchbend', "all", function(e) {
      console.log("Pitch value: " + e.value);
    });

    // Listen for a 'note on' message on all channels
    input.addListener('noteon',
      "all",
      e => console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ")." )
    );

    // Listen to pitch bend message on channel 3
    input.addListener('pitchbend',
      3,
      e => console.log("Received 'pitchbend' message.", e)
    );

    // Listen to control change message on all channels
    input.addListener('controlchange',
      "all",
      e => console.log("Received 'controlchange' message.", e)
    );

    // Listen to NRPN message on all channels
    input.addListener('nrpn', "all",
      e => {
        if(e.controller.type === 'entry') {
          console.log("Received 'nrpn' 'entry' message.", e);
        }
        if(e.controller.type === 'decrement') {
          console.log("Received 'nrpn' 'decrement' message.", e);
        }
        if(e.controller.type === 'increment') {
          console.log("Received 'nrpn' 'increment' message.", e);
        }
        console.log("message value: " + e.controller.value + ".", e);
      }
    );

    input.addListener('programchange',
      "12",
      e => console.log("Received 'programchange' message.", e)
    );
  }


  const enableTimidity = () => {

    const player = new Timidity()
    player.load('../static/deadmau5-Deus-Ex-Machina.mid')
    player.play()

    player.on('playing', () => {
      console.log(player.duration) // => 351.521
    })

  }



  const enableMidi = () => {

    WebMidi.enable( err => {
      if(err)
        console.log("WebMidi could not be enabled.", err);
      else {
        console.log("WebMidi enabled!");
        WebMidi.inputs.map(i => console.log(i.name))
        WebMidi.outputs.map(o => console.log(o.name))

        // let input = WebMidi.getInputByName("Axiom Pro 25 USB A In");
        let input_xtone = WebMidi.getInputByName("XTONE");
        let input_mio = WebMidi.getInputByName("mio");
        if(input_xtone) subscribeMidiEvents(input_xtone);
        if(input_mio) subscribeMidiEvents(input_mio);
      };
    })
  }

  onMount( () => {
    const sizeObserver = new ResizeObserver((entries) => {
      let width = entries[0].contentRect.width;

      if (width === containerWidth) return;

      enableMidi();

      enableTimidity();

      // renderer = new NoteSequenceDrawing( null, canvas);

      containerWidth = width;
    });

    sizeObserver.observe(container);

    return () => sizeObserver.disconnect();
  });



</script>


