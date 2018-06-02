/**
 * Console.log
 */
class Logger {
	constructor() {
		throw "Singleton!";
	}

	static get debug() {
		return !!Logger._debug;
	};
	static set debug(val) {
		Logger._debug = !!val;
	};

	static log(data) {
		Logger.debug && console.log(data);
	};

	static warn(data) {
		Logger.debug && console.warn(data);
	};

	static error(data) {
		console.error(data);
	};
}
