/**
 * Determine and manage position of all displays and overlays.
 *
 * UI follows an MVC approach where the Model and Controller are batched into a
 * ModelController while the View is kept separate so it easy to swap out.
 *
 * Displays contain Panels or Components, Panels contain Components. All three
 * are made up of a modelController and interchangable views.
 */
class Layout extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._displays = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		this._displays.every( (display) => {
			display.width = width;
			display.height = height;
		});
	}

	addDisplay(target) {
		this._displays.push(target);
	}
}
