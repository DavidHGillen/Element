/**
 * This class determines and manages the position and size of all UI in the application.
 * It does not render it, that is handled by the Renderer class for batching and optimization reasons.
 * The configuration of and presence of any UI is managed by a Workspace that can be swapped out at will.
 * Workspaces contain Panels, Panels contain Panels or Components. Components are terminal elements.
 */
class LayoutController extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(renderer) {
		super();

		this._renderer = renderer;

		this._model = undefined;
		this._root = undefined;
	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////

	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		this._model.resizeScreen(width, height);
	}

	tick(time) {
		let count = this._panels.length;
		for(let i=0; i<count; i++) {
			this._renderer.drawPanel(this._panels[i]);
		}
	}

	// saving / loading
	////////////////////////////////////////////////////////////////////////////
	loadWorkspace(name) {
		this._model = new DefaultScreen();
		this._root = this._model._root;
	}
}
