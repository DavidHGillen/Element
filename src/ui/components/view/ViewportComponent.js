/**
 * Rendering of 3D mesh data
 */
class ViewportComponent extends AbstractComponent {
	constructor() {
		super();

		this._model = new ViewportComponentModel();
	}
}
