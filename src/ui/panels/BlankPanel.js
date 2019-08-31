/**
 * Panel containing an empty component.
 */
class BlankPanel extends AbstractPanel{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(surfaceStore) {
		super(surfaceStore, null, null, null);

		this.bgSurfaceRef = surfaceStore.getFreeID();
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
}