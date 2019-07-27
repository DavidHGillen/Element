/**
 * All the data needed about a viewport
 */
class ViewportComponent extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(camera, scene) {
		super();

		this._scene = scene;
		this._camera = camera;
	}
}
