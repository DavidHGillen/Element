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

		this._dataCount = -1;
		this._idMap = [];
	}

	initShader(gl) {}

	getFree() {
		let freeIndex = -1, inspectIndex = 0;

		while(++freeIndex < inspectIndex) {
			if(!this._idMap[inspectIndex]) { break; }
		}

		if(freeIndex >= this._dataCount) {
			throw "Buffer Overflow";
		}

		return freeIndex;
	}

	releaseIndex(id) {
		this._idMap[id] = null;
	}
}