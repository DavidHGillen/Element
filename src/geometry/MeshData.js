/**
 * Wrapper class for all the associated information in a mesh
 */
class MeshData extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._stacks = [];
		this._faces = [];
		this._edges = [];

		this._dataArray = null;
		this._dataBuffer = null;

		this._triArray = null;
		this._triBuffer = null;
		this._edgeArray = null;
		this._edgeBuffer = null;

		this._stride = 0;
		this._strideBytes = 0;

		this._atrDescription = {};
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	init(gl, data, tris) {
		this.makeAttributeDescriptor("position", 3);

		let triCount = tris.length / 3;
		let dataCount = data.length / this._stride;
		if(!tris || !data){ Logger.error("No mesh init data"); }
		if(triCount !== Math.floor(triCount) || dataCount !== Math.floor(dataCount)){ Logger.error("Mismatch in triangle data"); }

		this._dataArray = data;
		this._triArray = tris;

		this._dataBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this._dataBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this._dataArray, gl.DYNAMIC_DRAW);

		this._triBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._triBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._triArray, gl.DYNAMIC_DRAW);

		//TEMP DEBUG CODE
		//TEMP DEBUG CODE
		//TEMP DEBUG CODE
		this._edgeBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._edgeBuffer);
		let tempArr = [];
		for(let i=0; i < tris.length; i+=3) {
			tempArr.push(tris[i]);      tempArr.push(tris[i+1]);
			tempArr.push(tris[i+1]);    tempArr.push(tris[i+2]);
			tempArr.push(tris[i+2]);    tempArr.push(tris[i]);
		}
		this._edgeArray = new Uint32Array(tempArr);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._edgeArray, gl.DYNAMIC_DRAW);
	}

	// utility
	////////////////////////////////////////////////////////////////////////////
	makeAttributeDescriptor(property, valueCount) {
		if(this._atrDescription[property]){ Logger.warn(`duplicate property requested ${property}`); return; }

		let entries = Object.entries(this._atrDescription);

		let offset = 0;
		let offsetBytes = 0;
		entries.forEach((arr) => {
			let o = arr[1];
			offset += o.size;
			offsetBytes += o.sizeBytes;
		});

		this._atrDescription[property] = {
			offset,
			offsetBytes,
			size: valueCount,
			sizeBytes: valueCount * 8
		};

		this._stride = offset + valueCount;
		this._strideBytes = 0;//offsetBytes + valueCount * 8;
	}
}
