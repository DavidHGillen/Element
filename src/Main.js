/**
 * Core application, creates and runs everything, but should have little of its own
 * functionality beyond linking other segments.
 *
 * The scene tracks the 3D information being worked with, while the layout tracks
 * the UI of the application. The renderer renders both of them.
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
		let renderDisplay = new RendererDisplay(this._scene);
		this._layout.addDisplay(renderDisplay);
		this._scene.addVertexProperty("uv", vec2);
		this._scene.addVertexProperty("normal", vec3, {normalize:true});
		let mesh = new Mesh();
		this._scene.addChild(mesh);
		this._renderer.initBuffers(mesh._data._buffers.position);

		// start
		setTimeout(() => this.signalReady(), 50); // always timeout so the event listener can hook in
	}

	signalReady() {
		this._active = true;
		this.emit("ready");
		this._renderer.drawScene();
	}

	// ??
	////////////////////////////////////////////////////////////////////////////
}
