/**
 * Load the configuration file describing the panels requested and their relations.
 * TODO: process a loaded file. Currently extending this and fabricating a configured instance (see DefaultScreen.js)
 */
class LayoutModel extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		// protected
		this._layoutStyle = 0;    // [screen, vr, ar]
		this._root = [];          // something something layout
		
		this._panels = [];
		this._viewports = [];
	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////


	// core
	////////////////////////////////////////////////////////////////////////////
}
