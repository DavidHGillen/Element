/**
 * Blank panel with empty contents
 */
class BlankScreen extends AbstractPanelController{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._data = new BlankModel();

		this._components.push(new EmptyScreen());
	}
}
