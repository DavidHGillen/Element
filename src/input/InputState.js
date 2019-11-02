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
	updateKeyboard(data) {
		this.emit(InputState.UPDATE, data);
	}
	
	updatePointer(data) {
		this.emit(InputState.UPDATE, data);
	}
	
	updateController(data) {
		Logger.error("TODO");
		
	}
}