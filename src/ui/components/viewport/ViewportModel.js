/**
 * All the data needed about a viewport
 */
class ViewportComponentModel extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(camera, scene) {
		super();

		this._scene = camera;
		this._camera = camera;
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
