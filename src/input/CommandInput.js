/**
 * Turns input states into action requests and queues them.
 * Process the queue of action requests.
 */
class CommandInput extends Evee {

	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(layout, state, register) {
		super();

		// public

		// private
		this._register = register;
		this._layout = layout;
		this._state = state;

		// setup
		//////////////this._state.on(InputState.UPDATE, this.handleStateUpdate)
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	// manually invoke a specific action progamatically
	performCommand(name, value, isHeld) {
	}

	update() {
		//this._state  //  //
	}

	// events
	////////////////////////////////////////////////////////////////////////////
	handleStateUpdate(data) {
		//debugger;
	}
}
