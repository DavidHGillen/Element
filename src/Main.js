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

		this._commandRegister = new CommandRegister();
		this._commandQueue = new CommandQueue();
		this._commandInput = new CommandInput(this._commandRegister, this._commandQueue);
		this._inputState = new InputState();
		this._inputHandler = new InputHandler(this._canvas, this._inputState, this._commandInput);

		this._cameras = new CameraList();
		this._scene = new Scene({r:0.4, g:0.4, b:0.4});

		// attach
		this._layout.on(LayoutController.WORKSPACE_READY, this.workspaceReady.bind(this));
		this._layout.on(LayoutController.WORKSPACE_FAILED, this.workspaceFailed.bind(this));




		///////////////////////////////////////////////
		///////////////////////////////////////////////
		// TEMP TESTING
		///////////////////////////////////////////////
		Logger.verbose = true;
		window.INPUT = this._inputHandler;

		this._layout.loadWorkspaceFile("DefaultScreen");

		let activeCam = this._cameras._cameras[0];
		let viewPanel = this._layout._model._panels[0];
		let temp = viewPanel._components[0];
		temp.configure(this._scene, activeCam);

		// TODO: automate from a file //
		// TODO: instance.id is bad an inflexible for sub //
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraHorizontal", [
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyD"], 1),
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyA"], -1),
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyRight"], 1),
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyLeft"], -1),
		]);
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraDepth", [
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyW"], 1),
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyS"], -1),
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyUp"], 1),
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["KeyDown"], -1),
		]);
		/*this._commandRegister.attachInputToCommand(viewPanel.id,    "CameraPitch",    [
			{"*":"MouseX", "&":"MouseLMB"}
		]);
		this._commandRegister.attachInputToCommand(viewPanel.id,    "CameraYaw",      [
			{"*":"MouseY", "&":"MouseLMB"}
		]);*/
		this._commandRegister.attachInputsToCommand(viewPanel.id,    "CameraRoll", [
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["Shift", "BracketRight"], 1),
			new KeyAction(KeyAction.ACTION_CONTINUOUS, ["Shift", "BracketLeft"], -1)
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
			setTimeout(() => this.signalReady(), 40); // always timeout so the event listener can hook in
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

		this._inputHandler.update(now);
		this._commandInput.update(now);
		this._layout.update(now);
		this._renderer.render(now, this._layout._model._viewports); //TODO: DON'T

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
