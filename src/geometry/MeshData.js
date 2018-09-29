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
			position: undefined
		};
	}

	// core
	////////////////////////////////////////////////////////////////////////////
}
