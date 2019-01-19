/**
 * All the things common to a display, displays being the top level of any view shown to a user.
 */
class AbstractDisplay extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(layoutID) {
		if(layoutID < 0 || isNaN(layoutID)){ throw "Not a valid ID"; }

		super();

		this.layoutID = layoutID;
		this.dirty = true;

		this._controller = [];
		this._panels = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	addControl(control) {
		this._controls.push(control);
	}
}
