/**
 * Hold references to thin lines and convert them into renderable info
 */
class AbstractStore {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(gl) {
		this._gl = gl;

		this._bufferStride = -1;

		this._shader = null;
		this._buffer = null;
		this._data = null;

		this._maxOI = 0;
		this._lastOI = 0;
		this._lastLookup = 0;
		this._oiLookupMap = [];		// sparse permanent lookup ids
		this._bufferLookList = [];	// contiguous shuffled lookup ids
	}

	initShader(gl) {
		throw "Abstract funcion";
	}

	// public
	////////////////////////////////////////////////////////////////////////////
	getFreeID() {
		let freeIndex = -1;

		while(this._oiLookupMap[++freeIndex]) {}

		if(freeIndex >= this._maxOffset) {
			throw "Buffer Overflow";
		}

		this._bufferLookList[this._lastOI] = freeIndex;
		this._oiLookupMap[freeIndex] = ++this._lastOI;

		return freeIndex;
	}

	releaseID(id) {
		// clear the current element
		let releasedOI = this._oiLookupMap[id];
		if(releasedOI == 0){ return; }
		this._oiLookupMap[id] = 0;

		--this._lastOI;
		if(releasedOI <= this._lastOI) {
			// move the end into the empty spot
			let shiftedOI = this._bufferLookList[this._lastOI];
			this._oiLookupMap[shiftedOI] = releasedOI;
			this._bufferLookList[releasedOI-1] = shiftedOI;
		}
	}

	// private
	////////////////////////////////////////////////////////////////////////////
}