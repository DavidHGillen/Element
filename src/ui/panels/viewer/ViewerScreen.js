/**
 * Standard 2D screen view for a ViewerMC
 */
class ViewerScreen extends AbstractPanelController{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._data = new ViewerModel();

		this._components.push(new ViewportScreen());
	}
}
