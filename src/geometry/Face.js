/**
 * Core low level class, represents a collection of triangles that share properties and should be processed together.
 * Triangles are assumed to exist by all code and require no explicit management except the face
 */
class Face extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._triDefs = [];
		this._stacks = [];
		this._edges = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
}
