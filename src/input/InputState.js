/**
 * Hold and track final button values
 */
class InputState extends Evee {
	// static
	////////////////////////////////////////////////////////////////////////////
	static get UPDATE() { return "InputState.Update"; }

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._pointerData = {};
		this._keyboardData = {};
		this._controllerData = {};
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	updateKeyboard(value, pressed) {
		let updateTime = Date.now();
		let keyData = this._keyboardData[value];

		let wasPressed = keyData.state || false;
		let lastUpdateTime = keyData.lastUpdate || 0;
		keyData.lastUpdate = updateTime;

		if(pressed) {
			// pressed
			if(!wasPressed) {
				keyData.state = false;

			// held
			} else {
				
			} 

		} else {
			// release
			keyData.holdStart = updateTime;
			keyData.state = true;
		} 

		this.emit(InputState.UPDATE, data);
	}
	
	updatePointer(data) {
		//let now = Date.now();

		this.emit(InputState.UPDATE, data);
	}
	
	updateController(data) {
		Logger.error("TODO");
		
	}
	
	updateState(){};
}