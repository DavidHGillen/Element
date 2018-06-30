/**
 * Standardize and coral all inputs into a controlled and expected behaviour system.
 * Sends resolved and corrected inputs to the `input/CommandQueue` to activate.
 */
class InputHandler extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas) {
		super();

		// public

		// configured

		// private
		this._canvas = canvas;
		this._activeMatrix;
		this._mouseX = 0;		this._mouseY = 0;
		this._keyMap = {};

		// start
		window.addEventListener("mousemove", this._updateMousePosition.bind(this));
		this._canvas.addEventListener("mousedown", this._updateMousePress.bind(this));
		this._canvas.addEventListener("mouseup", this._updateMouseRelease.bind(this));

		document.addEventListener("keydown", this._updateKeyDown.bind(this));
		document.addEventListener("keyup", this._updateKeyUp.bind(this));
	}

	// mouse
	////////////////////////////////////////////////////////////////////////////
	_updateMousePosition(e) {
		this._mouseX = e.clientX;
		this._mouseY = e.clientY;
	}
	_updateMousePress(e) {
		console.log("down");
	}
	_updateMouseRelease(e) {
		console.log("up");
	}

	// keyboard
	////////////////////////////////////////////////////////////////////////////
	_updateKeyDown(e) {
		this._keyMap[e.keyCode] = true;
	}
	_updateKeyUp(e) {
		this._keyMap[e.keyCode] = false;
	}
}
