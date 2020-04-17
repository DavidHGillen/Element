/**
 * 
 */
class InputPointer extends Evee {
	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(inputDeviceID, id) {
		super();

		this._inputID = inputDeviceID;
		this._id = id;

		this.position = null; // stick values, mouse position, etc
		this.rotation = null; // stylus rotation, wand orientation, etc
		this.pressure = null; // stylus pressure, touch sensitivity, etc

		this.start = {position: null, rotation: null, pressure: null};
		this.last = {position: null, rotation: null, pressure: null};
	}

	// ctor
	////////////////////////////////////////////////////////////////////////////
	updateStart() {
		this.start.position = this.position;
		this.start.rotation = this.rotation;
		this.start.pressure = this.pressure;
	}

	updateLast() {
		this.last.position = this.position;
		this.last.rotation = this.rotation;
		this.last.pressure = this.pressure;
	}
}