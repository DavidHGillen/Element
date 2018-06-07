/**
 * Rendering of 3D mesh data
 */
class ViewportComponent extends AbstractComponent {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(scene) {
		super();

		this._model = new ViewportComponentModel(scene);
	}
}
