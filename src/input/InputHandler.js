/**
 * Standardize and coral all inputs into a controlled and expected behaviour system.
 * Sends resolved inputs to a state to be monitored and corrected.
 *
 * TODO:: Mouse position
 * TODO:: Controller APIS
 * TODO:: Touch inputs
 */
class InputHandler {
	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas, state) {
		// public

		// configured

		// private
		this._canvas = canvas;
		this._state = state;
		this._internalBinds = {};

		this._KEYBOARD_ID = 0;
		this._MOUSE_ID = 1;

		// function attachments
		this._internalBinds["focusLost"] = this._focusLost.bind(this);

		this._internalBinds["updateMousePosition"] = this._updateMousePosition.bind(this);
		this._internalBinds["updateMousePress"] =    this._updateMousePress.bind(this);
		this._internalBinds["updateMouseRelease"] =  this._updateMouseRelease.bind(this);
		this._internalBinds["blockMouseEvent"] =     this._blockEvent.bind(this);

		this._internalBinds["updateKeyDown"] = this._updateKeyDown.bind(this);
		this._internalBinds["updateKeyUp"] =   this._updateKeyUp.bind(this);

		// start
		this.attachDefaultListeners();
	}

	// listener
	////////////////////////////////////////////////////////////////////////////
	attachDefaultListeners() {
		window.addEventListener("mouseout", this._internalBinds["focusLost"]);

		window.addEventListener(      "mousemove",   this._internalBinds["updateMousePosition"]);
		this._canvas.addEventListener("mousedown",   this._internalBinds["updateMousePress"]);
		this._canvas.addEventListener("mouseup",     this._internalBinds["updateMouseRelease"]);
		this._canvas.addEventListener("click",       this._internalBinds["blockMouseEvent"]);
		this._canvas.addEventListener("dblclick",    this._internalBinds["blockMouseEvent"]);
		this._canvas.addEventListener("contextmenu", this._internalBinds["blockMouseEvent"]);

		document.addEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.addEventListener("keyup",   this._internalBinds["updateKeyUp"]);
	}

	detachDefaultListeners() {
		window.removeEventListener("mouseout", this._internalBinds["focusLost"]);

		window.removeEventListener(      "mousemove",   this._internalBinds["updateMousePosition"]);
		this._canvas.removeEventListener("mousedown",   this._internalBinds["updateMousePress"]);
		this._canvas.removeEventListener("mouseup",     this._internalBinds["updateMouseRelease"]);
		this._canvas.removeEventListener("click",       this._internalBinds["blockMouseEvent"]);
		this._canvas.removeEventListener("dblclick",    this._internalBinds["blockMouseEvent"]);
		this._canvas.removeEventListener("contextmenu", this._internalBinds["blockMouseEvent"]);

		document.removeEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.removeEventListener("keyup",   this._internalBinds["updateKeyUp"]);
	}

	// global
	////////////////////////////////////////////////////////////////////////////
	// apply updates for all delta based inputs and poll non updating inputs
	update(now) {
		this._state.update();
	}

	_focusLost(e) {
	}

	// mouse
	////////////////////////////////////////////////////////////////////////////
	_blockEvent(e) {
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
	}
	_updateMousePosition(e) {
		this._mouseXCur = e.clientX;
		this._mouseYCur = e.clientY;
	}
	_updateMousePress(e) {
		this._state.updateButtonState(this._MOUSE_ID, e.button, true);

		this._blockEvent(e);
	}
	_updateMouseRelease(e) {
		this._state.updateButtonState(this._MOUSE_ID, e.button, false);

		this._blockEvent(e);
	}

	// keyboard
	////////////////////////////////////////////////////////////////////////////
	_updateKeyDown(e) {
		this._state.updateButtonState(this._KEYBOARD_ID, e.keyCode, true);

		this._blockEvent(e);
	}
	_updateKeyUp(e) {
		this._state.updateButtonState(this._KEYBOARD_ID, e.keyCode, false);

		this._blockEvent(e);
	}
}
