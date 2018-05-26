class Main extends Evee {
	constructor(canvas) {
		super();

		// public

		// private
		this._active = false;
		this._canvas = canvas;
		this._input = new InputHandler(canvas);

		// start
		setTimeout(() => this.signalReady(), 50); // always timeout so the event listener can hook in
	}

	// public

	// private
	signalReady() {
		this._active = true;
		this.emit("ready");
	}
}
