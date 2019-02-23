/**
 * All the interaction and reactive logic common to every panel.
 */
class AbstractPanelController extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(parent) {
		super();

		// public
		this.dirty = true;    // has this been updated but not rendered

		this._components = [];
		this._panels = [];

		// protected
		this._parent = parent;
		this._is2D = true;    // Is this rendered as a single 2D object
		this._data = null;    // The model that this controller manage
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	resize(x, y, width, height) {
		let i, arr, count;

		arr = this._components;
		for(i = 0, count = arr.length; i<count; i++) {
			arr[i].resize(x, y, width, height);
		}

		arr = this._panels;
		for(i = 0, count = arr.length; i<count; i++) {
			arr[i].resize(x, y, width, height);
		}
	}
}
