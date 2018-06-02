/**
 * Handle all the shader input, customization, and compilation
 */
class ShaderCompiler {
	constructor() {
		throw "Singleton!";
	}

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
			console.error("Could not initialise shaders");
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
			console.error(gl.getShaderInfoLog(resultShader));
			return null;
		}

		return resultShader;
	}
}
