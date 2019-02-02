/**
 * This class determines and manages the position and size of all UI in the application.
 * It does not render it, that is handled by the Renderer class for batching and optimization reasons.
 * The configuration of and presence of any UI is managed by a Workspace that can be swapped out at will.
 * Workspaces contain Panels, Panels contain Panels or Components. Components are terminal elements.
 */
class LayoutEngine extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////

	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
	}
}
