/**
 * Core application, creates and runs everything, but should have little of its own functionality beyond linking other segments.
 */
class Main extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
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
		this._scene = new Scene();

		// TEMP TESTING
		let renderPanel =
		this._layout.addDisplay(new RendererDisplay(this._scene));
		this._scene.addVertexProperty("uv", vec2);
		var mesh = new Mesh();
		this._scene.addChild(mesh);

		// start
		setTimeout(() => this.signalReady(), 50); // always timeout so the event listener can hook in
	}

	signalReady() {
		this._active = true;
		this.emit("ready");
	}

	// ??
	////////////////////////////////////////////////////////////////////////////
}
