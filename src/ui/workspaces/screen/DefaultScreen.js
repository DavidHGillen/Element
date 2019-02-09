/**
 * Create a configured Workspace instance for regular 2D screen viewing
 * TODO: replace with a json file representing the same thing
 */
class DefaultScreen extends Workspace{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._panels.push(
			new ViewerScreen(null)
		);
	}
}
