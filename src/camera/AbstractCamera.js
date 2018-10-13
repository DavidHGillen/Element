/**
 * Camera's view the scene graph, but do not exist in it. Abstract camera defines all the shared camera behaviours.
 * Notably this fails to include enough to use an AbstractCamera to actually view content.
 */
class AbstractCamera extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this.nearPlane = null;
		this.farPlane = null;

		this.position = vec3.create();
		this.rotQuat = quat.create();

		this._tempVec3 = vec3.create();
		this._tempQuat = quat.create();
		this._invRotQuat = quat.create();
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
