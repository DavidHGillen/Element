/**
 * All the data common to every component.
 * Any component may be a standin for a more complex set of base components working together.
 */
class AbstractComponent extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(layoutID, data) {
		super();

		// public
		this.dirty = true; // has this been updated but not rendered

		// protected
		this._components = []; // track and communicate to sub components

		this._shareInputs = false; // Is it irrelevant which instance handles broadcast input
	}

	// get/set
	////////////////////////////////////////////////////////////////////////////
	get shareInputs() { return this._shareInputs; }

	// core
	////////////////////////////////////////////////////////////////////////////
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
