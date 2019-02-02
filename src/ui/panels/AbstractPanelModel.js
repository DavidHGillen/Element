/**
 * All the data common to every panel.
 */
class AbstractPanelModel extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(layoutID) {
		if(layoutID < 0 || isNaN(layoutID)){ throw "Not a valid ID"; }

		super();

		this.layoutID = layoutID;    // uid for tracking

		this._components = [];
		this._panels = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
}
