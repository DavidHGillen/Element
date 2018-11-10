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
		this._cams = new CameraList();
		this._command = new CommandQueue();
		this._scene = new Scene({r:0.4, g:0.4, b:0.4});
		this._input = new InputHandler(canvas, this._command);
		this._renderer = new Renderer(this._canvas, this._layout);




		///////////////////////////////////////////////
		///////////////////////////////////////////////
		// TEMP TESTING
		///////////////////////////////////////////////
		Logger.debug = true;
		window.INPUT = this._input;

		let activeCam = this._cams._cameras[0];
		let viewportDisplay = new ViewportDisplay(activeCam);
		this._layout.addDisplay(viewportDisplay);

		this._command.register("camera::shiftX",    activeCam,    activeCam.moveFwd,             CommandQueue.AXIS);
		this._command.register("camera::shiftY",    activeCam,    activeCam.moveSide,            CommandQueue.AXIS);
		this._command.register("camera::yaw",       activeCam,    activeCam.rotateGlobalYaw,     CommandQueue.AXIS);
		this._command.register("camera::pitch",     activeCam,    activeCam.rotateLocalPitch,    CommandQueue.AXIS);
		this._command.register("camera::roll",      activeCam,    activeCam.rotateLocalRoll,     CommandQueue.AXIS);

		this._input.register("keyboard",    ["KeyD","KeyA"],                   "camera::shiftX");
		this._input.register("keyboard",    ["KeyS","KeyW"],                   "camera::shiftY");
		this._input.register("mouse",       ["Drag","X"],                      "camera::yaw");
		this._input.register("mouse",       ["Drag","Y"],                      "camera::pitch");
		this._input.register("keyboard",    ["BracketLeft","BracketRight"],    "camera::roll");

		/*
		this._scene.addVertexProperty("uv",        vec2);
		this._scene.addVertexProperty("normal",    vec3,    {normalize: true});
		this._scene.addVertexProperty("color",     vec4,    {clamp: {n:0, x:1}});
		*/

		let mesh = window.MESH = new Mesh();
		mesh._data = CubeHelper.createRadiusCube(this._renderer.gl, 0.5);

		this._scene.addChild(mesh);
		///////////////////////////////////////////////
		///////////////////////////////////////////////




		// config
		window.addEventListener("resize", () => this.handleResize());
		this.handleResize();

		// start
		setTimeout(() => this.signalReady(), 50); // always timeout so the event listener can hook in
	}

	signalReady() {
		this._active = true;
		this.emit("ready");
		this.tick();
	}

	tick() {
		let now = Date.now();
		this._input.tick(now);
		this._renderer.drawScene();
		requestAnimationFrame(() => this.tick());
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
