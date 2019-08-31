/**
 * This class determines and manages the position and size of all UI in the application.
 * It does not render it, that is handled by the Renderer class for batching and optimization reasons.
 * The configuration of and presence of any UI is managed by a Workspace that can be swapped out at will.
 * Workspaces contain Panels, Panels contain Panels or Components. Components are terminal elements.
 */
class LayoutController extends Evee{

	static get WORKSPACE_READY() { return "LayoutController.WorkspaceReady"; }
	static get WORKSPACE_FAILED() { return "LayoutController.WorkspaceFailed"; }

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(renderer) {
		super();

		this._uiSurfaceStore = UISurfaceStore.getInstance("global", renderer.gl);
		this._uiLineStore = UILineStore.getInstance("global", renderer.gl);
		this._uiPointStore = UIPointStore.getInstance("global", renderer.gl);
		this._uiTextStore = UITextStore.getInstance("global", renderer.gl);

		this._model = null;
		this._root = null;

		this._loader = null;
	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////

	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		// TODO: acknowledge 3d exists and allow for swapping
		BinaryLayoutSplit.resizeStep(this._model._root, 0,0, width, height);
	}

	update(time) {
		let panels = this._model._panels;
		for (let i = 0; i < panels.length; i++) {
			//panels[i].update();
		}
	}

	// saving / loading
	////////////////////////////////////////////////////////////////////////////
	loadWorkspaceFile(path) {
		this._loader = new createjs.LoadQueue();
		//this._loader
		//queue.loadFile();

		//TODO: don't
		this.createWorkspaceData(/*fileData*/);
	}

	createWorkspaceData(fileData) {
		let screenData = new DefaultScreen(); //TODO: don't
		screenData._uiSurfaceStore = this._uiSurfaceStore;
		screenData._uiLineStore = this._uiLineStore;
		screenData._uiPointStore = this._uiPointStore;
		screenData._uiTextStore = this._uiTextStore;
		screenData.temp();

		this.applyWorkspaceFile(screenData);
	}

	applyWorkspaceFile(file) {
		this._model = file; //TODO: don't
		this._root = this._model._root;

		this.emit(LayoutController.WORKSPACE_READY);
	}
}
