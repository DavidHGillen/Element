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
		let valueBlock = {};

		valueBlock.select = [0,0,0,0, 0,0,0,0];
		valueBlock.position = [
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
			4,5,0,    5,1,0,    //y+
			3,7,6,    2,3,6,    //y-
		]);

		let edges = new Uint32Array([
			0,1,    1,3,    3,2,    2,0,
			0,4,    1,5,    3,7,    2,6,
			4,5,    5,7,    7,6,    6,4,
		]);

		data.init(gl, valueBlock, tris, edges);

		return data;
	}

	static createWidthCube(width) {
		return CubeHelper.createRadiusCube(width/2);
	}
}
