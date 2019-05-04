/**
 * Hold all references to thin lines and convert them into renderable info
 */
class UILineStore {
	constructor(gl) {
		this.gl = gl;

		this._shader = null;
		this._buffer = gl.createBuffer();
		this._data = new Float32Array([
			0, 0, 0, 1.0, 0.0, 0.0, 1, 0, 0, 1.0, 0.0, 0.0,
			0, 0, 0, 0.0, 1.0, 0.0, 0, 1, 0, 0.0, 1.0, 0.0,
			0, 0, 0, 0.0, 0.0, 1.0, 0, 0, 1, 0.0, 0.0, 1.0
		]);

		this.initShader();
	}

	initShader() {
		const gl = this.gl;

		let shader = this._shader = ShaderCompiler.createShader(gl, VtxRepo.UTL, FragRepo.UTL);
		if (!shader) {
			Logger.error("UI Line Shader failed"); return;
		}

		shader.buffer = this._buffer;
		shader.data = this._data;
		
		gl.useProgram(shader);

		shader.vtxPositionAttribute = gl.getAttribLocation(shader, "vtxPosition");
		gl.enableVertexAttribArray(shader.vtxPositionAttribute);
		shader.vtxColorAttribute = gl.getAttribLocation(shader, "vtxColor");
		gl.enableVertexAttribArray(shader.vtxColorAttribute);

		shader.pMatrixUniform = gl.getUniformLocation(shader, "pMatrix");
		shader.mvMatrixUniform = gl.getUniformLocation(shader, "mvMatrix");
		gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, shader.data, gl.STATIC_DRAW);
	}
}