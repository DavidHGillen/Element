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

		this._shaderSurface = null;
		this._shaderLine = null;
		this._shaderPoint = null;
		this.vtxPosBuffer = null;

		this.initalize(this.options);
	}

	initalize(options) {
		// shared
		let gl = this.gl = canvas.getContext("webgl2", options);
		gl.clearColor(0.32, 0.32, 0.32, 1.0);

		mat4.identity(this.mvMatrix);

		// shaders
		this._shaderSurface = ShaderCompiler.createShader(gl, VtxRepo.BASE_SURFACE, FragRepo.BASE_SURFACE);
		if (!this._shaderSurface) {
			Logger.error("_shaderSurface's broke");
			return;
		}
		this.attachToShader(this._shaderSurface);

		this._shaderLine = ShaderCompiler.createShader(gl, VtxRepo.BASE_LINE, FragRepo.BASE_LINE);
		if (!this._shaderLine) {
			Logger.error("_shaderLine's broke");
			return;
		}
		this.attachToShader(this._shaderLine);

		this._shaderPoint = ShaderCompiler.createShader(gl, VtxRepo.BASE_POINT, FragRepo.BASE_POINT);
		if (!this._shaderPoint) {
			Logger.error("_shaderPoint's broke");
			return;
		}
		this.attachToShader(this._shaderPoint);
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
		let shader;

		viewportControl.setViewport(gl);
		viewportControl.setPerspectiveMatrix(this.pMatrix);
		viewportControl.setModelViewMatrix(this.mvMatrix);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		shader = this._shaderSurface;
		gl.useProgram(shader);
/**/
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxPosBuffer);
		gl.vertexAttribPointer(
			shader.vtxPositionAttribute,
			this.vtxPosBuffer.itemSize,
			gl.FLOAT, false, 0, 0
		);

		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		gl.drawArrays(gl.TRIANGLES, 0, this.vtxPosBuffer.numItems);/* */
/**/
		shader = this._shaderLine;
		gl.useProgram(shader);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxPosBuffer);
		gl.vertexAttribPointer(
			shader.vtxPositionAttribute,
			this.vtxPosBuffer.itemSize,
			gl.FLOAT, false, 0, 0
		);

		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		gl.drawArrays(gl.LINES, 0, this.vtxPosBuffer.numItems);/* */

		shader = this._shaderPoint;
		gl.useProgram(shader);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxPosBuffer);
		gl.vertexAttribPointer(
			shader.vtxPositionAttribute,
			this.vtxPosBuffer.itemSize,
			gl.FLOAT, false, 0, 0
		);

		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		gl.drawArrays(gl.POINTS, 0, this.vtxPosBuffer.numItems);/* */

		// lines, temp debug
		/////////////////////////////////////
		shader = this._axisShader;

		if(!shader) {
			let vertexShader = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(vertexShader, VtxRepo.UTL);
			gl.compileShader(vertexShader);
			let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(fragmentShader, FragRepo.UTL);
			gl.compileShader(fragmentShader);

			if(!(vertexShader && fragmentShader)) { return null; }

			this._axisShader = shader = gl.createProgram();
			gl.attachShader(shader, vertexShader);
			gl.attachShader(shader, fragmentShader);
			gl.linkProgram(shader);

			if(!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
				console.error("Could not initialise shaders");
			}

			gl.useProgram(shader);
			shader.vtxPositionAttribute = gl.getAttribLocation(shader, "vtxPosition");
			gl.enableVertexAttribArray(shader.vtxPositionAttribute);
			shader.vtxColorAttribute = gl.getAttribLocation(shader, "vtxColor");
			gl.enableVertexAttribArray(shader.vtxColorAttribute);

			shader.pMatrixUniform = gl.getUniformLocation(shader, "pMatrix");
			shader.mvMatrixUniform = gl.getUniformLocation(shader, "mvMatrix");

			shader.buffer = gl.createBuffer();
			shader.data = new Float32Array([
				0,0,0,  1.0,0.0,0.0,        1,0,0,  1.0,0.0,0.0,
				0,0,0,  0.0,1.0,0.0,        0,1,0,  0.0,1.0,0.0,
				0,0,0,  0.0,0.0,1.0,        0,0,1,  0.0,0.0,1.0
			]);
			gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
			gl.bufferData(gl.ARRAY_BUFFER, shader.data, gl.STATIC_DRAW);
		} else {
			gl.useProgram(shader);
			gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
		}

		gl.vertexAttribPointer(shader.vtxPositionAttribute, 3, gl.FLOAT, false, 24, 0);
		gl.vertexAttribPointer(shader.vtxColorAttribute, 3, gl.FLOAT, false, 24, 12);
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		gl.disable(gl.DEPTH_TEST);
		gl.drawArrays(gl.LINES, 0, 6);
		gl.enable(gl.DEPTH_TEST);
	}
}


