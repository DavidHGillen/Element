/**
 * Standardize and coral all inputs into a controlled and expected behaviour system.
 * Sends resolved and corrected input state to the `input/CommandQueue` to activate.
 *
 * TODO:: Key combos are not handled by this properly
 * TODO:: Controller APIS
 * TODO:: Non standard mice
 * TODO:: Touch inputs
 */
class InputHandler {
	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	/**
	 * Create the input listener and pair it to a command queue, this will immeditaley attach listeners
	 */
	constructor(canvas, state) {
		// public

		// configured

		// private
		this._canvas = canvas;
		this._state = state;
		this._internalBinds = {};

		// mouse
		this._mouseXCur = 0;
		this._mouseYCur = 0;

		// keyboard
		this._keyPressTimes = {};
		this._keyResponse = {};
		this._holdKeyDelay = 100;

		// function attachments
		this._internalBinds["evtMouseLost"] = this._evtMouseLost.bind(this);
		this._internalBinds["updateMousePosition"] = this._updateMousePosition.bind(this);
		this._internalBinds["updateMousePress"] = this._updateMousePress.bind(this);
		this._internalBinds["updateMouseRelease"] = this._updateMouseRelease.bind(this);
		this._internalBinds["blockMouseEvent"] = this._blockMouseEvent.bind(this);
		this._internalBinds["updateKeyDown"] = this._updateKeyDown.bind(this);
		this._internalBinds["updateKeyUp"] = this._updateKeyUp.bind(this);

		// start
		this.attachDefaultListeners();
	}

	// listener
	////////////////////////////////////////////////////////////////////////////
	attachDefaultListeners() {
		window.addEventListener("mouseout", this._internalBinds["evtMouseLost"]);
		window.addEventListener("mousemove", this._internalBinds["updateMousePosition"]);
		this._canvas.addEventListener("mousedown", this._internalBinds["updateMousePress"]);
		this._canvas.addEventListener("mouseup", this._internalBinds["updateMouseRelease"]);
		this._canvas.addEventListener("click", this._internalBinds["blockMouseEvent"]);
		this._canvas.addEventListener("dblclick", this._internalBinds["blockMouseEvent"]);
		this._canvas.addEventListener("contextmenu", this._internalBinds["blockMouseEvent"]);
		document.addEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.addEventListener("keyup", this._internalBinds["updateKeyUp"]);
	}

	detachDefaultListeners() {
		window.removeEventListener("mouseout", this._internalBinds["evtMouseLost"]);
		window.removeEventListener("mousemove", this._internalBinds["updateMousePosition"]);
		this._canvas.removeEventListener("mousedown", this._internalBinds["updateMousePress"]);
		this._canvas.removeEventListener("mouseup", this._internalBinds["updateMouseRelease"]);
		this._canvas.removeEventListener("click", this._internalBinds["blockMouseEvent"]);
		this._canvas.removeEventListener("dblclick", this._internalBinds["blockMouseEvent"]);
		this._canvas.removeEventListener("contextmenu", this._internalBinds["blockMouseEvent"]);
		document.removeEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.removeEventListener("keyup", this._internalBinds["updateKeyUp"]);
	}

	// commands
	////////////////////////////////////////////////////////////////////////////
	// apply updates for all delta based inputs and poll non updating inputs
	update(now) {
		this._mouseTick(now);
		this._keyboardTick(now);

		this._state.updateState("hi");
	}

	// mouse
	////////////////////////////////////////////////////////////////////////////
	_blockMouseEvent(e) {
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
	}
	_updateMousePosition(e) {
		this._mouseXCur = e.clientX;
		this._mouseYCur = e.clientY;
	}
	_updateMousePress(e) {
		this._state.updatePointer("hi");

		this._blockMouseEvent(e);
	}
	_updateMouseRelease(e) {
		this._state.updatePointer("hi");

		this._blockMouseEvent(e);
	}
	_evtMouseLost(e) {
		this._state.updatePointer("hi");

		this._blockMouseEvent(e);
	}

	_mouseTick(now) {
		// // //
	}

	// keyboard
	////////////////////////////////////////////////////////////////////////////
	_updateKeyDown(e) {
		this._state.updateKeyboard("hi");
	}
	_updateKeyUp(e) {
		this._state.updateKeyboard("hi");
	}

	_keyboardTick(now) {
		// // //
	}
}
