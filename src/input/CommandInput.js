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
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
		// with this information, figure out the scope to run it in from the layout
	}

	// 
	polledInput() {
		//this._state  //  //
	}
}
