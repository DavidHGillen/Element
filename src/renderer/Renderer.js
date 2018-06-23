/**
 * Manage all rendering tasks and behaviours to allow for optimization and batching
 * Meshes will track their own data but be registered here to be batch updated,
 * I.E. rendering the top/left/front/3D views without unloading the verticies.
 * All layout is guarenteed to be Axis Aligned Rectangles so viewports are used
 * extensively for outputting updates to only the necessary displays.
 */
class Renderer {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas) {
		this._canvas = canvas;

		this.options = {
			depth: true,
			alpha: false,
			stencil: true,
			antialias: true,
			premultipliedAlpha: false,
			preserveDrawingBuffer: true
		};

		this.width;
		this.height;

		this.gl = null;
		this.mvMatrix = mat4.create();
		this.pMatrix = mat4.create();

		this.shader = null;
		this.vtxPosBuffer = null;

		this.initalize(this.options);
	}

	initalize(options) {
		let gl = this.gl = canvas.getContext("webgl2", options);
		gl.clearColor(0.5, 0.5, 0.5, 1.0);

		this.shader = ShaderCompiler.createShader(gl, VtxRepo.BASE, FragRepo.BASE);
		if (!this.shader) {
			Logger.error("It's broke");
			return;
		}
		this.attachToShader(this.shader);

		this.resizeScreen();
	}

	// management
	////////////////////////////////////////////////////////////////////////////
	resizeScreen() {
		const gl = this.gl;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this._canvas.width = this.width;
		this._canvas.height = this.height;

		gl.viewport(0, 0, this.width, this.height);

		mat4.perspective(this.pMatrix, 45, this.width / this.height, 0.1, 100.0);
	};

	tick() {
		this.drawScene();
		requestAnimationFrame(this.tick.bind(this));
	}

	// shaders
	////////////////////////////////////////////////////////////////////////////
	attachToShader(shaderProgram) {
		const gl = this.gl;

		gl.useProgram(shaderProgram);

		shaderProgram.vtxPositionAttribute = gl.getAttribLocation(
			shaderProgram,
			"vtxPosition"
		);
		gl.enableVertexAttribArray(shaderProgram.vtxPositionAttribute);

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "pMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(
			shaderProgram,
			"mvMatrix"
		);
	}

	// geometry
	////////////////////////////////////////////////////////////////////////////
	initBuffers(data) {
		const gl = this.gl;
		// MOVE TO MESH DATA
		this.vtxPosBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxPosBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
		this.vtxPosBuffer.itemSize = 3;
		this.vtxPosBuffer.numItems = data.length / this.vtxPosBuffer.itemSize;
	}

	// drawing
	////////////////////////////////////////////////////////////////////////////
	drawScene() {
		const gl = this.gl;

		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, this.mvMatrix, [0.00, 0.00, 0.00]);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxPosBuffer);
		gl.vertexAttribPointer(
			this.shader.vtxPositionAttribute,
			this.vtxPosBuffer.itemSize,
			gl.FLOAT,
			false,
			0,
			0
		);

		gl.uniformMatrix4fv(this.shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(this.shader.mvMatrixUniform, false, this.mvMatrix);

		gl.drawArrays(gl.TRIANGLES, 0, this.vtxPosBuffer.numItems);
	}
}
