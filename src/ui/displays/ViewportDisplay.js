/**
 * Temporary class, uses a gl output as its sole content
 */
class ViewportDisplay extends AbstractDisplay{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(camera) {
		super();

		this.addControl(new ViewportComponent(camera));
	}
}
