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
	static keySort (arr) {
		// reversed to reduce logic checks needed
		const importance = ["Function", "Alt", "Shift", "Control", "Command"];

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
		if(!scopeID || scopeID === ""){ return; } // TODO // Errors
		if(!commandName || commandName === ""){ return; } // TODO // Errors
		if(!keyActions || !keyActions.length){ return; } // TODO // Errors

		for(let i = 0; i < keyActions.length; i++) {
			let ka = keyActions[i];
			if(!ka._keySet || !ka._keySet.length){ continue; } // TODO // Errors

			let sortedKeys = CommandRegister.keySort(ka._keySet);

			console.log(sortedKeys);
		}
	}

	// lookup
	////////////////////////////////////////////////////////////////////////////
}
