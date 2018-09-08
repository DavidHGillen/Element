/**
 * Turns action requests into specific outputs. All button clicks or inputs generate commands that then check what they
 * are bound to do.
 */
class CommandQueue extends Evee {

	// static
	////////////////////////////////////////////////////////////////////////////
	static get BTN(){ return "button"; }
	static get AXIS(){ return "axis"; }
	static get PRESS(){ return "pressure"; }

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas) {
		super();

		// public

		// configured

		// private
		this._actions = {};

		// start
	}

	// ???
	////////////////////////////////////////////////////////////////////////////
	register(name, object, action, type) {
		if(this._actions[name]) {
			Logger.warn(`Existing action for command(${name})`);
		}

		this._actions[name] = {obj: object, fn: action, type: type};
	}

	performCommand(name, value, isHeld) {
		let action = this._actions[name];
		if(action === undefined){
			Logger.warn(`Input triggering unknown action(${name})`);
			return;
		}

		action.fn.call(action.obj, value);
	}
}
