/**
 * Wrapper class for all the associated information in a mesh
 */
class MeshData extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._stacks = [];
		this._faces = [];
		this._edges = [];

		this._buffers = {
			position: new Float32Array([
				Math.random()*-1, Math.random(),    -5,
				Math.random(),    Math.random(),    -5,
				0,                Math.random()*-1, -5,
			])
		};
	}

	// core
	////////////////////////////////////////////////////////////////////////////
}
