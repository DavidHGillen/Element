/**
 * Controller for a viewport
 */
class ViewportScreen extends AbstractComponentController {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._data = new ViewportModel();
		this._camera = this._data._camera;
	}

	// rendering
	////////////////////////////////////////////////////////////////////////////
	setViewport(gl) {
		gl.viewport(this.x, this.y, this.width, this.height);
	}

	// TEMP
	// TEMP
	// TEMP
	// TEMP
	setPerspectiveMatrix(pMatrix) {
		mat4.perspective(pMatrix, this._camera.fov, this.width / this.height, this._camera.nearPlane, this._camera.farPlane);
	}

	setModelViewMatrix(mvMatrix) {
		mat4.fromQuat(mvMatrix, this._camera.rotQuat);
		mat4.translate(mvMatrix, mvMatrix, this._camera.position);
	}
	// TEMP
	// TEMP
	// TEMP
	// TEMP
}
