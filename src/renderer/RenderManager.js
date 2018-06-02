/**
 * Manage all rendering tasks and behaviours to allow for optimization and batching
 */
class RenderManager {
	constructor(canvas) {
		this._canvas = canvas;

		this.vtxShaderTemplate =
			"attribute vec3 vtxPosition;" +
			"uniform mat4 mvMatrix;" +
			"uniform mat4 pMatrix;" +
			"void main(void) {" +
			"gl_Position = pMatrix * mvMatrix * vec4(vtxPosition, 1.0);" +
			"}";
		this.fragShaderTemplate =
			"precision mediump float;" +
			"void main(void) {" +
			"vec4 color = vec4(1.0, 0.5, 0.0, 1.0);" +
			"gl_FragColor = color;" +
			"}";

		this.options = {
			depth: true,
			alpha: false,
			stencil: true,
			antialias: true,
			premultipliedAlpha: false,
			preserveDrawingBuffer: false
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
		this.gl = canvas.getContext("webgl", options);
		this.gl.clearColor(0.5, 0.5, 0.5, 1.0);

		this.shader = this.createShader();
		if (!this.shader) {
			console.error("It's broke");
			return;
		}
		this.initShader(this.shader);

		this.initBuffers();

		this.resizeScreen();
		this.drawScene();
	}

	resizeScreen() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this._canvas.width = this.width;
		this._canvas.height = this.height;

		this.gl.viewport(0, 0, this.width, this.height);

		mat4.perspective(this.pMatrix, 45, this.width / this.height, 0.1, 100.0);
	};

	getShader(shaderText, isVtx) {
		var resultShader = this.gl.createShader(
			isVtx ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER
		);

		this.gl.shaderSource(resultShader, shaderText);
		this.gl.compileShader(resultShader);

		if (!this.gl.getShaderParameter(resultShader, this.gl.COMPILE_STATUS)) {
			console.error(this.gl.getShaderInfoLog(resultShader));
			return null;
		}

		return resultShader;
	}

	createShader() {
		var vertexShader = this.getShader(this.vtxShaderTemplate, true);
		var fragmentShader = this.getShader(this.fragShaderTemplate, false);

		if (!(vertexShader && fragmentShader)) {
			return null;
		}

		var shaderProgram = this.gl.createProgram();
		this.gl.attachShader(shaderProgram, vertexShader);
		this.gl.attachShader(shaderProgram, fragmentShader);
		this.gl.linkProgram(shaderProgram);

		if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
			console.error("Could not initialise shaders");
		}

		return shaderProgram;
	}

	initShader(shaderProgram) {
		this.gl.useProgram(shaderProgram);

		shaderProgram.vtxPositionAttribute = this.gl.getAttribLocation(
			shaderProgram,
			"vtxPosition"
		);
		this.gl.enableVertexAttribArray(shaderProgram.vtxPositionAttribute);

		shaderProgram.pMatrixUniform = this.gl.getUniformLocation(shaderProgram, "pMatrix");
		shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(
			shaderProgram,
			"mvMatrix"
		);
	}

	initBuffers() {
		var groupCount = 3;
		var groupSize;

		this.vtxPosBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vtxPosBuffer);
		groupSize = 3;
		var vertices = [];
		while (vertices.length < groupSize * groupCount) {
			vertices.push(Math.random() - 0.5);
		}
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		this.vtxPosBuffer.itemSize = groupSize;
		this.vtxPosBuffer.numItems = groupCount;
	}

	drawScene() {
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, this.mvMatrix, [0.00, 0.00, -3.00]);

		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vtxPosBuffer);
		this.gl.vertexAttribPointer(
			this.shader.vtxPositionAttribute,
			this.vtxPosBuffer.itemSize,
			this.gl.FLOAT,
			false,
			0,
			0
		);

		this.gl.uniformMatrix4fv(this.shader.pMatrixUniform, false, this.pMatrix);
		this.gl.uniformMatrix4fv(this.shader.mvMatrixUniform, false, this.mvMatrix);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vtxPosBuffer.numItems);
	}

	tick() {
		this.drawScene();
		requestAnimationFrame(this.tick.bind(this));
	}
}
