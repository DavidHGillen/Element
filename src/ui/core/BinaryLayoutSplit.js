/**
 * Use me to calcualte the quads
 * 
 * 
 * 
 * 
 * Load the configuration file describing the panels requested and their relations.
 * TODO: actually load a file. Currently fabricating configured instances
 */
class BinaryLayoutSplit {

	static get TYPE_ABS() { return "x"; }
	static get TYPE_PER() { return "%"; }

	static get PIN_A() { return "+"; }
	static get PIN_B() { return "-"; }

	// static
	static resizeStep(node, x, y, width, height) {
		let isVert = node.isVertical;
		let splitVal = node.value;
		let outSize, srcVal = isVert ? height : width;
		let widthA = width, heightA = height, widthB = width, heightB = height;
		let xA = x, yA = y, xB = x, yB = y;

		switch (node.type) {
			case BinaryLayoutSplit.TYPE_ABS:
				if (node.pin === BinaryLayoutSplit.PIN_A) {
					outSize = splitVal;
				} else {
					outSize = srcVal - splitVal;
				}
				break;
			case BinaryLayoutSplit.TYPE_PER:
				splitVal /= 100;
				if (node.pin === BinaryLayoutSplit.PIN_A) {
					outSize = Math.floor(srcVal * splitVal);
				} else {
					outSize = Math.floor(srcVal * (1.0 - splitVal));
				}
				break;
		}

		if (isVert) {
			yB = y + outSize;
			heightA = outSize;
			heightB = height - outSize;
		} else {
			xB = x + outSize;
			widthA = outSize;
			widthB = width - outSize;
		}

		if (node.entryA instanceof BinaryLayoutSplit) {
			BinaryLayoutSplit.resizeStep(node.entryA, xA, yA, widthA, heightA);
		} else {
			node.entryA.resize(xA, yA, widthA, heightA);
		}

		if (node.entryB instanceof BinaryLayoutSplit) {
			BinaryLayoutSplit.resizeStep(node.entryB, xB, yB, widthB, heightB);
		} else {
			node.entryB.resize(xB, yB, widthB, heightB);
		}
	}

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(isVertical, info, entryA, entryB) {
		if(typeof info !== "string") { throw "Invalid info param"; }

		this.isVertical = !!isVertical;

		let pin = info.slice(0, 1);
		let value = Math.floor(info.slice(1, -1));
		let type = info.slice(-1);

		switch(type) {
			case BinaryLayoutSplit.TYPE_ABS :
				this.value = Math.max(value, 16);
				break;

			case BinaryLayoutSplit.TYPE_PER :
				this.value = Math.min(Math.max(value, 2), 98);
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

		if(!(entryA instanceof BinaryLayoutSplit || entryA instanceof LayoutZone) ||
			!(entryB instanceof BinaryLayoutSplit || entryB instanceof LayoutZone)) {
			throw "Only splitters or layout blocks";
		}
		this.entryA = entryA;
		this.entryB = entryB;
	}
}
