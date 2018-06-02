/**
 * Core application, creates and runs everything, but should have little of its own functionality beyond linking other segments.
 */
class Main extends Evee {
	constructor(canvas) {
		super();

		// public

		// private
		this._active = false;
		this._canvas = canvas;

		// setup
		this._renderer = new RenderManager(this._canvas);
		this._layout = new LayoutManager();
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
