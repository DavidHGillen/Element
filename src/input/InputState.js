/**
 * Hold and track final button values, then output state based upon changes.
 * Apply further constraint to inputs like smoothing, debouncing, and gatekeeping.
 * Of important note there are two types of input updates, immediate and polled.
 * Immediate events are maintained so that browsers can track user input for API security.
 */
class InputState extends Evee {
	// static
	////////////////////////////////////////////////////////////////////////////
	static get INPUT_DOWN() {       return "InputState.InputDown"; }       // Immediate: Begining of interaction
	static get INPUT_PRESS() {      return "InputState.InputPress"; }      // Immediate: Complex click
	static get INPUT_UP() {         return "InputState.InputUp"; }         // Immediate: Ending of interaction
	static get INPUT_HELD() {       return "InputState.InputHeld"; }       // Polled: Repeated event trigger
	static get INPUT_VALUE1() {     return "InputState.InputValue1"; }     // Polled: Continuing single value
	static get INPUT_VALUE2() {     return "InputState.InputValue2"; }     // Polled: Continuing value pair
	static get INPUT_VALUE3() {     return "InputState.InputValue3"; }     // Polled: Continuing value triplet
	static get INPUT_VALUE4() {     return "InputState.InputValue4"; }     // Polled: Continuing value quad
	static get INPUT_MATRIX3() {    return "InputState.InputMatrix3"; }    // Polled: Continuing 3x3 matrix
 
	constructor() {
		super();

		// Track the input data feeds to input classications for command mapping
		// Used to disambiguate things like Controller inputs from each other
		this._inputList = [
			"Key",
			"Mouse"
		]

		// track the state of each tracked input system
		this._inputData = [
			{}, // keyboard
			{}  // mouse
		];

		this.pressMaxTime = 300; //ms
		this._activeButtons = [];
	}

	// util
	////////////////////////////////////////////////////////////////////////////
	getActiveButtons() {
		return this._activeButtons.map(o => o.inputCode);
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

		let inputCode = this._inputList[inputID] + button;
		let wasPressed = !!buttonData.state;
		buttonData.lastUpdate = updateTime;
		buttonData.inputCode = inputCode;

		DEBUG.LOUD_INPUT && Logger.log(inputID, button, pressed, buttonData.inputCode);

		if(pressed) {
			// held // let the polled input handle reticking held buttons
			if(wasPressed) { return; }

			// pressed
			buttonData.holdStart = updateTime;
			buttonData.state = true;
			this._activeButtons.push(buttonData);

			this.emit(InputState.INPUT_DOWN, buttonData);
		} else {
			// release
			buttonData.state = false;
			let index = this._activeButtons.indexOf(buttonData);
			if(index >=0){ this._activeButtons.splice(index, 1); }

			// fire a click just before we declare the button up
			if(buttonData.lastUpdate - buttonData.holdStart > this.pressMaxTime){
				this.emit(InputState.INPUT_PRESS, buttonData);
			}

			this.emit(InputState.INPUT_UP, buttonData);
		}
	}

	updateAxisValue(inputID, axis, value) {
		//let now = Date.now();

		DEBUG.LOUD_INPUT && Logger.log(inputID, axis, value);
	}
}