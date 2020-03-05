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
		this._layout = layout;
		this._register = register;
		this._queue = queue;
		this._state = state;

		// setup
		this._boundImmediate = this.immediateInput.bind(this);
		this._state.on(InputState.INPUT_DOWN, this._boundImmediate);
		this._state.on(InputState.INPUT_UP, this._boundImmediate);
		this._state.on(InputState.INPUT_HELD, this._boundImmediate);
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	// 
	immediateInput(e) {
		// e.data
		let action = this._register.retrieveAction(this._state.getActiveButtons());

		if(!action) { return; }

		console.log(action);

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
