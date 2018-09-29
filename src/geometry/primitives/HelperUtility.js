/**
 * Utility and helper functions for simple cubes
 */
class HelperUtility {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() { }

	// syntax helper
	////////////////////////////////////////////////////////////////////////////
	static assignVert(buff, loc, vert) {
		buff[loc] = vert[0];
		buff[loc+1] = vert[1];
		buff[loc+2] = vert[2];
	}
}
