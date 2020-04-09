// DTO 
class CommandInput {
	//TODO maybe freeze or sela up something closer to an actual enum
	static get MASK_RESPONSE() {      return 0b00000001; }
	static get RESPONSE_SINGLE() {    return 0b00000000; } // one push = one action
	static get RESPONSE_HELD() {      return 0b00000001; } // ongoing while held
	static get MASK_DATA() {          return 0b00000110; }
	static get DATA_BROADCAST() {     return 0b00000000; } // expects nothing
	static get DATA_DATASTREAM() {    return 0b00000010; } // expects a value
	static get DATA_LOCATIONAL() {    return 0b00000100; } // expects a pointer
	//static get DATA_UNUSED() {      return 0b00000110; }

	constructor(actionType, inputCombo, value){
		if(actionType === null || actionType === undefined) { throw `Invalid action type of {$actionType}`; }
		this._actionType = actionType;
		this._inputCombo = inputCombo || null;
		this._defaultValue = isNaN(value) ? null : value;
	}
}

window.CI = CommandInput;