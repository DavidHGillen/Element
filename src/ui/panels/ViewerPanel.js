/**
 * Panel containing at least one viewport component. Classic 3D view.
 */
class ViewerPanel extends AbstractPanel{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super("Viewer");

		//TODO: quad view etc
		this._components.push(new ViewportComponent());

		this._registerCommand("CameraHorizontal",    this.cameraHorizontal,    null);
		this._registerCommand("CameraVertical",      this.cameraVertical,      null);
		this._registerCommand("CameraDepth",         this.cameraDepth,         null);
		this._registerCommand("CameraPitch",         this.cameraPitch,         null);
		this._registerCommand("CameraYaw",           this.cameraYaw,           null);
		this._registerCommand("CameraRoll",          this.cameraRoll,          null);
	}

	// commands
	////////////////////////////////////////////////////////////////////////////
	cameraHorizontal() {}
	cameraVertical() {}
	cameraDepth() {}
	cameraPitch() {}
	cameraYaw() {}
	cameraRoll() {}
}
