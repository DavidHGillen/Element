/**
 * Empty but non abstract Screen
 */
class EmptyScreen extends AbstractComponentController {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._data = new EmptyModel();
	}

	// rendering
	////////////////////////////////////////////////////////////////////////////
	setViewport(gl) {
		gl.scissor(this.x, this.y, this.width, this.height);
		gl.viewport(this.x, this.y, this.width, this.height);
	}

	setPerspectiveMatrix(pMatrix) {
	}

	setModelViewMatrix(mvMatrix) {
	}
}
