/**
 * Load the configuration file describing the panels requested and their relations.
 * TODO: actually load a file. Currently fabricating configured instances
 */
class Workspace extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		// protected
		this._layoutStyle = 0;    // [screen, vr, ar]
		this._panels = [];        // array of managed panels

		this._groups = [];        // something something layout
	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////


	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {

		for(let i = 0, count = this._panels.length; i<count; i++) {
			this._panels[i].resize(width, height);
		}
	}
}
