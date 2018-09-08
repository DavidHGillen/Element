/**
 * Rendering of 3D mesh data
 */
class ViewportComponent extends AbstractComponent {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(camera) {
		super();

		this._camera = camera;
		this._model = new ViewportComponentModel(this._camera);
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
		mat4.fromQuat(mvMatrix, this._camera.rotQ);
		mat4.translate(mvMatrix, mvMatrix, this._camera.position);
	}
}
