/**
 * Panel containing an empty component.
 */
class BlankPanel extends AbstractPanel{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(surfaceStore) {
		super("Blank", surfaceStore);

		this.bgSurfaceRef = surfaceStore.getFreeID();

		this._registerCommand("test", this.testCommand, CI.RESPONSE_SINGLE | CI.DATA_BROADCAST);
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	resize(x, y, width, height) {
		super.resize(x,y, width,height);

		// // // TEMP // // // 
		let color = 0.2+0.02*Math.random();
		this._uiSurfaceStore.updateRect(this.bgSurfaceRef,
			new Rectangle(x,y, width,height), 1, {r:color, g:color, b:color}
		);
		// // // TEMP // // // 
	}

	// commands
	////////////////////////////////////////////////////////////////////////////
	testCommand(...params) {
		Logger.log("Blank: " + params);
	}
}
