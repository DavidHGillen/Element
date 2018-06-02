/**
 * Fragment Shader portions
 */
class FragRepo {
	constructor() {
		throw "Singleton!";
	}

	static get BASE() { return `
		precision highp float;
		void main(void) {
			vec4 color = vec4(1.0, 0.6, 0.2, 1.0);
			gl_FragColor = color;
		}
	`};
}
