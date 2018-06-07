/**
 * Handle all the shader input, customization, and compilation.
 * A dedicated class to support symantic injections and modifications of shaders.
 */
class ShaderCompiler {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	static createShader(gl, vtxSrc, fragSrc) {
		let vertexShader = this.getShader(gl, vtxSrc, true);
		let fragmentShader = this.getShader(gl, fragSrc, false);

		if(!(vertexShader && fragmentShader)) {
			return null;
		}

		let shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			Logger.error("Could not initialise shaders");
		}

		return shaderProgram;
	}

	static getShader(gl, shaderText, isVtx) {
		let resultShader = gl.createShader(
			isVtx ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
		);

		gl.shaderSource(resultShader, shaderText);
		gl.compileShader(resultShader);

		if(!gl.getShaderParameter(resultShader, gl.COMPILE_STATUS)) {
			Logger.error(gl.getShaderInfoLog(resultShader));
			return null;
		}

		return resultShader;
	}
}
