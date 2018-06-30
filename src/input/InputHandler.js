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
		this._panX = 0;			this._panY = 0;
		this._held = false;

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
		let newX = e.clientX;
		let newY = e.clientY;

		if(this._held) {
			this._panX += this._mouseX - newX;
			this._panY += this._mouseY - newY;
		}

		this._mouseX = newX;
		this._mouseY = newY;
	}
	_updateMousePress(e) {
		this._held = true;
		console.log("down");
	}
	_updateMouseRelease(e) {
		this._held = false;
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
