/**
 * An Abstract Class representing an object that exists in 3D space somewhere
 * deterimned by local properties and the heirarchy it exists in.
 */
class DisplayObject extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._parent = null;

		this.position = vec3.create();
		this.rotQ = quat.create();
		this.scale = vec3.create();
	}

	// scenegraph
	////////////////////////////////////////////////////////////////////////////
	get parent() {
		return this._parent;
	}
	set parent(value) {
		if(value !== null && !value instanceof Container){ throw "invalid parent"; }
		this._parent = value;
	}

	// transformations
	////////////////////////////////////////////////////////////////////////////
	/**
	 * Set 'out' to the matrix representing it's current position in the defined scope
	 * scope defaults to itself if not specified.
	 */
	getMatrix(out, scope = undefined) {
		mat4.fromRotationTranslationScale(out, this.rotQ, this.position, this.scale);
	}
}
