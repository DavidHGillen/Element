/**
 * A static repository class of all the Vertex Shader portions available
 */
class VtxRepo {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	static get DEPTH_ADJUST_LINE() {  return `vec4(0.0, 0.0, -0.00001, 0.0)`; }
	static get DEPTH_ADJUST_POINT() { return `vec4(0.0, 0.0, -0.00002, 0.0)`; }

	static get STANDARD_HEADER() { return `
		${UtilRepo.STANDARD_VTX_UNIFORMS}
		attribute vec3 data_position;
		attribute float data_select;
		${UtilRepo.STANDARD_VARYINGS}
	`; }

	/**
	 * Temporary Base Shader
	 */
	static get BASE_SURFACE() { return `
		${VtxRepo.STANDARD_HEADER}
		void main(void) {
			ui_selection = clamp(data_select, 0.0, 1.0);
			gl_Position = pMatrix * mvMatrix * vec4(data_position, 1.0);
		}
	`};

	/**
	 * Temporary Base Shader
	 */
	static get BASE_LINE() { return `
		${VtxRepo.STANDARD_HEADER}
		void main(void) {
			ui_selection = clamp(data_select, 0.0, 1.0);
			gl_Position = (pMatrix * mvMatrix * vec4(data_position, 1.0)) + ${VtxRepo.DEPTH_ADJUST_LINE};
		}
	`};

	/**
	 * Temporary Base Shader
	 */
	static get BASE_POINT() { return `
		${VtxRepo.STANDARD_HEADER}
		void main(void) {
			ui_selection = clamp(data_select, 0.0, 1.0);
			gl_Position = (pMatrix * mvMatrix * vec4(data_position, 1.0)) + ${VtxRepo.DEPTH_ADJUST_POINT};
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
