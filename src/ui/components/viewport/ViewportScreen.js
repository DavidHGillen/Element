/**
 * Controller for a viewport
 */
class ViewportScreen extends AbstractComponentController {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._data = new ViewportModel();
		this._camera = this._data._camera;
	}

	// rendering
	////////////////////////////////////////////////////////////////////////////
	setViewport(gl) {
		gl.viewport(this.x, this.y, this.width, this.height);
	}
}
