/**
 * Core low level class, represents all the vertices that share a location but maybe not other info like uv/normal/etc.
 * Verticies are assumed to exist by all code and require no explicit management except the stack
 */
class VertexStack extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._faces = [];
		this._edges = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
}
