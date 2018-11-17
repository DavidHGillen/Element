/**
 * Utility and helper functions for simple cubes
 */
class CubeHelper {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() { }

	// util
	////////////////////////////////////////////////////////////////////////////

	// generators
	////////////////////////////////////////////////////////////////////////////
	static createRadiusCube(gl, radius) {
		let data = new MeshData();

		let select = [0,0,0,0, 0,0,0,0];
		let position = [
			radius, radius, radius,      -radius, radius, radius,     // front face
			radius, -radius, radius,     -radius, -radius, radius,

			radius, radius, -radius,     -radius, radius, -radius,    // back face
			radius, -radius, -radius,    -radius, -radius, -radius,
		];

		let tris = new Uint32Array([
			0,1,3,    0,3,2,    //z+
			5,4,6,    5,6,7,    //z-
			1,5,7,    1,7,3,    //x+
			4,0,2,    4,2,6,    //x-
			4,5,1,    4,1,0,    //y+
			6,7,3,    6,3,2,    //y-
		]);

		data.init(gl, {position, select}, tris);

		return data;
	}

	static createWidthCube(width) {
		return CubeHelper.createRadiusCube(width/2);
	}
}
