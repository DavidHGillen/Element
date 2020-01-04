// DTO 
class KeyAction {
	static get ACTION_CONTINUOUS() {    return "CommandRegister.ActionContinuous"; }
	static get ACTION_SINGLE() {        return "CommandRegister.ActionSingle"; }

	constructor(action, keyset, value){
		this._action = action || null;
		this._keySet = keyset || null;
		this._defaultValue = isNaN(value) ? null : value;
	}
}

/**
 * Dictionary like structure of different commands.
 */
class CommandRegister {

	// static
	////////////////////////////////////////////////////////////////////////////
	keySort = function (a, b) {
		const importance = ["control", "shift", "alt", "command", "function"];

		// STUFF

		return 0;
	};

	// setup
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		// public

		// private
		this._scopeDictionary = [];

		// setup
	}

	attachInputsToCommand(scopeID, commandName, keyActions) {
		if(!scopeID || scopeID === ""){ return; } // TODO // Errors
		if(!commandName || commandName === ""){ return; } // TODO // Errors
		if(!keyActions || !keyActions.length){ return; } // TODO // Errors

		for(let i = 0; i < keyActions.length; i++) {
			let ka = keyActions[i];
			let sortedKeys = ka._keySet;
			if(!sortedKeys || !sortedKeys.length){ continue; } // TODO // Errors

			sortedKeys = sortedKeys.slice();
			sortedKeys.sort(CommandRegister.keySort);

			console.log(sortedKeys);
		}
	}

	// lookup
	////////////////////////////////////////////////////////////////////////////
}
