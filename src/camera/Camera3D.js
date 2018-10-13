/**
 * Used for viewing the scenegraph from a 3D perspective. The near and far plane are the standard clipping planes.
 */
class Camera3D extends AbstractCamera {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this.VEC_FW = vec3.set(vec3.create(), 1, 0, 0);
		this.VEC_UP = vec3.set(vec3.create(), 0, 0, 1);
		this.VEC_RT = vec3.set(vec3.create(), 0, 1, 0);

		this.nearPlane = 0.001;
		this.farPlane = Number.MAX_SAFE_INTEGER;

		this._fov = 40;
		this._invRotQ = quat.create();
	}

	// movement
	////////////////////////////////////////////////////////////////////////////
	moveX(value) {
		quat.invert(this._invRotQ, this.rotQ);
		vec3.transformQuat(vec3.scale(this._tempV3, this.VEC_FW, value * 0.2), this._tempV3, this._invRotQ);
		vec3.add(this.position, this.position, this._tempV3);
		//this.position[0] += value * 0.2;
	}
	moveY(value) {
		quat.invert(this._invRotQ, this.rotQ);
		vec3.transformQuat(vec3.scale(this._tempV3, this.VEC_UP, value * 0.2), this._tempV3, this._invRotQ);
		vec3.add(this.position, this.position, this._tempV3);
		//this.position[2] += value * 0.2;
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
