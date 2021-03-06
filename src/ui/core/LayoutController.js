/**
 * This class determines and manages the position and size of all UI in the application.
 * It does not render it, that is handled by the Renderer class for batching and optimization reasons.
 * The configuration of and presence of any UI is managed by a Workspace that can be swapped out at will.
 * Workspaces contain Panels, Panels contain Components. Components may contain other Components.
 * 
 * TODO: Better system than Binary Layout splits
 * TODO: Panel tabbing
 * TODO: VR & 3D UI system
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

		this._model = null; // actual data about the current view hierarchy
		this._root = null; // root position in the binary layout split setup
		this._focusStack = []; // what panel or component had focus last, expected to be very flat

		this._loader = null;
	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////

	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		// TODO: acknowledge 3d exists and allow for swapping
		// TODO: make the model handle this
		BinaryLayoutSplit.resizeStep(this._model._root, 0,0, width, height);
	}

	update(time) {
		// TODO: make the model handle this
		let panels = this._model._panels;
		for (let i = 0; i < panels.length; i++) {
			//panels[i].update();
		}
	}

	// action processing
	////////////////////////////////////////////////////////////////////////////
	findAppropriateActions(actions) {
		let answer = null;

		// The action could still be targeted
		// If the focus stack has content walk that instead of guessing.
		if(this._focusStack.length) {
			answer = this.findActionsInStack(actions);
		}

		// This action is now considered Broadcast
		// Do a pass on panels as they take authority over components
		if(!answer) {
			answer = this.findActionsInPanels(actions);
		}

		// None of the panels matched so do components
		if(!answer) {
			answer = this.findActionsInAllComponents(actions);
		}

		return answer;
	}

	findActionsInStack(actions) {
		let answer = [];
		//TODO
		return answer.length ? answer : null;
	}

	findActionsInPanels(actions) {
		let answer = [];
		let panels = this._model._panels;
		let panelCount = panels.length, actionCount = actions.length;

		for (let i = 0; i < panelCount; i++) {
			let panel = panels[i];
			for (let j = 0; j < actionCount; j++) {
				let action = actions[j];
				if(panel.id == action.scopeID) { answer.push({panel, action}); };
			}
		}

		return answer.length ? answer : null;
	}

	findActionsInAllComponents(actions) {
		let answer = [];
		//TODO
		return answer.length ? answer : null;
	}

	// saving / loading
	////////////////////////////////////////////////////////////////////////////
	/**
	 * Begin loading the workspace information
	 * @param {string} path The json describing the layout
	 */
	loadWorkspaceFile(path) {
		this._loader = new createjs.LoadQueue();
		//this._loader
		//queue.loadFile();

		//TODO: don't
		this.createWorkspaceData(/*fileData*/);
	}

	/**
	 * Pass the loaded data off to a model to be processed
	 * @param {JSON} fileData The actual loaded data
	 */
	createWorkspaceData(fileData) {
		let screenData = new DefaultScreen(); //TODO: don't
		screenData._uiSurfaceStore = this._uiSurfaceStore;
		screenData._uiLineStore = this._uiLineStore;
		screenData._uiPointStore = this._uiPointStore;
		screenData._uiTextStore = this._uiTextStore;
		screenData.temp();

		this.applyWorkspaceFile(screenData);
	}

	/**
	 * Swap the current layout to an already loaded and processed layout
	 * @param {LayoutModel} model 
	 */
	applyWorkspaceFile(model) {
		this._model = model; //TODO: don't
		this._root = this._model._root;

		let viewports = model._viewports;
		for(let i=0; i<viewports.length; i++) {
			viewports[i].configure();
		}

		this.emit(LayoutController.WORKSPACE_READY);
	}
}
