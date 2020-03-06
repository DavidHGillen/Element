/**
 * Core application, creates and runs everything, but should have little of its own
 * functionality beyond linking other segments.
 *
 * The scene tracks the 3D information being worked with, while the layout tracks
 * the UI of the application. The renderer renders both of them. The CommandQueue performs tasks.
 */
class Main extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas) {
		super();

		// public

		// private
		this._startTime = Date.now();
		this._active = false;
		this._canvas = canvas;

		// config
		VertexInfo.init();
		ShaderCompiler.init();

		VertexInfo.makeAttributeDescriptor("position", 3, []);
		VertexInfo.makeAttributeDescriptor("select", 1, []);

		// setup
		this._renderer = new Renderer(this._canvas);
		this._layout = new LayoutController(this._renderer);

		this._cameras = new CameraList();
		this._scene = new Scene({r:0.4, g:0.4, b:0.4});

		// input setup
		this._inputState = new InputState();
		this._inputHandler = new InputHandler(this._canvas, this._inputState);
		this._commandRegister = new CommandRegister();
		this._commandQueue = new CommandQueue();
		this._commandInput = new CommandInput(this._layout, this._inputState, this._commandRegister, this._commandQueue);

		// attach
		this._layout.on(LayoutController.WORKSPACE_READY, this.workspaceReady.bind(this));
		this._layout.on(LayoutController.WORKSPACE_FAILED, this.workspaceFailed.bind(this));




		///////////////////////////////////////////////
		///////////////////////////////////////////////
		// TEMP TESTING
		///////////////////////////////////////////////
		DEBUG.LOUD_INPUT = false;
		Logger.verbose = true;

		this._layout.loadWorkspaceFile("DefaultScreen");

		let activeCam = this._cameras._cameras[0];
		let viewPanel = this._layout._model._panels[0];
		let temp = viewPanel._components[0];
		temp.configure(this._scene, activeCam);

		// TODO: automate from a file //
		// TODO: instance.id is bad an inflexible for sub, need some registry //
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraHorizontal", [
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key68"], 1),
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key65"], -1),
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key39"], 1),
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key37"], -1),
		]);
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraDepth", [
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key87"], 1),
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key83"], -1),
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key38"], 1),
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key40"], -1),
		]);
		/*this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraPitch",    [
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["MouseLMB"], "MouseX", "MouseY")
		]);
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraYaw",    [
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["MouseLMB"], "MouseY")
		]);
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraPitchYaw",    [
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["MouseLMB"], ["MouseX", "MouseY"])
		]);*/
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraRoll", [
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key16", "Key221"], 1),
			new InputAction(InputAction.ACTION_CONTINUOUS, ["Key16", "Key219"], -1)
		]);

		/* TODO: need
		see mesh data for current implementation
		this._scene.addVertexProperty("uv",        vec2);
		this._scene.addVertexProperty("normal",    vec3,    {normalize: true});
		this._scene.addVertexProperty("color",     vec4,    {clamp: {n:0, x:1}});
		*/

		let mesh = window.MESH = new Mesh();
		mesh._data = CubeHelper.createRadiusCube(this._renderer.gl, 0.5);

		this._scene.addChild(mesh);
		///////////////////////////////////////////////
		///////////////////////////////////////////////
	}

	workspaceReady() {
		// config
		window.addEventListener("resize", () => this.handleResize());
		this.handleResize();

		// start
		if(!this._active) {
			setTimeout(() => this.signalReady(), 40); // always timeout so the event listeners / dom can hook in
		}
	}

	workspaceFailed() {
		alert("Critical load failure");
		Logger.error("Critical load failure");
	}

	signalReady() {
		this._active = true;
		this.emit("ready");
		this.tick();
	}

	tick() {
		let now = Date.now() - this._startTime;

		// process inputs first so commands can be snappy
		this._inputHandler.update(now);
		this._commandInput.polledInput(now);

		this._layout.update(now);
		this._renderer.render(now, this._layout._model._viewports); //TODO: DON'T, should be higher level command

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
