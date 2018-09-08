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
	moveX(value) {
		this.position[0] += value * 0.2;
	}
	moveY(value) {
		this.position[2] += value * 0.2;
	}
	moveZ(value) {}
	setPos(pos) {}

	// rotation
	////////////////////////////////////////////////////////////////////////////
	rotatePitch(value) {
		quat.rotateX(this.rotQ, this.rotQ, value * 0.0015);
	}
	rotateYaw(value) {
		quat.rotateY(this.rotQ, this.rotQ, value * 0.0015);
	}
	rotateRoll(value) {}
	fromMatrix(mat) {}
}
