/**
 * Used for viewing the scenegraph from a 3D perspective. The near and far plane are the standard clipping planes.
 */
class Camera3D extends AbstractCamera {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this.nearPlane = 0.001;
		this.farPlane = Number.MAX_SAFE_INTEGER;

		this._fov = 40;
	}

	// movement
	////////////////////////////////////////////////////////////////////////////
	moveX(value) {}
	moveY(value) {}
	moveZ(value) {}
	setPos(pos) {}

	// rotation
	////////////////////////////////////////////////////////////////////////////
	rotatePitch(value) {}
	rotateYaw(value) {}
	rotateRoll(value) {}
	fromMatrix(mat) {}
}
