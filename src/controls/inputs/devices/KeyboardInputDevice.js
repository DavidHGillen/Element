/**
 * 
 */
class KeyboardInputDevice extends BaseInputDevice {
	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		// public

		// private
	}

	// listener
	////////////////////////////////////////////////////////////////////////////
	attachDefaultListeners() {
		this._setListener(document, "keydown", "updateKeyDown");
		this._setListener(document, "keyup",   "updateKeyUp");
	}

	detachDefaultListeners() {
		this._removeListener(document, "keydown", "updateKeyDown");
		this._removeListener(document, "keyup",   "updateKeyUp");
	}

	// keyboard
	////////////////////////////////////////////////////////////////////////////
	updateKeyDown(e) {
		let data = {
			button: e.keyCode,
			state: true,
			pointer: null
		};
		this.emit(BaseInputDevice.IMMEDIATE_BUTTON, data);
		this._blockEvent(e);
	}
	updateKeyUp(e) {
		let data = {
			button: e.keyCode,
			state: false,
			pointer: null
		};
		this.emit(BaseInputDevice.IMMEDIATE_BUTTON, data);
		this._blockEvent(e);
	}
}
