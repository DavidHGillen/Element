/**
 * Something that can contain something else
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
	get childCount() {
		return this._children.length;
	}

	/**
	* returns success
	*/
	addChild(target, index) {
		if(!target instanceof DisplayObject){ return false; }
		index = Number(index);
		if(isNaN(index)) {
			this._children.push(target);
		} else {
			this._children.splice(index, 0, target);
		}
		return true;
	}

	/**
	* returns success
	*/
	removeChild(target) {
		if(!target instanceof DisplayObject){ return false; }

		var backup = this._children;
		this._children = this._children.filter(item => item !== target);

		return this._children.length !== backup.length;
	}

	/**
	* returns success
	*/
	removeChildAt(index) {
		index = Number(index);
		if(isNaN(index)){ return false; }

		this._children.splice(index, 1);
		return true;
	}

	/**
	* returns element or null
	*/
	getChildAt(index) {
		index = Number(index);
		if(isNaN(index) || index < 0 || index > this._children.length){ return null; }
		return this._children[index];
	}
}
