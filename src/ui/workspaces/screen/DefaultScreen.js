/**
 * Create a configured Workspace instance for regular 2D screen viewing
 * TODO: replace with a json file representing the same thing
 */
class DefaultScreen extends LayoutModel{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		// TEMP TEMP TEMP TEMP //
		// TEMP TEMP TEMP TEMP //

		this._root = new BinaryLayoutSplit(true, "+150p",
			new AbstractPanelController(),
			new ViewerScreen(null)
		);

		/*this._panels.push(
			new ViewerScreen(null)
		);*/

		// TEMP TEMP TEMP TEMP //
		// TEMP TEMP TEMP TEMP //
	}
}
