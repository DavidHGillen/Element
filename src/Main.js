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
		this._layout = new Layout();
		this._renderer = new Renderer(this._canvas, this._layout);
		this._input = new InputHandler(canvas);
		this._scene = new Scene();
		this._camref = new CameraList();



		// TEMP TESTING
		let viewportDisplay = new ViewportDisplay(this._camref._cameras);
		this._layout.addDisplay(viewportDisplay);
		this._scene.addVertexProperty("uv", vec2);
		this._scene.addVertexProperty("normal", vec3, {normalize:true});
		let mesh = new Mesh();
		this._scene.addChild(mesh);
		this._renderer.initBuffers(mesh._data._buffers.position);

		window.addEventListener("resize", () => this.handleResize());
		this.handleResize();


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
	handleResize() {
		let width = window.innerWidth;
		let height = window.innerHeight;

		this._layout.resizeScreen(width, height);

		this._renderer.resizeScreen(width, height);
	}
}
