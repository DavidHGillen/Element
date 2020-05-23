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
		this._state.updateButtonState(this._KEYBOARD_ID, e.keyCode, true, null);

		this._blockEvent(e);
	}
	updateKeyUp(e) {
		this._state.updateButtonState(this._KEYBOARD_ID, e.keyCode, false, null);

		this._blockEvent(e);
	}
}
