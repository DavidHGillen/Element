/**
 * Something that can contain something else and notifies others of the change.
 * Children of a Container inheret all its properties and transformations as
 * it is a heriarchical setup. I.E. moving a container moves the child without
 * changing the child's internal position.
 */
class Container extends DisplayObject {
	// events
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._children = [];
	}

	// child manipulation
	////////////////////////////////////////////////////////////////////////////
	/**
	 * Simple getter for count
	 */
	get childCount() {
		return this._children.length;
	}

	/**
	 * Returns index of child, or -1 if not present
	 */
	getChildIndex(target) {
		if(target instanceof DisplayObject){ return -1; }
		return this._children.indexOf(target);
	}

	/**
	 * Returns `scenegraph/DisplayObject` at given index or null
	 */
	getChildAt(index) {
		index = Number(index);
		if(isNaN(index) || index < 0 || index > this._children.length){ return null; }
		return this._children[index];
	}

	/**
	 * A single child to be added, and the optional index in the array to add it at,
	 * returns success
	 */
	addChild(target, index = undefined) {
		if(!target instanceof DisplayObject){ return false; }

		index = Number(index);
		if(isNaN(index)) { index = this._children.length; }

		this._children.splice(index, 0, target);
		target.parent = this;
		this.emit("added", target);

		return true;
	}

	/**
	 * Provide a `scenegraph/DisplayObject` or index to be removed, returns success
	 */
	removeChild(target) {
		if(target instanceof DisplayObject){ target = this.getChildIndex(target); }
		if(isNaN(target) || target < 0) { return false; }

		let removed = this._children.splice(target, 1)[0];
		removed.parent = null;
		this.emit("removed", removed);

		return true;
	}
}
