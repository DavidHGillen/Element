/**
 * Hold and track final button values, output events based upon transitions.
 * update<Input> functions will immediately with no loss of context fire UP/DOWN events.
 * self.tick function will eventually output delayed input states PRESS/HELD.
 */
class InputState extends Evee {
	// static
	////////////////////////////////////////////////////////////////////////////
	static get INPUT_DOWN() {       return "InputState.InputDown"; }      // Immediate: Begining of interaction
	static get INPUT_UP() {         return "InputState.InputUp"; }        // Immediate: Ending of 
	static get INPUT_HELD() {       return "InputState.InputHeld"; }      // Immediate: No-op of tracking repeated events
	static get INPUT_PRESS() {      return "InputState.InputPress"; }     // Polled: Complex click
	static get INPUT_VALUE1() {     return "InputState.InputValue1"; }    // Polled: Continuing single value
	static get INPUT_VALUE2() {     return "InputState.InputValue2"; }    // Polled: Continuing value pair
	static get INPUT_VALUE3() {     return "InputState.InputValue3"; }    // Polled: Continuing value triplet
	static get INPUT_VALUE4() {     return "InputState.InputValue4"; }    // Polled: Continuing value quad
	static get INPUT_MATRIX3() {    return "InputState.InputValue4"; }    // Polled: Continuing 3x3 matrix
 
	constructor() {
		super();

		this._inputData = [
			{}, // keyboard
			{}  // mouse
		];
	}

	// self.tick
	////////////////////////////////////////////////////////////////////////////
	update() {
		//this.emit(InputState.INPUT_HELD, {});
		//this.emit(InputState.INPUT_PRESS, {});
		//this.emit(InputState.INPUT_VALUE1, {});
		//this.emit(InputState.INPUT_VALUE2, {});
		//this.emit(InputState.INPUT_VALUE3, {});
	}

	// update<Input>
	////////////////////////////////////////////////////////////////////////////
	updateButtonState(inputID, button, pressed) {
		let updateTime = Date.now();
		let buttonData = this._inputData[inputID][button] || (this._inputData[inputID][button] = {});

		let wasPressed = !!buttonData.state;
		buttonData.lastUpdate = updateTime;

		if(pressed) {
			// pressed
			if(!wasPressed) {
				buttonData.state = true;
				this.emit(InputState.INPUT_DOWN, {});

			// held
			} //else { }

		} else {
			// release
			buttonData.holdStart = updateTime;
			buttonData.state = false;
			this.emit(InputState.INPUT_UP, {});
		}
	}

	updateAxisValue(inputID, axis, value) {
		//let now = Date.now();
	}
}