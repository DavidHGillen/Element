/**
 * All the data needed about a viewport
 */
class ViewportComponent extends AbstractComponent {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();
	}

	configure(scene, camera) {
		this._scene = scene;
		this._camera = camera;
	}
}
