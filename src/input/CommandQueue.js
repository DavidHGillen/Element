/**
 * Turns input states into action requests and queues them.
 * Process the queue of action requests.
 */
class CommandQueue extends Evee {

	// static
	////////////////////////////////////////////////////////////////////////////
	static get BTN(){ return "button"; } // hit
	static get AXIS(){ return "axis"; } // -1 to 1
	static get PRESS(){ return "pressure"; } // 0 - 1

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(layout) {
		super();

		// public
		this._layout = layout;

		// private
		this._commandInputDict = { // What specific inputs exist for what specific panels
			"*": {}
		};
		this._inputTree = {}; // Concurrent input detection

		this._layout = layout;

		this._queue = [];
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	attachInputToCommand(panelName, commandName, keys) {
		//TODO: detect known panels {panelName}
		//TODO: detect valid actionName {actionName}
		//TODO: detect key re-use {keys}

		let panelInputs = this._commandInputDict[panelName];
		if(panelInputs === undefined) { panelInputs = this._commandInputDict[panelName] = {}; }

		let commandInputs = panelInputs[commandName];
		if(commandInputs === undefined) { commandInputs = panelInputs[commandName] = []; }

//TODO: validate key combo

		commandInputs.push(keys);

		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
		////////////////////// keys _inputTree
	}

	// manually invoke a specific action progamatically
	performCommand(name, value, isHeld) {

	}
}
