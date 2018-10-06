/**
 * Utility and helper functions for simple cubes
 */
class CubeHelper {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() { }

	// util
	////////////////////////////////////////////////////////////////////////////
	static assignPositionViaPC(pos, pc) {
		let index = 0;

		//z+
		HelperUtility.assignVert(pos, index++ * 3, pc[0]);
		HelperUtility.assignVert(pos, index++ * 3, pc[1]);
		HelperUtility.assignVert(pos, index++ * 3, pc[3]);

		HelperUtility.assignVert(pos, index++ * 3, pc[0]);
		HelperUtility.assignVert(pos, index++ * 3, pc[3]);
		HelperUtility.assignVert(pos, index++ * 3, pc[2]);

		//z-
		HelperUtility.assignVert(pos, index++ * 3, pc[5]);
		HelperUtility.assignVert(pos, index++ * 3, pc[4]);
		HelperUtility.assignVert(pos, index++ * 3, pc[6]);

		HelperUtility.assignVert(pos, index++ * 3, pc[5]);
		HelperUtility.assignVert(pos, index++ * 3, pc[6]);
		HelperUtility.assignVert(pos, index++ * 3, pc[7]);

		//x+
		HelperUtility.assignVert(pos, index++ * 3, pc[1]);
		HelperUtility.assignVert(pos, index++ * 3, pc[5]);
		HelperUtility.assignVert(pos, index++ * 3, pc[7]);

		HelperUtility.assignVert(pos, index++ * 3, pc[1]);
		HelperUtility.assignVert(pos, index++ * 3, pc[7]);
		HelperUtility.assignVert(pos, index++ * 3, pc[3]);

		//x-
		HelperUtility.assignVert(pos, index++ * 3, pc[4]);
		HelperUtility.assignVert(pos, index++ * 3, pc[0]);
		HelperUtility.assignVert(pos, index++ * 3, pc[2]);

		HelperUtility.assignVert(pos, index++ * 3, pc[4]);
		HelperUtility.assignVert(pos, index++ * 3, pc[2]);
		HelperUtility.assignVert(pos, index++ * 3, pc[6]);

		//y+
		HelperUtility.assignVert(pos, index++ * 3, pc[4]);
		HelperUtility.assignVert(pos, index++ * 3, pc[5]);
		HelperUtility.assignVert(pos, index++ * 3, pc[1]);

		HelperUtility.assignVert(pos, index++ * 3, pc[4]);
		HelperUtility.assignVert(pos, index++ * 3, pc[1]);
		HelperUtility.assignVert(pos, index++ * 3, pc[0]);

		//y-
		HelperUtility.assignVert(pos, index++ * 3, pc[6]);
		HelperUtility.assignVert(pos, index++ * 3, pc[7]);
		HelperUtility.assignVert(pos, index++ * 3, pc[3]);

		HelperUtility.assignVert(pos, index++ * 3, pc[6]);
		HelperUtility.assignVert(pos, index++ * 3, pc[3]);
		HelperUtility.assignVert(pos, index++ * 3, pc[2]);
	}

	// generators
	////////////////////////////////////////////////////////////////////////////
	static getRadiusCube(radius) {
		let data = new MeshData();

		let pc = [ // point cloud
			[radius, radius, radius], [-radius, radius, radius],
			[radius, -radius, radius], [-radius, -radius, radius],

			[radius, radius, -radius], [-radius, radius, -radius],
			[radius, -radius, -radius], [-radius, -radius, -radius],
		];

		// triangles * vertecies * values
		let posBuffer = data._buffers.position = new Float32Array(12 * 3 * 3);
		CubeHelper.assignPositionViaPC(posBuffer, pc);

		return data;
	}
}
