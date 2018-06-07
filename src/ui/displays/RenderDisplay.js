/**
 * Temporary class, uses a gl output as its sole content
 */
class RendererDisplay extends AbstractDisplay{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(scene) {
		super();

		this.addControl(new ViewportComponent(scene));
	}
}
