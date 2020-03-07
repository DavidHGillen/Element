/**
 * Panel containing at least one viewport component. Classic 3D view.
 */
class ViewerPanel extends AbstractPanel{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super("Viewer");

		this._viewport = new ViewportComponent();
		this._components.push(this._viewport);

		let cont = InputAction.ACTION_CONTINUOUS;
		this._registerCommand("CameraHorizontal",    this.cameraSide,     cont);
		this._registerCommand("CameraVertical",      this.cameraUp,       cont);
		this._registerCommand("CameraDepth",         this.cameraFwd,      cont);
		this._registerCommand("CameraPitch",         this.cameraPitch,    cont);
		this._registerCommand("CameraYaw",           this.cameraYaw,      cont);
		this._registerCommand("CameraRoll",          this.cameraRoll,     cont);
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

	cameraPitch(ammount) {
		let cam = this._viewport._camera;
		cam.rotateLocalPitch(ammount);
	}
	cameraYaw(ammount) {
		let cam = this._viewport._camera;
		cam.rotateLocalYaw(ammount);
	}
	cameraRoll(ammount) {
		let cam = this._viewport._camera;
		cam.rotateLocalRoll(ammount);
	}
}
