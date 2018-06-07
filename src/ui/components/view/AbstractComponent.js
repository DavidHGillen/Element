/**
 * The shared rendering information of all components, this not do any actual
 * rendering tasks, they are left for the renderer section. This simply informs
 * the renderer what to show and where.
 */
class AbstractComponent extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		this._model = null;

		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 100;
	}

	// core
	////////////////////////////////////////////////////////////////////////////
}
