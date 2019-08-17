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
		this._bufferOIList = [];	// contiguous shuffled buffer offset indexes
		this._oiLookupMap = [];		// sparse permanent lookup ids
	}

	initShader(gl) {}

	// public
	////////////////////////////////////////////////////////////////////////////
	getFreeID() {
		let freeIndex = -1;

		while(this.oiLookupMap[++freeIndex]) {}

		if(freeIndex >= this._maxOffset) {
			throw "Buffer Overflow";
		}

		this.oiLookupMap[freeIndex] = ++this._lastOI;

		// map points to packed list
		// list points to offset in buffer
		// when adding things to the map point them to the end of the list
		// when removing things from the map collapse the list at target point onwards
		// when collapsing the list, transpose the last element into the hole
		// when transposing the last element use the reverse lookup map to find its external id
		// - pay attention to this reverse id lookup, it solves your issues -

		return freeIndex;
	}

	releaseID(id) {
		let releasedOI = this._oiLookupMap[id];
		this._oiLookupMap[id] = 0;
		

	}

	// private
	////////////////////////////////////////////////////////////////////////////
	// resize buffer
	// compact buffer //// this._lastOI, 
}