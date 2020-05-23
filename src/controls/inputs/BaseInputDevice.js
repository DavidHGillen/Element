/**
 * 
 */
class BaseInputDevice {
	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		// public

		// configured

		// private
		this._internalBinds = {};
	}

	setup() {
		this.attachDefaultListeners();
		this.findPointers();
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	attachDefaultListeners() {
		Logger.error("Pure virtual function call");
	}

	detachDefaultListeners() {
		Logger.error("Pure virtual function call");
	}

	// apply updates for all delta based inputs and poll non updating inputs
	update(now) {
		// TODO: walk for pointers that need to be polled.
		//this._pointerList

		this._state.update();
	}

	// pointer system
	////////////////////////////////////////////////////////////////////////////
	// search the found inputs to see what could qualify as a mouse, touch, stick, vr wand
	findPointers() {
		Logger.error("Pure virtual function call");
	}

	// return the active pointers
	getPointers() {
		Logger.error("Pure virtual function call");
	}

	// utility
	////////////////////////////////////////////////////////////////////////////
	_setListener(target, event, funcName) {
		// yes keying off function name will share bound functions, but we're binding to ourselves
		// so there's no problem with it being shared with ourselves
		let func = this._internalBinds[funcName];
		if(func == undefined) {
			func = this._internalBinds[funcName] = this[funcName].bind(this);
		}
		target.addEventListener(event, func);
	}

	_removeListener(target, event, funcName) {
		// we shouldn't have unknown numbers of functions to be bound too, so no cleanup needed
		let func = this._internalBinds[funcName];
		if(func == undefined) {
			return;
		}
		target.removeEventListener(event, func);
	}

	_blockEvent(e) {
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
	}
}
