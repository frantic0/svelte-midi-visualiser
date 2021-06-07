class NoteSequenceDrawing {
	constructor(sequence, canvas) {
		this.config = {
			noteHeight: 6,
			noteSpacing: 1,
			pixelsPerTimeStep: 30, // The bigger this number the "wider" a note looks,
			minPitch: 100,
			maxPitch: 1,
		};

		this.noteSequence = sequence;

		// Initialize the canvas.
		this.ctx = canvas.getContext("2d");
		const size = this.getCanvasSize();

		this.height = size.height;
		this.ctx.canvas.width = size.width;
		this.ctx.canvas.height = size.height;

		this.drawSequence();
	}

	drawSequence(currentNote) {
		d;
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		let currentNotePosition;

		for (let i = 0; i < this.noteSequence.notes.length; i++) {
			const note = this.noteSequence.notes[i];

			// Size of this note.
			const offset = this.config.noteSpacing * (i + 1);
			const x = note.startTime * this.config.pixelsPerTimeStep + offset;
			const w = (note.endTime - note.startTime) * this.config.pixelsPerTimeStep;

			// Note that the canvas y=0 is at the top, but a smaller pitch is actually lower,
			// so we're kind of painting backwards.
			const y =
				this.height -
				(note.pitch - this.config.minPitch) * this.config.noteHeight;

			// Colour of this note.
			const opacity = note.velocity / 100 + 0.2;
			if (this.isPaintingCurrentNote(note, currentNote)) {
				this.ctx.fillStyle = `rgba(240, 84, 119, ${opacity})`; // pink
			} else if (i <= this.primerNotes) {
				this.ctx.fillStyle = `rgba(111, 201, 198, ${opacity})`; // teal
			} else {
				this.ctx.fillStyle = `rgba(8, 41, 64, ${opacity})`; // dark blue
			}
			this.ctx.fillRect(x, y, w, this.config.noteHeight);

			if (this.isPaintingCurrentNote(note, currentNote)) {
				currentNotePosition = x;
			}
		}
		return currentNotePosition;
	}

	getCanvasSize() {
		// Find the smallest pitch so that we cans scale the drawing correctly.
		for (let note of this.noteSequence.notes) {
			if (note.pitch < this.config.minPitch) {
				this.config.minPitch = note.pitch;
			}
			if (note.pitch > this.config.maxPitch) {
				this.config.maxPitch = note.pitch;
			}
		}

		// Add a little bit of padding at the top and the bottom;
		this.config.minPitch -= 2;
		this.config.maxPitch += 2;

		// Height of the canvas based on the range of pitches in the sequence
		const height =
			(this.config.maxPitch - this.config.minPitch) * this.config.noteHeight;

		// Calculate a nice width based on the length of the sequence we're playing.
		const numNotes = this.noteSequence.notes.length;
		const lastNote = this.noteSequence.notes[numNotes - 1];
		const width =
			numNotes * this.config.noteSpacing +
			lastNote.endTime * this.config.pixelsPerTimeStep;

		return { width, height };
	}

	isPaintingCurrentNote(note, currentNote) {
		return (
			currentNote &&
			(note.startTime == currentNote.startTime ||
				(note.endTime >= currentNote.endTime &&
					note.startTime <= currentNote.startTime))
		);
	}
}
