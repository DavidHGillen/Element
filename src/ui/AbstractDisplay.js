/**
 * All the things common to a display, displays being the top level of any view shown to a user.
 */
class AbstractDisplay extends Evee {
	constructor() {
		super();

		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 100;

		this._controls = [];
		this._panels = [];
	}

	addControl(control) {
		this._controls.push(control);
	}
}
