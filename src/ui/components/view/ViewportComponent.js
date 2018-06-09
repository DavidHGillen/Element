/**
 * Rendering of 3D mesh data
 */
class ViewportComponent extends AbstractComponent {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(camera) {
		super();

		this._camera = camera;
		this._model = new ViewportComponentModel(this._camera);
	}
}
