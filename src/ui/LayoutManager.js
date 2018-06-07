/**
 * Determine and manage position of all displays and overlays
 */
class LayoutManager extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._displays = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	addDisplay(target) {
		this._displays.push(target);
	}
}
