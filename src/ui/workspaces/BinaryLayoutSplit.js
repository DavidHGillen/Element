/**
 * Load the configuration file describing the panels requested and their relations.
 * TODO: actually load a file. Currently fabricating configured instances
 */
class BinaryLayoutSplit {

	static get TYPE_ABS() { return "p"; }
	static get TYPE_PER() { return "%"; }

	static get PIN_A() { return "+"; }
	static get PIN_B() { return "-"; }

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(isVertical, info, entryA, entryB) {
		if(typeof info !== "string") { throw "Invalid info param"; }

		this.isVertical = !!isVertical;

		let pin = info.slice(0, 1);
		let value = info.slice(1, -1);
		let type = info.slice(-1);

		switch(type) {
			case BinaryLayoutSplit.TYPE_ABS :
				this.value = Math.max(value | 0, 16);
				break;

			case BinaryLayoutSplit.TYPE_PER :
				this.value = Math.min(Math.max(value, 0.02), 0.98);
				break;

			default :
				throw "Invalid type";
		}
		this.type = type;

		if(isNaN(this.value)) {
			throw "Bad value";
		}

		if(pin !== BinaryLayoutSplit.PIN_A && pin !== BinaryLayoutSplit.PIN_B) { throw "Missing pin info"; }
		this.pin = pin;

		if(!(entryA instanceof BinaryLayoutSplit || entryA instanceof AbstractPanelController) ||
			!(entryB instanceof BinaryLayoutSplit || entryB instanceof AbstractPanelController)) {
			throw "Only Panels or splitters allowed in splitters";
		}
		this.entryA = entryA;
		this.entryB = entryB;
	}
}
