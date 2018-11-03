/**
 * A static repository class of all the Vertex Shader portions available
 */
class VtxRepo {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	/**
	 * Temporary Base Shader
	 */
	static get BASE_SURFACE() { return `
		attribute vec3 vtxPosition;
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		void main(void) {
			gl_Position = pMatrix * mvMatrix * vec4(vtxPosition, 1.0);
		}
	`};

	/**
	 * Temporary Base Shader
	 */
	static get BASE_LINE() { return `
		attribute vec3 vtxPosition;
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		void main(void) {
			gl_Position = pMatrix * mvMatrix * vec4(vtxPosition + vec3(0.0, 0.0, 0.001), 1.0);
		}
	`};

	/**
	 * Temporary Base Shader
	 */
	static get BASE_POINT() { return `
		attribute vec3 vtxPosition;
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		void main(void) {
			gl_Position = pMatrix * mvMatrix * vec4(vtxPosition + vec3(0.0, 0.0, 0.002), 1.0);
			gl_PointSize = 4.0;
		}
	`};

	/**
	 * Uniform tinted line / temporary /
	 */
	static get UTL() { return `
		attribute vec3 vtxPosition;
		attribute vec3 vtxColor;
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		varying vec3 tint;
		void main(void) {
			tint = vtxColor;
			gl_Position = pMatrix * mvMatrix * vec4(vtxPosition, 1.0);
		}
	`};
}
