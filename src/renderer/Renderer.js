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
	constructor(canvas, layout) {
		this._canvas = canvas;
		this._layout = layout;

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

		this.tickCount = 0;

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
	}

	// management
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		this.width = width;
		this.height = height;

		this._canvas.width = this.width;
		this._canvas.height = this.height;
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

		shaderProgram.vtxPositionAttribute = gl.getAttribLocation(shaderProgram, "vtxPosition");
		gl.enableVertexAttribArray(shaderProgram.vtxPositionAttribute);

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "pMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "mvMatrix");

		mat4.identity(this.mvMatrix);
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
		let displays = this._layout._displays;
		let count = displays.length;

		for(let i=0; i<count; i++) {
			let display = displays[i];
			if(!display.dirty){ continue; }

			this.drawViewport(display);

			//display.dirty = false;
		}
	}

	drawViewport(display) {
		const gl = this.gl;
		const shader = this.shader;

		mat4.perspective(this.pMatrix, 45, display.width / display.height, 0.001, 1000.0);
		gl.viewport(display.x, display.y, display.width, display.height);

		mat4.translate(this.mvMatrix, this.mvMatrix, [
			window.INPUT._keyMap[65]?0.20:(window.INPUT._keyMap[68]?-0.20:0.00),
			0.00,
			window.INPUT._keyMap[87]?0.20:(window.INPUT._keyMap[83]?-0.20:0.00)
		]);
		mat4.rotateY(this.mvMatrix, this.mvMatrix, window.INPUT._panX/100); window.INPUT._panX = 0;
		mat4.rotateX(this.mvMatrix, this.mvMatrix, window.INPUT._panY/100); window.INPUT._panY = 0;

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxPosBuffer);
		gl.vertexAttribPointer(
			shader.vtxPositionAttribute,
			this.vtxPosBuffer.itemSize,
			gl.FLOAT, false, 0, 0
		);

		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		gl.drawArrays(gl.TRIANGLES, 0, this.vtxPosBuffer.numItems);
	}
}

