/**
 * Empty, but non abstract Component
 */
class EmptyModel extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();
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
