/**
 * Turns input states changes into action requests and queues them.
 */
class CommandAction extends Evee {
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
		this._state.on(InputState.INPUT_PRESS, this._boundImmediate);
		this._state.on(InputState.INPUT_UP, this._boundImmediate);
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	immediateInput(e) {
		let actions = this._register.retrieveActions(this._state.getActiveButtons());
		let eventType = e.sender.name;

		if(!actions || actions.length === 0) { return; }

		for(let i=0; i < actions.length; i++) {
			let action = actions[i];
			switch(action.commandInput._actionType & CI.MASK_RESPONSE) {
				// single inputs should wait for the press to be immediate
				case CI.RESPONSE_SINGLE:
					if(eventType !== InputState.INPUT_PRESS) { actions.splice(i--, 1); }
					break;

				// only the down event for held items should trigger immediate response
				case CI.RESPONSE_HELD:
					if(eventType !== InputState.INPUT_DOWN) { actions.splice(i--, 1); }
					break;
			}
		}

		//TODO: make locational actions find their focus by their location
		//IF: DATA_LOCATIONAL vs action.CI._actionType

		this.performValidActions(actions);
	}

	// TODO: The queue should have some idea of ongoing actions
	polledInput() {
		//TODO: this is expensive to retrieve on a polled basis.
		let actions = this._register.retrieveActions(this._state.getActiveControls());
		
		if(!actions || actions.length === 0) { return; }

		for(let i=0; i < actions.length; i++) {
			let action = actions[i];
			// we should only be running held actions
			if((action.commandInput._actionType & CI.MASK_RESPONSE) !== CI.RESPONSE_HELD){ actions.splice(i--, 1); }
		}

		this.performValidActions(actions);
	}

	performValidActions(actions) {
		let validPanelActions = this._layout.findAppropriateActions(actions);
		let test, count = validPanelActions?.length;

		if(!count) { return; }

		/* This can't be tested properly right now
		test = null;
		let singleAction = true;
		for(let i = 0; i < count && singleAction; i++) {
			if(test === null){
				test = validPanelActions[i].action;
			} else {
				singleAction = test === validPanelActions[i].action;
			}
		}

		if(!singleAction) {
			//TODO: better error, for what should rarely occur.
			Logger.warn("Unable to disambiguate broadcast actions: ");
			return;
		}*/

		test = null;
		let singlePanel = true;
		for(let i = 0; i < count && singlePanel; i++) {
			if(test === null){
				test = validPanelActions[i].panel;
			} else {
				let panel = validPanelActions[i].panel;
				singlePanel = test === panel;
				if(singlePanel) { continue; }
				if(test.id != panel.id) { continue; }
				if(test.shareInputs && panel.shareInputs) {
					singlePanel = true;
				}
			}
		}

		if(!singlePanel) {
			//TODO: better error, for what should rarely occur.
			Logger.warn("Unable to disambiguate action between panels: " + validPanelActions.map((a)=>a.id));
			return;
		}

		let action = validPanelActions[0].action;

		//TODO: pull non default values for things like joysticks
		test.performCommand(action.commandName, action.commandInput._defaultValue);
	}
}
