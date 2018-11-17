/**
 * A static repository class of all the Fragment Shader portions available
 */
class FragRepo {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_SURFACE() { return `
		precision highp float;
		varying float ui_selection;
		void main(void) {
			vec3 finalColor = mix(vec3(1.0, 0.0, 0.0), vec3(0.65), ui_selection);
			gl_FragColor = vec4(finalColor, 1.00);
		}
	`};

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_LINE() { return `
		precision highp float;
		varying float ui_selection;
		void main(void) {
			vec3 finalColor = mix(vec3(0.0, 1.0, 0.0), vec3(0.06), ui_selection);
			gl_FragColor = vec4(finalColor, 1.00);
		}
	`};

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_POINT() { return `
		precision highp float;
		varying float ui_selection;
		void main(void) {
			vec3 finalColor = mix(vec3(0.0, 0.0, 1.0), vec3(0.12), ui_selection);
			gl_FragColor = vec4(finalColor, 1.00);
		}
	`};

	/**
	 * Uniform tinted line / temporary /
	 */
	static get UTL() { return `
		precision highp float;
		varying vec3 tint;
		void main(void) {
			gl_FragColor = vec4(tint, 1.0);
		}
	`};
}
