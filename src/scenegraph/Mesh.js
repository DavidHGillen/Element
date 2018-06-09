/**
 * An object that has associated MeshData attached to it
 */
class Mesh extends DisplayObject {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._data = new MeshData();
	}
}
