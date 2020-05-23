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

	// setup
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._deviceList = [];      //
		this._inputData = [];       // track the state of each tracked input system
		this._pointerList  = [];    // what are the potential locational (pointer) based inputs

		this.pressMaxTime = 300; //ms //TODO: per device
		this._activeControls = []; //optimization structure for lookups

		this.findActiveDevices();
		//this.loadDeviceConfiguartions(); //TODO: Allow people to save configu info for a device
	}

	findActiveDevices() {
		//TODO: don't hardcode, allow to be re-run later
		this.addDevice("System",      SystemInputDevice);
		this.addDevice("Mouse",       MouseInputDevice);
		this.addDevice("Keyboard",    KeyboardInputDevice);
	}

	addDevice(nameRef, classRef) {
		let newDevice = new classRef(name);
		this._deviceList.push(newDevice);
		this._inputData.push({});
		this._pointerList.concat.apply(this._pointerList, newDevice.getPointers());
		newDevice.setup();
	}

	//
	////////////////////////////////////////////////////////////////////////////
	getActiveControls() { //TODO: what? how can a value be "active"
		return this._activeControls.map(o => o.inputCode);
	}

	// self.tick
	////////////////////////////////////////////////////////////////////////////
	update() {
		//this.emit(InputState.INPUT_HELD, {});
		//this.emit(InputState.INPUT_VALUE1, {});
		//this.emit(InputState.INPUT_VALUE2, {});
		//this.emit(InputState.INPUT_VALUE3, {});
	}

	// update<Input>
	////////////////////////////////////////////////////////////////////////////
	updateButtonState(inputID, button, pressed, pointerID) { //TODO: "button" "state", oof
		let updateTime = Date.now();
		let buttonData = this._inputData[inputID][button];

		if(buttonData === undefined) {
			buttonData = this._inputData[inputID][button] = {
				inputCode : this._deviceList[inputID] + button
			};
		}

		DEBUG.LOUD_INPUT && Logger.log(inputID, button, pressed, buttonData.inputCode);

		if(pressed) {
			// held // let the polled input handle reticking held buttons
			if(buttonData.state) { return; }

			buttonData.pointer = pointerID === null ? null : this._pointerList[pointerID];
			if(buttonData.pointer) {
				buttonData.pointer.updateStart();
			}

			// pressed
			buttonData.holdStart = updateTime;
			buttonData.state = true;
			this._activeControls.push(buttonData);

			this.emit(InputState.INPUT_DOWN, buttonData);
		} else {
			// fire a click just before we declare the button up
			if(updateTime - buttonData.holdStart <= this.pressMaxTime){
				try{ this.emit(InputState.INPUT_PRESS, buttonData); } catch(e){ /*TODO error*/ } // bailing here ruins many things
			}

			// release
			buttonData.state = false;
			let index = this._activeControls.indexOf(buttonData);
			if(index >=0){ this._activeControls.splice(index, 1); }

			this.emit(InputState.INPUT_UP, buttonData);
		}

		buttonData.lastUpdate = updateTime;
		if(buttonData.pointer) {
			buttonData.pointer.updateLast();
		}
	}

	updateAxisValue(inputID, axis, value) {
		//let now = Date.now();

		DEBUG.LOUD_INPUT && Logger.log(inputID, axis, value);
	}
}