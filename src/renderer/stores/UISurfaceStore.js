/**
 * Hold all references to panel backgrounds, details, and shapes to be rendered and convert them into renderable info
 */
class UISurfaceStore {
	constructor(gl) {
		this._bufferStride = 6;
		this._dataCount = 100;

		this._shader = null;
		this._buffer = gl.createBuffer();
		this._data = new Float32Array(this._dataCount * this._bufferStride);

		this.initShader(gl);
	}

	initShader(gl) {
		let shader = this._shader = ShaderCompiler.createShader(gl, VtxRepo.UTL, FragRepo.UTL);
		if (!shader) {
			Logger.error("UI Surface Shader failed"); return;
		}

		gl.useProgram(shader);

		shader.vtxPositionAttribute = gl.getAttribLocation(shader, "vtxPosition");
		gl.enableVertexAttribArray(shader.vtxPositionAttribute);
		shader.vtxColorAttribute = gl.getAttribLocation(shader, "vtxColor");
		gl.enableVertexAttribArray(shader.vtxColorAttribute);

		shader.pMatrixUniform = gl.getUniformLocation(shader, "pMatrix");
		shader.mvMatrixUniform = gl.getUniformLocation(shader, "mvMatrix");

		//TODO: when
		gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this._data, gl.DYNAMIC_DRAW);
	}

	defineRect(gl, rect, color) {
		this._data.set([
			200, 200,   1,        color.r, color.g, color.b,
			  0, 200,   1,        color.r, color.g, color.b,
			  0,   0,   1,        color.r, color.g, color.b,

			  0,   0,   1,        color.r, color.g, color.b,
			200,   0,   1,        color.r, color.g, color.b,
			200, 200,   1,        color.r, color.g, color.b
		], 0);

		//TODO: when
		gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this._data, gl.DYNAMIC_DRAW);
	}
}