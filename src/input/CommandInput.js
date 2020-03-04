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
		let data = e.data;
		console.log(e.sender.name +": ", data.inputCode, data.buttonData);

		//
		//
		//
		//
		//
		//
		//
		//
		// combine this new input with held keys and run that combo through the register
		// use the layout state hierarchy to scope requests and abandon at first complete success
		// reuse this approach for held actions
		// bundling of keys to prevent problems but allow actions is unresolved
		//
		//
		//
		//
		//
		//
		//
		//
		//
	}

	// 
	polledInput() {
		//this._state  //  //
	}
}
