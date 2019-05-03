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
		// TODO: acknowledge 3d exists and allow for swapping
		BinaryLayoutSplit.resizeStep(this._model._root, 0,0, width, height);
	}

	tick(time) {
		let panels = this._model._panels;
		for(let i=0; i<panels.length; i++) {
			this._renderer.drawPanel(panels[i]);
		}
	}

	// saving / loading
	////////////////////////////////////////////////////////////////////////////
	loadWorkspace(name) {
		this._model = new DefaultScreen();
		this._root = this._model._root;
	}
}
