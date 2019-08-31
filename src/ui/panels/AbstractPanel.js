/**
 * All the data common to every panel.
 */
class AbstractPanel extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(surfaceStore = null, lineStore = null, pointStore = null, textStore = null) {
		super();

		// public
		this.dirty = true;    // has this been updated but not rendered
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;

		// protected
		this._components = [];
		this._panels = [];

		this._uiSurfaceStore = surfaceStore;
		this._uiLineStore = lineStore;
		this._uiPointStore = pointStore;
		this._uiTextStore = textStore;

		this._parent = parent;
		this._is2D = true;    // Is this rendered as a single 2D object
		this._data = null;    // The model that this controller manage
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	/**
	 * This is making a lot of dangerous and probably false assumptions...
	 * but it can't avoid it because where the damn heck is my layout information
	 */
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

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}
