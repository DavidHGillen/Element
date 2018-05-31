/**
 * The shared rendering information of all components
 */
class AbstractComponent extends Evee {
	constructor() {
		super();

		this._model = null;

		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 100;
	}
}
