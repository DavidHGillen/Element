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
	static get BASE() { return `
		attribute vec3 vtxPosition;
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		void main(void) {
			gl_Position = pMatrix * mvMatrix * vec4(vtxPosition, 1.0);
		}
	`};
}
