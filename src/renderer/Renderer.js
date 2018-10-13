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

			this.drawDisplay(display);

			//display.dirty = false;
		}
	}

	drawDisplay(display) {
		let count = display._controls.length;

		for(let i=0; i<count; i++) {
			let control = display._controls[i];

			this.drawViewport(control);
		}
	}

	drawViewport(viewportControl) {
		const gl = this.gl;
		const shader = this.shader;

		viewportControl.setViewport(gl);
		viewportControl.setPerspectiveMatrix(this.pMatrix);
		viewportControl.setModelViewMatrix(this.mvMatrix);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.useProgram(shader);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxPosBuffer);
		gl.vertexAttribPointer(
			shader.vtxPositionAttribute,
			this.vtxPosBuffer.itemSize,
			gl.FLOAT, false, 0, 0
		);

		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		gl.drawArrays(gl.TRIANGLES, 0, this.vtxPosBuffer.numItems);

		// lines, temp debug
		/////////////////////////////////////
		let shaderProgram = this._axisShader;

		if(!shaderProgram) {
			let vertexShader = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(vertexShader, VtxRepo.BASE);
			gl.compileShader(vertexShader);
			let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(fragmentShader, FragRepo.UTL);
			gl.compileShader(fragmentShader);

			if(!(vertexShader && fragmentShader)) { return null; }

			this._axisShader = shaderProgram = gl.createProgram();
			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);

			if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
				console.error("Could not initialise shaders");
			}

			gl.useProgram(shaderProgram);
			shaderProgram.vtxPositionAttribute = gl.getAttribLocation(shaderProgram, "vtxPosition");
			gl.enableVertexAttribArray(shaderProgram.vtxPositionAttribute);

			shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "pMatrix");
			shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "mvMatrix");
			shaderProgram.tintLoc = gl.getUniformLocation(shaderProgram, "tint");

			shaderProgram.buffer = gl.createBuffer();
			shaderProgram.data = new Float32Array([0,0,0, 1,0,0,		0,0,0, 0,1,0,		0,0,0, 0,0,1]);
			gl.bindBuffer(gl.ARRAY_BUFFER, shaderProgram.buffer);
			gl.bufferData(gl.ARRAY_BUFFER, shaderProgram.data, gl.STATIC_DRAW);
		} else {
			gl.useProgram(shaderProgram);
			gl.bindBuffer(gl.ARRAY_BUFFER, shaderProgram.buffer);
		}

		gl.vertexAttribPointer(shaderProgram.vtxPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);

		gl.disable(gl.DEPTH_TEST);
		gl.uniform4f(shaderProgram.tintLoc, 255, 0, 0, 255);
		gl.drawArrays(gl.LINES, 0, 2);

		gl.uniform4f(shaderProgram.tintLoc, 0, 255, 0, 255);
		gl.drawArrays(gl.LINES, 2, 2);

		gl.uniform4f(shaderProgram.tintLoc, 0, 0, 255, 255);
		gl.drawArrays(gl.LINES, 4, 2);
		gl.enable(gl.DEPTH_TEST);
	}
}


