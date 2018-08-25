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
		mat4.identity(mvMatrix);
		mat4.rotateY(mvMatrix, mvMatrix, window.INPUT._panX/100); window.INPUT._panX = 0;
		mat4.rotateX(mvMatrix, mvMatrix, window.INPUT._panY/100); window.INPUT._panY = 0;
		mat4.translate(mvMatrix, mvMatrix, [
			window.INPUT._keyMap[65]?0.20:(window.INPUT._keyMap[68]?-0.20:0.00),
			0.00,
			window.INPUT._keyMap[87]?0.20:(window.INPUT._keyMap[83]?-0.20:0.00)
		]);
	}
}
