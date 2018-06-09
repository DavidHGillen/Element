/**
 * Temporary class, uses a gl output as its sole content
 */
class RendererDisplay extends AbstractDisplay{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(camera) {
		super();

		this.addControl(new ViewportComponent(camera));
	}
}
