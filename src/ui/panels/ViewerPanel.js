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

		this._registerCommand("CameraHorizontal",    cameraHorizontal,    null);
		this._registerCommand("CameraVertical",      cameraVertical,      null);
		this._registerCommand("CameraDepth",         cameraDepth,         null);
		this._registerCommand("CameraPitch",         cameraPitch,         null);
		this._registerCommand("CameraYaw",           cameraYaw,           null);
		this._registerCommand("CameraRoll",          cameraRoll,          null);
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
