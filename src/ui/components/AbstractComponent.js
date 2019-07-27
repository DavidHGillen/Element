/**
 * All the data common to every component.
 */
class AbstractComponent extends Evee {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(layoutID, data) {
		super();


		this.dirty = true;    // has this been updated but not rendered
	}

	// core
	////////////////////////////////////////////////////////////////////////////
	resize(x, y, width, height) {
		console.log(x, y, width, height);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}
