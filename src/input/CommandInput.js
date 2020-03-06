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
		let actions = this._register.retrieveActions(this._state.getActiveButtons());

		if(!actions || actions.length == 0) { return; }

		let action = actions[0];
		console.log(action);

		debugger;
		this._layout._model._panels[0].performCommand(action.commandName, action.inputAction._defaultValue);
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
