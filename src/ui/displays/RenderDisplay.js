/**
 * Non final class, uses a gl output as its sole content
 */
class RendererDisplay extends AbstractDisplay{
	constructor() {
		super();

		this.addControl(new ViewportComponent());
	}
}
