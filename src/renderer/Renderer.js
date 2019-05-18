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
			antialias: true, //TODO: toggle w/ setting
			premultipliedAlpha: false,
			preserveDrawingBuffer: false //TODO: toggle w/ setting
		};

		this.width = 1;
		this.height = 1;

		this.tickCount = 0;

		this.gl = null;
		this.mvMatrixTemp = mat4.create();
		this.pMatrixTemp = mat4.create();
		this.mvMatrixPixel = mat4.create();
		this.pMatrixPixel = mat4.create();

		this._uiTextStore = null;
		this._uiSurfaceStore = null;
		this._uiLineStore = null;
		this._uiPointStore = null;

		this._shaderMeshSurface = null;
		this._shaderMeshLine = null;
		this._shaderMeshPoint = null;

		this._clearColor = {r: 0.32, g:0.32, b:0.32};

		this.initalize(this.options);
	}

	initalize(options) {
		// shared
		let gl = this.gl = canvas.getContext("webgl2", options);

		gl.enable(gl.CULL_FACE);
		gl.enable(gl.DEPTH_TEST);
		gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, 1.0);
		gl.getExtension("OES_element_index_uint");

		mat4.identity(this.mvMatrixTemp);

		this._uiTextStore = new UITextStore(gl);
		this._uiSurfaceStore = new UISurfaceStore(gl);
		this._uiLineStore = new UILineStore(gl);
		this._uiPointStore = new UIPointStore(gl);

		this.initMeshShaders(gl);
	}

	initMeshShaders(gl) {
		this._shaderMeshSurface = ShaderCompiler.createShader(gl, VtxRepo.BASE_SURFACE, FragRepo.BASE_SURFACE);
		if (!this._shaderMeshSurface) {
			Logger.error("_shaderSurface's broke"); return;
		}
		this.attachToMeshShader(this._shaderMeshSurface);

		this._shaderMeshLine = ShaderCompiler.createShader(gl, VtxRepo.BASE_LINE, FragRepo.BASE_LINE);
		if (!this._shaderMeshLine) {
			Logger.error("_shaderLine's broke"); return;
		}
		this.attachToMeshShader(this._shaderMeshLine);

		this._shaderMeshPoint = ShaderCompiler.createShader(gl, VtxRepo.BASE_POINT, FragRepo.BASE_POINT);
		if (!this._shaderMeshPoint) {
			Logger.error("_shaderPoint's broke"); return;
		}
		this.attachToMeshShader(this._shaderMeshPoint);
	}

	// management
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		this.width = width;
		this.height = height;

		this._canvas.width = this.width;
		this._canvas.height = this.height;
	};

	attachStores(target) {
		target._uiTextStore = this._uiTextStore;
		target._uiSurfaceStore = this._uiSurfaceStore;
		target._uiLineStore = this._uiLineStore;
		target._uiPointStore = this._uiPointStore;
	}

	// shaders
	////////////////////////////////////////////////////////////////////////////
	attachToMeshShader(shader) {
		const gl = this.gl;
		gl.useProgram(shader);

		VertexInfo.attachShaderVertexAttribute(gl, shader);

		shader.pMatrixUniform = gl.getUniformLocation(shader, "pMatrix");
		shader.mvMatrixUniform = gl.getUniformLocation(shader, "mvMatrix");
	}

	// geometry
	////////////////////////////////////////////////////////////////////////////

	// drawing
	////////////////////////////////////////////////////////////////////////////
	render(time, viewports) {
		const gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		this.prepareGlobalUIRender(gl);
		this.renderGlobalUI(gl);

		for (let i = 0, count = viewports.length; i < count; i++) {
			this.prepareViewportRender(gl, viewports[i]._components[0]); //TODO: Be better
			this.renderViewport(gl);
			this.renderViewportUI(gl);
		}
	}

	prepareGlobalUIRender(gl) {
		/*
		params.setViewport(gl);
		params.setPerspectiveMatrix(this.pMatrixTemp);
		params.setModelViewMatrix(this.mvMatrixTemp);

		this.mvMatrixPixel
		this.pMatrixPixel
		*/
	}

	renderGlobalUI(gl) {
		//this.renderUIData(gl);
	}

	renderViewportUI(gl) {
		this.renderUIData(gl);
	}

	renderUIData(gl) {
		let shader;

		//--// Surface



		//--// Edges
		// shader
		shader = this._uiLineStore._shader;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
		gl.vertexAttribPointer(shader.vtxPositionAttribute, 3, gl.FLOAT, false, 24, 0);
		gl.vertexAttribPointer(shader.vtxColorAttribute, 3, gl.FLOAT, false, 24, 12);
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrixTemp);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrixTemp);

		// draw data
		gl.drawArrays(gl.LINES, 0, 6);



		//--// Points
	}
	

	prepareViewportRender(gl, params) {
		params.setViewport(gl);
		params.setPerspectiveMatrix(this.pMatrixTemp);
		params.setModelViewMatrix(this.mvMatrixTemp);
	}

	renderViewport(gl) {
		let shader, meshData;

		//TODO: per object
		//---- Per Object ----//
		meshData = window.MESH._data; //TODO: DON'T
		gl.bindBuffer(gl.ARRAY_BUFFER, meshData._dataBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, meshData._dataArray);


		//--// Surface

		// shader
		shader = this._shaderMeshSurface;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrixTemp);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrixTemp);
		VertexInfo.assignShaderVertexAttribute(gl, shader);

		// draw data
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshData._triBuffer);
		gl.drawElements(gl.TRIANGLES, meshData._triArray.length, gl.UNSIGNED_INT, 0);



		//--// Edges

		// shader
		shader = this._shaderMeshLine;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrixTemp);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrixTemp);
		VertexInfo.assignShaderVertexAttribute(gl, shader);

		// draw data
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshData._edgeBuffer);
		gl.drawElements(gl.LINES, meshData._edgeArray.length, gl.UNSIGNED_INT, 0);



		//--// Points

		// shader
		shader = this._shaderMeshPoint;
		gl.useProgram(shader);

		// uniforms & attributes
		gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrixTemp);
		gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrixTemp);
		VertexInfo.assignShaderVertexAttribute(gl, shader);

		// draw data
		gl.drawArrays(gl.POINTS, 0, meshData._dataArray.length/VertexInfo._stride);
	}
}


