/**
 * Manage all rendering tasks and behaviours to allow for optimization and batching
 * Meshes will track their own data but be registered here to be batch updated,
 * I.E. rendering the top/left/front/3D views without unloading the verticies.
 * 
 * 
 * 
 * TODO: establish some form of mark/sweep and render heirarchy. Take configuration responsibilities away from the panels.
 * This requires further classification and goruping of the objects to be rendered.
 * Things should subit themselves to the renderer, and then the renderer perform those actions.
 * Caches, 
 * 
 * Render the world, ui exist in world, content exists in world.
 * Panels are just quads to be rendered with whatever camera works best
 * 
 */
class Renderer {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas, options) {
		this._canvas = canvas;

		this.options = {
			depth: true,
			alpha: false,
			stencil: true,
			antialias: true,
			premultipliedAlpha: false,
			preserveDrawingBuffer: false //toggle w/ setting
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

		this._clearColor = {r: 0.32, g:0.32, b:0.32};

		//buffer list

		this.initalize(this.options);
	}

	initalize(options) {
		// shared
		let gl = this.gl = canvas.getContext("webgl2", options);

		gl.enable(gl.CULL_FACE);
		gl.enable(gl.DEPTH_TEST);
		gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, 1.0);
		gl.getExtension("OES_element_index_uint");

		mat4.identity(this.mvMatrix);

		// ui shaders
		this._axisShader = ShaderCompiler.createShader(gl, VtxRepo.UTL, FragRepo.UTL);
		if (!this._axisShader) {
			Logger.error("_axisShader's broke"); return;
		}
		this.attachToAxisShader(this._axisShader);

		// mesh shaders
		this._shaderSurface = ShaderCompiler.createShader(gl, VtxRepo.BASE_SURFACE, FragRepo.BASE_SURFACE);
		if (!this._shaderSurface) {
			Logger.error("_shaderSurface's broke"); return;
		}
		this.attachToMeshShader(this._shaderSurface);

		this._shaderLine = ShaderCompiler.createShader(gl, VtxRepo.BASE_LINE, FragRepo.BASE_LINE);
		if (!this._shaderLine) {
			Logger.error("_shaderLine's broke"); return;
		}
		this.attachToMeshShader(this._shaderLine);

		this._shaderPoint = ShaderCompiler.createShader(gl, VtxRepo.BASE_POINT, FragRepo.BASE_POINT);
		if (!this._shaderPoint) {
			Logger.error("_shaderPoint's broke"); return;
		}
		this.attachToMeshShader(this._shaderPoint);
	}

	// management
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		this.width = width;
		this.height = height;

		this._canvas.width = this.width;
		this._canvas.height = this.height;
	};

	// shaders
	////////////////////////////////////////////////////////////////////////////
	attachToMeshShader(shader) {
		const gl = this.gl;
		gl.useProgram(shader);

		VertexInfo.attachShaderVertexAttribute(gl, shader);

		shader.pMatrixUniform = gl.getUniformLocation(shader, "pMatrix");
		shader.mvMatrixUniform = gl.getUniformLocation(shader, "mvMatrix");
	}

	attachToAxisShader(shader) {
		const gl = this.gl;
		gl.useProgram(shader);

		shader.vtxPositionAttribute = gl.getAttribLocation(shader, "vtxPosition");
		gl.enableVertexAttribArray(shader.vtxPositionAttribute);
		shader.vtxColorAttribute = gl.getAttribLocation(shader, "vtxColor");
		gl.enableVertexAttribArray(shader.vtxColorAttribute);

		shader.pMatrixUniform = gl.getUniformLocation(shader, "pMatrix");
		shader.mvMatrixUniform = gl.getUniformLocation(shader, "mvMatrix");

		// TEMP, should probably be on the ?scene?
		shader.buffer = gl.createBuffer();
		shader.data = new Float32Array([
			0,0,0,  1.0,0.0,0.0,        1,0,0,  1.0,0.0,0.0,
			0,0,0,  0.0,1.0,0.0,        0,1,0,  0.0,1.0,0.0,
			0,0,0,  0.0,0.0,1.0,        0,0,1,  0.0,0.0,1.0
		]);
		gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, shader.data, gl.STATIC_DRAW);
	}

	// geometry
	////////////////////////////////////////////////////////////////////////////

	// drawing
	////////////////////////////////////////////////////////////////////////////
	//TODO make sure we pay attention to the fact we're drawing an object as much as possible before swapping data
	drawPanel(panel) {
		let i, arr, count;

		arr = panel._components;
		for(i = 0, count = arr.length; i<count; i++) {
			this.drawComponent(arr[i]);
		}

		arr = panel._panels;
		for(i = 0, count = arr.length; i<count; i++) {
			this.drawPanel(arr[i]);
		}
	}

	drawComponent(component) {
		if(component instanceof ViewportScreen) {
			this.drawViewport(component);
		}
	}

	drawViewport(renderSrc) {
		const gl = this.gl;
		let shader, meshData;

		renderSrc.setViewport(gl);
		renderSrc.setPerspectiveMatrix(this.pMatrix);
		renderSrc.setModelViewMatrix(this.mvMatrix);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		//---- Per Object ----//
		meshData = window.MESH._data;
		gl.bindBuffer(gl.ARRAY_BUFFER, meshData._dataBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, meshData._dataArray);



		//--// Surface

		// shader
		shader = this._shaderSurface;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);
		VertexInfo.assignShaderVertexAttribute(gl, shader);

		// draw data
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshData._triBuffer);
		gl.drawElements(gl.TRIANGLES, meshData._triArray.length, gl.UNSIGNED_INT, 0);



		//--// Edges

		// shader
		shader = this._shaderLine;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);
		VertexInfo.assignShaderVertexAttribute(gl, shader);

		// draw data
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshData._edgeBuffer);
		gl.drawElements(gl.LINES, meshData._edgeArray.length, gl.UNSIGNED_INT, 0);



		//--// Points

		// shader
		shader = this._shaderPoint;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);
		VertexInfo.assignShaderVertexAttribute(gl, shader);

		// draw data
		gl.drawArrays(gl.POINTS, 0, meshData._dataArray.length/VertexInfo._stride);



		//--// UI Lines

		// shader
		shader = this._axisShader;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
		gl.vertexAttribPointer(shader.vtxPositionAttribute, 3, gl.FLOAT, false, 24, 0);
		gl.vertexAttribPointer(shader.vtxColorAttribute, 3, gl.FLOAT, false, 24, 12);
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);

		// draw data
		gl.drawArrays(gl.LINES, 0, 6);
	}
}


