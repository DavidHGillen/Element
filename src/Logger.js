/**
 * Global varaibles for debugging
 */
window.DEBUG = {
	LOUD_INPUT: false,
}

/**
 * Console.log abstraction for output redirection, ability to parse custom data types
 */
class Logger {
	//._verbose    // should it output verbose messages
	//._target     // where should the outputs be sent to

	// modes
	////////////////////////////////////////////////////////////////////////////
	static get verbose() {
		return !!Logger._verbose;
	};
	static set verbose(val) {
		Logger._verbose = !!val;
	};
	static set output(target) {
		if(target.log === undefined || typeof target.log != "function") {
			throw "Cannot find '.log' on output target. Required API.";
		}
		if(target.warn === undefined || typeof target.warn != "function") {
			throw "Cannot find '.warn' on output target. Required API.";
		}
		if(target.error === undefined || typeof target.error != "function") {
			throw "Cannot find '.error' on output target. Required API.";
		}

		Logger._target = target;
	}

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Pure static class!";
	}
	
	// formatting
	////////////////////////////////////////////////////////////////////////////
	static prep(...params) {
		//TODO: introspect and format custom data types
		return params;
	}

	// output
	////////////////////////////////////////////////////////////////////////////
	static log(...params) {
		Logger._target.log.apply(Logger._target, Logger.prep(params));
	};

	static warn(...params) {
		Logger._target.warn.apply(Logger._target, Logger.prep(params));
	};

	static error(...params) {
		Logger._target.error.apply(Logger._target, Logger.prep(params));
	};

	// verbose output
	////////////////////////////////////////////////////////////////////////////
	static logV(...params) {
		if(!Logger._verbose) { return; }
		Logger.log.apply(this, params);
	};

	static warnV(...params) {
		if(!Logger._verbose) { return; }
		Logger.warn.apply(this, params);
	};

	static errorV(...params) {
		if(!Logger._verbose) { return; }
		Logger.error.apply(this, params);
	};
	
	// formatting
	////////////////////////////////////////////////////////////////////////////
} Logger.output = console;
