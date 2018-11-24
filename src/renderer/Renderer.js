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

		this.width = 1;
		this.height = 1;

		this.tickCount = 0;

		this.gl = null;
		this.mvMatrix = mat4.create();
		this.pMatrix = mat4.create();

		this._shaderSurface = null;
		this._shaderLine = null;
		this._shaderPoint = null;

		this.initalize(this.options);
	}

	initalize(options) {
		// shared
		let gl = this.gl = canvas.getContext("webgl2", options);

		gl.clearColor(0.32, 0.32, 0.32, 1.0);
		gl.getExtension('OES_element_index_uint');

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
		let dataName;
		const gl = this.gl;

		gl.useProgram(shaderProgram);

		dataName = "data_" + "position";
		shaderProgram[dataName] = gl.getAttribLocation(shaderProgram, dataName);
		gl.enableVertexAttribArray(shaderProgram[dataName]);

		dataName = "data_" + "select";
		shaderProgram[dataName] = gl.getAttribLocation(shaderProgram, dataName);
		gl.enableVertexAttribArray(shaderProgram[dataName]);

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "pMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "mvMatrix");
	}

	// geometry
	////////////////////////////////////////////////////////////////////////////

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
		let shader, dataType, dataName, meshData, atrData;

		viewportControl.setViewport(gl);
		viewportControl.setPerspectiveMatrix(this.pMatrix);
		viewportControl.setModelViewMatrix(this.mvMatrix);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		//---- Per Object ----//
		meshData = window.MESH._data;
		gl.bindBuffer(gl.ARRAY_BUFFER, meshData._dataBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, meshData._dataArray);



		//--// Surface

		// shader
		shader = this._shaderSurface;
		gl.useProgram(shader);

		// uniforms
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		// data types (for loop)
		dataType = "position";
		dataName = "data_" + dataType;
		atrData = meshData._atrDescription[dataType];
		gl.vertexAttribPointer(shader[dataName], atrData.size, gl.FLOAT, false, meshData._strideBytes, atrData.offsetBytes);
		dataType = "select";
		dataName = "data_" + dataType;
		atrData = meshData._atrDescription[dataType];
		gl.vertexAttribPointer(shader[dataName], atrData.size, gl.FLOAT, false, meshData._strideBytes, atrData.offsetBytes);

		// draw data
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshData._triBuffer);
		gl.drawElements(gl.TRIANGLES, meshData._triArray.length, gl.UNSIGNED_INT, 0);



		//--// Edges

		// shader
		shader = this._shaderLine;
		gl.useProgram(shader);

		// uniforms
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		// data types (for loop)
		dataType = "position";
		dataName = "data_" + dataType;
		atrData = meshData._atrDescription[dataType];
		gl.vertexAttribPointer(shader[dataName], atrData.size, gl.FLOAT, false, meshData._strideBytes, atrData.offsetBytes);
		dataType = "select";
		dataName = "data_" + dataType;
		atrData = meshData._atrDescription[dataType];
		gl.vertexAttribPointer(shader[dataName], atrData.size, gl.FLOAT, false, meshData._strideBytes, atrData.offsetBytes);

		// draw data
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshData._edgeBuffer);
		gl.drawElements(gl.LINES, meshData._edgeArray.length, gl.UNSIGNED_INT, 0);



		//--// Points

		// shader
		shader = this._shaderPoint;
		gl.useProgram(shader);

		// uniforms
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		//debugger;

		// data types (for loop)
		dataType = "position";
		dataName = "data_" + dataType;
		atrData = meshData._atrDescription[dataType];
		gl.vertexAttribPointer(shader[dataName], atrData.size, gl.FLOAT, false, meshData._strideBytes, atrData.offsetBytes);
		dataType = "select";
		dataName = "data_" + dataType;
		atrData = meshData._atrDescription[dataType];
		gl.vertexAttribPointer(shader[dataName], atrData.size, gl.FLOAT, false, meshData._strideBytes, atrData.offsetBytes);

		// draw data
		gl.drawArrays(gl.POINTS, 0, meshData._dataArray.length/meshData._stride);



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


