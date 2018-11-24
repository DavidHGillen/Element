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
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		attribute vec3 data_position;
		attribute float data_select;
		varying float ui_selection;
		void main(void) {
			ui_selection = clamp(data_select, 0.0, 1.0);
			gl_Position = pMatrix * mvMatrix * vec4(data_position, 1.0);
		}
	`};

	/**
	 * Temporary Base Shader
	 */
	static get BASE_LINE() { return `
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		attribute vec3 data_position;
		attribute float data_select;
		varying float ui_selection;
		void main(void) {
			ui_selection = clamp(data_select, 0.0, 1.0);
			gl_Position = (pMatrix * mvMatrix * vec4(data_position, 1.0)) + vec4(0.0, 0.0, -0.00001, 0.0);
		}
	`};

	/**
	 * Temporary Base Shader
	 */
	static get BASE_POINT() { return `
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		attribute vec3 data_position;
		attribute float data_select;
		varying float ui_selection;
		void main(void) {
			ui_selection = clamp(data_select, 0.0, 1.0);
			gl_Position = (pMatrix * mvMatrix * vec4(data_position, 1.0)) + vec4(0.0, 0.0, -0.00002, 0.0);
			gl_PointSize = 6.0;
		}
	`};

	/**
	 * Uniform tinted line / temporary /
	 */
	static get UTL() { return `
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
		attribute vec3 vtxPosition;
		attribute vec3 vtxColor;
		varying vec3 tint;
		void main(void) {
			tint = vtxColor;
			gl_Position = pMatrix * mvMatrix * vec4(vtxPosition, 1.0);
		}
	`};
}
