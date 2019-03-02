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

		this._root = new BinaryLayoutSplit(false, "+200x",
			new BlankScreen(),
			new ViewerScreen(null)
		);

		/*this._panels.push(
			new ViewerScreen(null)
		);*/

		// TEMP TEMP TEMP TEMP //
		// TEMP TEMP TEMP TEMP //
	}
}
