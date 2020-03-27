/**
 * Used for viewing the scenegraph from a 3D perspective. The near and far plane are the standard clipping planes.
 */
class Camera3D extends AbstractCamera {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this.VEC_XP = vec3.set(vec3.create(), 1, 0, 0);
		this.VEC_YP = vec3.set(vec3.create(), 0, 1, 0);
		this.VEC_ZP = vec3.set(vec3.create(), 0, 0, 1);

		this.nearPlane = 0.01;
		this.farPlane = 1000;

		this._fov = 1.0472; // vertical

		//TEMP TESTING
		//this.setRot(quat.fromValues(-0.21770718693733215, -0.505333662033081, -0.7667576670646667, 0.3305547535419464));
		//this.setPos(vec3.fromValues(-2.6720614433288574, -2.5243263244628906, -1.5776522159576416));
		//this.setPos(vec3.fromValues(-6, 0, -6));
	}

	// view matricies
	////////////////////////////////////////////////////////////////////////////
	updateMatricies(pMatrix, mvMatrix, aspectRatio) {
		//TODO: standardize aspect ratio, clipping, and fov adjustments to a consistent api
		let ar = aspectRatio;
		let fv = this._fov;
		let scale = this.farPlane / (this.farPlane - this.nearPlane);
		let shift = (this.farPlane * this.nearPlane) / (this.farPlane - this.nearPlane);
		mat4.set(pMatrix
			,      0,      0,  scale,      1
			,      1,      0,      0,      0
			,      0,      1,      0,      0
			,      0,      0, -shift,      0
		);

		mat4.fromQuat(mvMatrix, this.rotQuat);
		mat4.translate(mvMatrix, mvMatrix, this.position);

		/*
		let ppp = vec3.create();
		for(let i = 0; i <= 1; i += 0.01) {
			vec3.set(ppp, i,0,0);
			vec3.transformMat4(ppp, ppp, pMatrix);
			console.log(i.toFixed(4), ppp);
		}
		//*/
	}

	// movement
	////////////////////////////////////////////////////////////////////////////
	moveFwd(value) {
		vec3.transformQuat(this._tempVec3, vec3.scale(this._tempVec3, this.VEC_XP, -value * 0.2), this._invRotQuat);
		vec3.add(this.position, this.position, this._tempVec3);
	}
	moveSide(value) {
		vec3.transformQuat(this._tempVec3, vec3.scale(this._tempVec3, this.VEC_YP, -value * 0.2), this._invRotQuat);
		vec3.add(this.position, this.position, this._tempVec3);
	}
	moveUp(value) {
		vec3.transformQuat(this._tempVec3, vec3.scale(this._tempVec3, this.VEC_ZP, -value * 0.2), this._invRotQuat);
		vec3.add(this.position, this.position, this._tempVec3);
	}
	setPos(pos) {
		vec3.copy(this.position, pos);
	}

	// rotation
	////////////////////////////////////////////////////////////////////////////
	rotateLocalPitch(value) {
		vec3.transformQuat(this._tempVec3, this.VEC_XP, this._invRotQuat);
		quat.setAxisAngle(this._tempQuat, this._tempVec3, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}
	rotateLocalYaw(value) {
		vec3.transformQuat(this._tempVec3, this.VEC_YP, this._invRotQuat);
		quat.setAxisAngle(this._tempQuat, this._tempVec3, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}
	rotateLocalRoll(value) {
		vec3.transformQuat(this._tempVec3, this.VEC_ZP, this._invRotQuat);
		quat.setAxisAngle(this._tempQuat, this._tempVec3, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}

	rotateGlobalPitch(value) {
		quat.setAxisAngle(this._tempQuat, this.VEC_XP, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}
	rotateGlobalYaw(value) {
		quat.setAxisAngle(this._tempQuat, this.VEC_ZP, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}
	rotateGlobalRoll(value) {
		quat.setAxisAngle(this._tempQuat, this.VEC_YP, value * 0.0015);
		quat.multiply(this.rotQuat, this.rotQuat, this._tempQuat);
		quat.invert(this._invRotQuat, this.rotQuat);
	}

	setRot(rot) {
		quat.copy(this.rotQuat, rot);
		quat.invert(this._invRotQuat, this.rotQuat);
	}
}
