/**
 * Used for viewing the scenegraph from a 2D perspective. The near and far plane here represent the slice of the world
 * to view relative to the camera's 3D position.
 */
class Camera2D extends AbstractCamera {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this.nearPlane = Number.MIN_SAFE_INTEGER;
		this.farPlane = Number.MAX_SAFE_INTEGER;
	}

	// ??
	////////////////////////////////////////////////////////////////////////////
}
