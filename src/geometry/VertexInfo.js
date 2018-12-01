/**
 * Handle all the tracking and configuration of vertex information in the application.
 */
class VertexInfo {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	static init() {
		VertexInfo._stride = 0;
		VertexInfo._strideBytes = 0;

		VertexInfo._atrDescription = {};
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	static makeAttributeDescriptor(property, valueCount) {
		if(VertexInfo._atrDescription[property]){
			Logger.warn(`duplicate property requested ${property}`);
			return;
		}

		let entries = Object.entries(VertexInfo._atrDescription);

		let offset = 0;
		let offsetBytes = 0;
		entries.forEach((arr) => {
			let o = arr[1];
			offset += o.size;
			offsetBytes += o.sizeBytes;
		});

		VertexInfo._atrDescription[property] = {
			offset,
			offsetBytes,
			size: valueCount,
			sizeBytes: valueCount * 4
		};

		VertexInfo._stride = offset + VertexInfo._atrDescription[property].size;
		VertexInfo._strideBytes = offsetBytes + VertexInfo._atrDescription[property].sizeBytes;
	}

	static attachShaderVertexAttribute(gl, shader) {
		for(let dataType in VertexInfo._atrDescription) {
			let dataName = "data_" + dataType;
			shader[dataName] = gl.getAttribLocation(shader, dataName);
			gl.enableVertexAttribArray(shader[dataName]);
		}
	}

	static assignShaderVertexAttribute(gl, shader) {
		for(let dataType in VertexInfo._atrDescription) {
			let dataName = "data_" + dataType;
			let atrData = VertexInfo._atrDescription[dataType];
			gl.vertexAttribPointer(shader[dataName], atrData.size, gl.FLOAT, false, VertexInfo._strideBytes, atrData.offsetBytes);
		}
	}
}
