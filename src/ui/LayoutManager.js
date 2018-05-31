/**
 * Determine and manage position of all displays and overlays
 */
class LayoutManager extends Evee{
	constructor() {
		super();

		this._displays = [new RendererDisplay()];
	}
}
