/**
 * Used for viewing the scenegraph from a 3D perspective. The near and far plane are the standard clipping planes.
 */
class Camera3D extends AbstractCamera {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this.VEC_FW = vec3.set(vec3.create(), 1, 0, 0);
		this.VEC_RT = vec3.set(vec3.create(), 0, 1, 0);
		this.VEC_UP = vec3.set(vec3.create(), 0, 0, 1);

		this.nearPlane = 0.001;
		this.farPlane = Number.MAX_SAFE_INTEGER;

		this._fov = 40;
	}

	// movement
	////////////////////////////////////////////////////////////////////////////
	moveX(value) {
		vec3.transformQuat(this._tempVec3, vec3.scale(this._tempVec3, this.VEC_FW, value * 0.2), this._invRotQuat);
		vec3.add(this.position, this.position, this._tempVec3);
	}
	moveY(value) {
		vec3.transformQuat(this._tempVec3, vec3.scale(this._tempVec3, this.VEC_UP, value * 0.2), this._invRotQuat);
		vec3.add(this.position, this.position, this._tempVec3);
	}
	moveZ(value) {}
	setPos(pos) {}

	// rotation
	////////////////////////////////////////////////////////////////////////////
	rotatePitch(value) {
		vec3.transformQuat(this._tempVec3, this.VEC_FW, this._invRotQuat);
		quat.setAxisAngle(this._tempQuat, this._tempVec3, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}
	rotateYaw(value) {
		vec3.transformQuat(this._tempVec3, this.VEC_RT, this._invRotQuat);
		quat.setAxisAngle(this._tempQuat, this._tempVec3, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}
	rotateRoll(value) {}
	fromMatrix(mat) {}
}
