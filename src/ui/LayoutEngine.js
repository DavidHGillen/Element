/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Determine and manage position of all panels and overlays.
 *
 * UI follows an MVC approach where the Model and Controller are batched into a
 * ModelController "MC" while the View is kept separate so it's easy to swap out.
 *
 * A Panel represents a collection of Components, Components are terminal display elements.
 *
 * As such there are view contexts which contain distinct layouts and layout information (workspaces / vr)
 * Displays are associated with layout information for each context via the display's layoutID
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
class LayoutEngine extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._activeContext = undefined;
		this._activeDisplays = undefined;
		this._activeControllers = [];
		this._contexts = {};

		// TEMP DEBUG CODE //
		let defaultLayout = new LayoutContext();
		this.addContext("default", defaultLayout);
		this.switchContext("default");
		// TEMP DEBUG CODE //
	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////
	getDisplays() {
		return this._activeDisplays;
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		this._activeDisplays.every( (display) => {
			display.resizeScreen(width, height);
		});
	}

	addContext(name, instance) {
		this._contexts[name] = instance;
	}

	switchContext(name) {
		this._activeContext = this._contexts[name];
		this._activeDisplays = this._activeContext.displays;
	}

	addModelController(modelController) {

	}

	attachDisplay(id, display, contextName) {
		let context;

		if(contextName) {
			context = this._contexts[contextName];
		} else {
			context = this._activeContext;
		}

		context.push(display);

	}
}
