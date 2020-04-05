/**
 * Panel containing at least one viewport component. Classic 3D view.
 */
class ViewerPanel extends AbstractPanel{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super("Viewer");

		// kinda TEMP, should be more sophisticated //
		this._viewport = new ViewportComponent();
		this._components.push(this._viewport);

		let holdable = InputAction.RESPONSE_HELD;
		this._registerCommand("CameraHorizontal",    this.cameraSide,     holdable);
		this._registerCommand("CameraHeight",        this.cameraUp,       holdable);
		this._registerCommand("CameraDepth",         this.cameraFwd,      holdable);
		this._registerCommand("CameraPitch",         this.cameraPitch,    holdable);
		this._registerCommand("CameraYaw",           this.cameraYaw,      holdable);
		this._registerCommand("CameraRoll",          this.cameraRoll,     holdable);
		// kinda TEMP, should be more sophisticated //
	}

	// commands
	////////////////////////////////////////////////////////////////////////////
	cameraSide(ammount) {
		let cam = this._viewport._camera;
		cam.moveSide(ammount);
	}
	cameraUp(ammount) {
		let cam = this._viewport._camera;
		cam.moveUp(ammount);
	}
	cameraFwd(ammount) {
		let cam = this._viewport._camera;
		cam.moveFwd(ammount);
	}

	// TODO: maybe don't force best practices for wasd cameras by the api we give
	cameraPitch(ammount) {
		let cam = this._viewport._camera;
		cam.rotateLocalPitch(ammount);
	}
	cameraYaw(ammount) {
		let cam = this._viewport._camera;
		cam.rotateGlobalYaw(ammount);
	}
	cameraRoll(ammount) {
		let cam = this._viewport._camera;
		cam.rotateLocalRoll(ammount);
	}
}
