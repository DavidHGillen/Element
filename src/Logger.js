/**
 * Console.log abstraction for output redirection, ability to parse custom data types
 */
class Logger {
	// modes
	////////////////////////////////////////////////////////////////////////////
	static get debug() {
		return !!Logger._debug;
	};
	static set debug(val) {
		Logger._debug = !!val;
	};

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	// output
	////////////////////////////////////////////////////////////////////////////
	static log(data) {
		Logger.debug && console.log(data);
	};

	static warn(data) {
		console.warn(data);
	};

	static error(data) {
		console.error(data);
	};
}
