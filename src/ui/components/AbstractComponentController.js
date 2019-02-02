/**
 * All the interaction and reactive logic common to every panel.
 */
class AbstractComponentController extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		// public
		this.dirty = true;    // has this been updated but not rendered

		// protected
		this._is2D = true;    // Is this rendered as a single 2D object
		this._data = null;    // The model that this controller manage
	}

	// core
	////////////////////////////////////////////////////////////////////////////
}
