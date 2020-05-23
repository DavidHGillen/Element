/**
 */
class SystemInputDevice extends BaseInputDevice {
	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		// public

		// private
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	findPointers() {
	}

	attachDefaultListeners() {
		this._setListener(window, "mouseout", "focusLost");
		this._setListener(window, "blur",     "focusLost");
	}

	detachDefaultListeners() {
		this._removeListener(window, "mouseout", "focusLost");
		this._removeListener(window, "blur",     "focusLost");
	}

	// specific
	////////////////////////////////////////////////////////////////////////////
	focusLost(e) {
		this.emit(BaseInputDevice.SPECIAL_CLEAR);
	}
}
