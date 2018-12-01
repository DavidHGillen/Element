/**
 * A static repository class of all the Utilities scripts Shaders may need
 */
class UtilRepo {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		throw "Singleton!";
	}

	// ??
	////////////////////////////////////////////////////////////////////////////
	static get STANDARD_VTX_UNIFORMS() { return `
		uniform mat4 mvMatrix;
		uniform mat4 pMatrix;
	`; }

	static get STANDARD_VARYINGS() { return `
		varying float ui_selection;
	`; }
}
