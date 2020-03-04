/**
 * Turns input states changes into action requests and queues them.
 */
class CommandInput extends Evee {

	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(layout, state, register, queue) {
		super();
		//(this._layout, this._inputState, this._commandRegister, this._commandQueue);

		// public

		// private
		this._register = register;
		this._layout = layout;
		this._state = state;
		this._queue = queue;
		this._stateListeners = {};

		// setup
		this._state.on(InputState.INPUT_DOWN, this.immediateInput);
		this._state.on(InputState.INPUT_UP, this.immediateInput);
		this._state.on(InputState.INPUT_HELD, this.immediateInput);
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	// 
	immediateInput(e) {
		//this._state  //  //
		console.log(e.sender.name, e.data);
	}

	// 
	polledInput() {
		//this._state  //  //
	}

	// events
	////////////////////////////////////////////////////////////////////////////
}
