// DTO 
class InputAction {
	//TODO maybe freeze or sela up something closer to an actual enum
	static get MASK_TARGET() {          return 0b00000010; }
	static get TARGET_LOCATIONAL() {    return 0b00000010; }
	static get TARGET_BROADCAST() {     return 0b00000000; }
	static get MASK_RESPONSE() {        return 0b00000001; }
	static get RESPONSE_HELD() {        return 0b00000001; }
	static get RESPONSE_SINGLE() {      return 0b00000000; }

	constructor(actionType, inputCombo, value){
		if(actionType === null || actionType === undefined) { throw `Invalid action type of {$actionType}`; }
		this._actionType = actionType;
		this._inputCombo = inputCombo || null;
		this._defaultValue = isNaN(value) ? null : value;
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
	static inputSort (arr) {
		const importance = CommandRegister.KEY_IMPORTANCE;

		let inputCount = arr.length;
		let outPut = [];
		KEYS: for(let i=0; i<inputCount; i++) {
			let input = arr[i];
			let inputImportance = importance.indexOf(input);

			let insertIndex = 0;
			INSERT: for(let j=0; j<outPut.length; j++) {
				let test = outPut[j];
				let testImportance = importance.indexOf(test);

				if(!test) { break INSERT; }
				if(testImportance === -1 && inputImportance === -1) {
					if(test < input) { break INSERT; }
				} else if(testImportance >= inputImportance) {
					break INSERT;
				}

				insertIndex++;
			}

			outPut.splice(insertIndex, 0, input);
		}

		return outPut.reverse();
	};

	// setup
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		// public

		// private
		this._inputDictionary = [];

		// setup
	}

	attachInputsToCommand(scopeID, commandName, inputActions) {
		// This is a very common api point, error check the heck out of its inputs
		if(!scopeID || scopeID === ""){ return; } // TODO // Errors
		if(!commandName || commandName === ""){ return; } // TODO // Errors
		if(!inputActions || !inputActions.length){ return; } // TODO // Errors

		for(let i = 0; i < inputActions.length; i++) {
			let inputAction = inputActions[i];
			if(!inputAction._inputCombo || !inputAction._inputCombo.length){ continue; } // TODO // Errors

			let sortedInputs = CommandRegister.inputSort(inputAction._inputCombo);
			let topElement = this._inputDictionary;
			let lookIndex = -1;
			let firstInput = null;

			// walk down the hierarchy creating it if needed
			while(firstInput = sortedInputs[++lookIndex]) {
				topElement = topElement[firstInput] = topElement[firstInput] || [];
			}

			topElement.push({scopeID, commandName, inputAction});
		}
	}

	// lookup
	////////////////////////////////////////////////////////////////////////////
	retrieveActions(inputCombo) {
		// this shouldn't be called with no inputs
		if(inputCombo.length === 0) { return null; }

		let sortedInputs = CommandRegister.inputSort(inputCombo);
		let topDict = this._inputDictionary;

		// use sorted input length incase we ever trim fat there
		for(let i=0, l=sortedInputs.length; i<l; i++) {
			let lookup = topDict[sortedInputs[i]];
			if(!lookup) { return null; }
			topDict = lookup;
		}

		return topDict;
	}
}
