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

	setPerspectiveMatrix(pMatrix) {
		mat4.perspective(pMatrix, 45, this.width / this.height, 0.001, 1000.0);
	}

	setModelViewMatrix(mvMatrix) {
		mat4.fromQuat(mvMatrix, this._camera.rotQuat);
		mat4.translate(mvMatrix, mvMatrix, this._camera.position);
	}
}
