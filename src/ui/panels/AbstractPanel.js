/**
 * All the data common to every panel.
 * Stores are used as a way to batch render elements,
 */
class AbstractPanel extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(id, surfaceStore = null, lineStore = null, pointStore = null, textStore = null) {
		super();

		// public
		this.dirty = true;    // has this been updated but not rendered
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;

		// protected
		this._components = [];

		this._commandDictionary = {};

		this._uiSurfaceStore = surfaceStore;
		this._uiLineStore = lineStore;
		this._uiPointStore = pointStore;
		this._uiTextStore = textStore;

		this._id = id;
		this._shareInputs = true; // Is it irrelevant which instance handles broadcast input
		this._is2D = true; // Is this rendered as a single 2D object
		this._data = null; // The model that this controller manage
	}

	// get/set
	////////////////////////////////////////////////////////////////////////////
	get id() { return this._id; }
	get shareInputs() { return this._shareInputs; }

	// core
	////////////////////////////////////////////////////////////////////////////
	/**
	 * This is making a lot of dangerous and probably false assumptions...
	 * but it can't avoid it because where the damn heck is my layout information
	 */
	resize(x, y, width, height) {
		let arr = this._components;
		for(let i = 0, count = arr.length; i<count; i++) {
			arr[i].resize(x, y, width, height);
		}

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	// commands
	////////////////////////////////////////////////////////////////////////////
	_registerCommand(name, fnx, type) {
		if(this._commandDictionary[name]) { throw `Command ${name} already exists`; }
		if(typeof fnx !== "function"){ throw `Function ${fnx} is not valid`; }
		if(isNaN(type)){ throw `Type ${type} is not valid`; }

		this._commandDictionary[name] = {
			fnx: fnx,
			type: type
		};
	}

	performCommand(name, ...data) {
		let command = this._commandDictionary[name];

		command.fnx.apply(this, data);
	}
}
