/**
 * Create a configured Workspace instance for regular 2D screen viewing
 * TODO: replace with a json file representing the same thing
 */
class DefaultScreen extends LayoutModel{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._panels = [];
		this._viewports = [];
	}

	temp(surf, ) {
		// TEMP TEMP TEMP TEMP //
		// TEMP TEMP TEMP TEMP //

		this._panels.push(
			new ViewerPanel(),
			new BlankPanel(this._uiSurfaceStore)
		);
		this._viewports.push(
			this._panels[0]
		);

		this._root = new BinaryLayoutSplit(false, "+200x",
			new LayoutZone(this._panels[1]),
			new LayoutZone(this._panels[0])
		);

		// TEMP TEMP TEMP TEMP //
		// TEMP TEMP TEMP TEMP //
	}
}
