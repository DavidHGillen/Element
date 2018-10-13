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
	 * Temporary Base Shader
	 */
	static get BASE() { return `
		precision highp float;
		void main(void) {
			vec4 color = vec4(1.0, 0.6, 0.2, 1.0);
			gl_FragColor = color;
		}
	`};

	/**
	 * Uniform tinted line / temporary /
	 */
	static get UTL() { return `
		precision highp float;
		uniform vec4 tint;
		void main(void) {
			gl_FragColor = tint;
		}
	`};
}
