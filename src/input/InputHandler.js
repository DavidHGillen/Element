/**
 * Standardize and coral all inputs into a controlled and expected behaviour system.
 */
class InputHandler extends Evee {
	constructor(canvas) {
		super();

		// public

		// configured

		// private
		this._canvas = canvas;
		this._activeMatrix;
		this._mouseX = 0;		this._mouseY = 0;

		// start
		window.addEventListener("mousemove", this._updateMousePosition.bind(this));
		this._canvas.addEventListener("mousedown", this._updateMousePress.bind(this));
		this._canvas.addEventListener("mouseup", this._updateMouseRelease.bind(this));
	}

	// public

	// private

	// mouse
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
}
