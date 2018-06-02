/**
 * Vertex Shader portions
 */
class VtxRepo {
	constructor() {
		throw "Singleton!";
	}

	static get BASE() { return `
		attribute vec3 vtxPosition;
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		void main(void) {
			gl_Position = pMatrix * mvMatrix * vec4(vtxPosition, 1.0);
		}
	`};
}
