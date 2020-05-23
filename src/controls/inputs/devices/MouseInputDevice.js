/**
 * 
 */
class MouseInputDevice extends BaseInputDevice {
	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas) {
		super();

		// public

		// private
	}

	// listener
	////////////////////////////////////////////////////////////////////////////
	attachDefaultListeners() {
		this._setListener(document, "mousedown",   "updateMousePress");
		this._setListener(document, "mouseup",     "updateMouseRelease");
		this._setListener(document, "wheel",       "updateMouseWheel");
		this._setListener(document, "click",       "_blockEvent");
		this._setListener(document, "dblclick",    "_blockEvent");
		this._setListener(document, "contextmenu", "_blockEvent");
	}

	detachDefaultListeners() {
		this._removeListener(document, "mousedown",   "updateMousePress");
		this._removeListener(document, "mouseup",     "updateMouseRelease");
		this._removeListener(document, "wheel",       "updateMouseWheel");
		this._removeListener(document, "click",       "_blockEvent");
		this._removeListener(document, "dblclick",    "_blockEvent");
		this._removeListener(document, "contextmenu", "_blockEvent");
	}

	// handlers
	////////////////////////////////////////////////////////////////////////////
	updateMousePress(e) {
		this._state.updateButtonState(this._MOUSE_ID, e.button, true, this._MOUSE_ID);

		this._blockEvent(e);
	}
	updateMouseRelease(e) {
		this._state.updateButtonState(this._MOUSE_ID, e.button, false, this._MOUSE_ID);

		this._blockEvent(e);
	}
	updateMouseWheel(e) {
		//TODO figure out how to hook this up
		DEBUG.LOUD_INPUT && Logger.log(e);

		this._blockEvent(e);
	}
}
