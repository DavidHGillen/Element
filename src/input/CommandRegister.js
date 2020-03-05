// DTO 
class KeyAction {
	static get ACTION_CONTINUOUS() {    return "CommandRegister.ActionContinuous"; }
	static get ACTION_SINGLE() {        return "CommandRegister.ActionSingle"; }

	constructor(actionType, keyCombo, value){
		this._actionType = actionType || null;
		this._keyCombo = keyCombo || null;
		this._defaultValue = isNaN(value) ? null : value;
		this.scope = null; // Set to correct scope for current action when needed
	}
}

/**
 * Dictionary like structure of different commands.
 */
class CommandRegister {

	// static
	////////////////////////////////////////////////////////////////////////////
	// How should we enforce keyboard key sorting? reversed to reduce logic checks needed
	static get KEY_IMPORTANCE() {
		return [
			//"Fn" does not represent a unique key command to browser, but modifies others
			"Key18",        // Alt
			"Key16",        // Shift
			"Key17",        // Control
			"Key93",        // Windows Menu / Right Command
			"Key91"         // Windows Key / Left Command / Chrome Search
		];
	}

	// provide a sorted array of keyboard commands for registration
	static keySort (arr) {
		const importance = CommandRegister.KEY_IMPORTANCE;

		let keyCount = arr.length;
		let outPut = [];
		KEYS: for(let i=0; i<keyCount; i++) {
			let key = arr[i];
			let keyImportance = importance.indexOf(key);

			let insertIndex = 0;
			INSERT: for(let j=0; j<outPut.length; j++) {
				let test = outPut[j];
				let testImportance = importance.indexOf(test);

				if(!test) { break INSERT; }
				if(testImportance == -1 && keyImportance == -1) {
					if(test < key) { break INSERT; }
				} else if(testImportance >= keyImportance) {
					break INSERT;
				}

				insertIndex++;
			}

			outPut.splice(insertIndex, 0, key);
		}

		return outPut.reverse();
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
		// This is a very common api point, error check the heck out of its inputs
		if(!scopeID || scopeID === ""){ return; } // TODO // Errors
		if(!commandName || commandName === ""){ return; } // TODO // Errors
		if(!keyActions || !keyActions.length){ return; } // TODO // Errors

		for(let i = 0; i < keyActions.length; i++) {
			let keyAction = keyActions[i];
			if(!keyAction._keyCombo || !keyAction._keyCombo.length){ continue; } // TODO // Errors

			let sortedKeys = CommandRegister.keySort(keyAction._keyCombo);
			let topElement = this._scopeDictionary;
			let lookIndex = -1;
			let firstKey = null;

			// walk down the hierarchy creating it if needed
			while(firstKey = sortedKeys[++lookIndex]) {
				topElement = topElement[firstKey] = topElement[firstKey] || [];
			}

			topElement.push({scopeID, commandName, keyAction});
		}
	}

	// lookup
	////////////////////////////////////////////////////////////////////////////
	retrieveActions(keyCombo) {
		// this shouldn't be called with no keys
		if(keyCombo.length == 0) { return null; }

		let sortedKeys = CommandRegister.keySort(keyCombo);
		let topDict = this._scopeDictionary;

		// use sorted keys length incase we ever trim fat there
		for(let i=0, l=sortedKeys.length; i<l; i++) {
			let lookup = topDict[sortedKeys[i]];
			if(!lookup) { return null; }
			topDict = lookup;
		}

		return topDict;
	}
}
