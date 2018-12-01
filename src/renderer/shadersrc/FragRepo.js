/**
 * A static repository class of all the Fragment Shader portions available
 */
class FragRepo {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	static get COLOR_UNSELECTED_SURFACE() { return `vec3(0.65)`; }
	static get COLOR_UNSELECTED_LINE() {    return `vec3(0.40)`; }
	static get COLOR_UNSELECTED_POINT() {   return `vec3(0.12)`; }

	static get COLOR_SELECTED_SURFACE() { return `vec3(0.75, 0.35, 0.35)`; }
	static get COLOR_SELECTED_LINE() {    return `vec3(0.62, 0.20, 0.20)`; }
	static get COLOR_SELECTED_POINT() {   return `vec3(0.50, 0.15, 0.15)`; }

	static get STANDARD_HEADER() { return `
		precision highp float;
		${UtilRepo.STANDARD_VARYINGS}
	`; }

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_SURFACE() { return `
		${FragRepo.STANDARD_HEADER}
		void main(void) {
			vec3 finalColor = mix(${FragRepo.COLOR_UNSELECTED_SURFACE}, ${FragRepo.COLOR_SELECTED_SURFACE}, ui_selection);
			gl_FragColor = vec4(finalColor, 1.00);
		}
	`; }

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_LINE() { return `
		${FragRepo.STANDARD_HEADER}
		void main(void) {
			vec3 finalColor = mix(${FragRepo.COLOR_UNSELECTED_LINE}, ${FragRepo.COLOR_SELECTED_LINE}, ui_selection);
			gl_FragColor = vec4(finalColor, 1.00);
		}
	`; }

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_POINT() { return `
		${FragRepo.STANDARD_HEADER}
		void main(void) {
			vec3 finalColor = mix(${FragRepo.COLOR_UNSELECTED_POINT}, ${FragRepo.COLOR_SELECTED_POINT}, ui_selection);
			gl_FragColor = vec4(finalColor, 1.00);
		}
	`; }

	/**
	 * Uniform tinted line / temporary /
	 */
	static get UTL() { return `
		precision highp float;
		varying vec3 tint;
		void main(void) {
			gl_FragColor = vec4(tint, 1.0);
		}
	`; }
}
