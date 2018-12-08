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
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	init(gl, data, tris, edges) {
		let combinedLength = 0;
		let vertexCount = 0;

		for(let n in data) {
			let o = data[n];
			//TODO: check that all data match in size and type
			combinedLength += o.length;
		}

		vertexCount = (combinedLength * 1.5) | 0;
		this._triArray = tris;
		this._edgeArray = edges;
		this._dataArray = new Float32Array(vertexCount);

		for(let i=0; i<combinedLength/VertexInfo._stride; i++) {
			for(let n in data) {
				let dataSrc = data[n];
				let atrDescriptor = VertexInfo._atrDescription[n];

				let srcOffset = atrDescriptor.size * i;
				let outputOffset = atrDescriptor.offset + VertexInfo._stride * i;

				let subData = dataSrc.slice(srcOffset, srcOffset + atrDescriptor.size);
				this._dataArray.set(subData, outputOffset);
			}
		}

		this._dataBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this._dataBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this._dataArray, gl.DYNAMIC_DRAW);

		this._triBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._triBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._triArray, gl.DYNAMIC_DRAW);

		this._edgeBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._edgeBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._edgeArray, gl.DYNAMIC_DRAW);
	}

	// utility
	////////////////////////////////////////////////////////////////////////////
}
