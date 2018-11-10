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
		void main(void) {
			gl_FragColor = vec4(0.50, 0.50, 0.50, 1.00);
		}
	`};

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_LINE() { return `
		precision highp float;
		void main(void) {
			gl_FragColor = vec4(1.00, 0.65, 0.35, 1.00);
		}
	`};

	/**
	 * Temporary Base Surface Shader
	 */
	static get BASE_POINT() { return `
		precision highp float;
		void main(void) {
			gl_FragColor = vec4(0.92, 0.92, 0.92, 1.0);
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
