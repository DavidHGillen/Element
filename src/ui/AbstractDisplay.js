/**
 * All the things common to a display, displays being the top level of any view shown to a user.
 */
class AbstractDisplay extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 100;
		this.dirty = true;

		this._controls = [];
		this._panels = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	addControl(control) {
		this._controls.push(control);
	}

	resizeScreen(width, height) {
		this.width = width;
		this.height = height;
		this.dirty = true;

		this._controls.every( (control) => {
			control.resizeScreen(width, height);
		});
	}
}
