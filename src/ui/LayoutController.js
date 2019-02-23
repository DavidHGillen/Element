/**
 * This class determines and manages the position and size of all UI in the application.
 * It does not render it, that is handled by the Renderer class for batching and optimization reasons.
 * The configuration of and presence of any UI is managed by a Workspace that can be swapped out at will.
 * Workspaces contain Panels, Panels contain Panels or Components. Components are terminal elements.
 */
class LayoutController extends Evee{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(renderer) {
		super();

		this._renderer = renderer;

		this._model = undefined;
		this._root = undefined;
	}

	// getters / setters
	////////////////////////////////////////////////////////////////////////////

	// core
	////////////////////////////////////////////////////////////////////////////
	resizeScreen(width, height) {
		this.resizeStep(this._model._root, width, height);
	}

	resizeStep(node, width, height) {
		let isVert = node.isVertical;
		let splitVal = node.value;
		let outVal, srcVal = isVert ? height : width;
		let widthA = width, heightA = height, widthB = width, heightB = height;

		switch(node.type) {
			case BinaryLayoutSplit.TYPE_ABS:
				if(node.pin === BinaryLayoutSplit.PIN_A) {
					outVal = splitVal;
				} else {
					outVal = srcVal - splitVal;
				}
				break;
			case BinaryLayoutSplit.TYPE_PER:
				splitVal /= 100;
				if(node.pin === BinaryLayoutSplit.PIN_A) {
					outVal = Math.floor(srcVal * splitVal);
				} else {
					outVal = Math.floor(srcVal * (1.0 - splitVal));
				}
				break;
		}

		if(isVert) {
			heightA = outVal;
			heightB = height - outVal;
		} else {
			widthA = outVal;
			widthB = width - outVal;
		}

		if(node.entryA instanceof AbstractPanelController) {
			node.entryA.resize(widthA, heightA);
		} else {
			this.resizeStep(node.entryA, widthA, heightA);
		}

		if(node.entryB instanceof AbstractPanelController) {
			node.entryB.resize(widthB, heightB);
		} else {
			this.resizeStep(node.entryB, widthB, heightB);
		}
	}

	tick(time) {
		this.tickStep(this._model._root, time);
	}

	tickStep(node, time) {
		if(node.entryA instanceof AbstractPanelController) {
			this._renderer.drawPanel(node.entryA);
		} else {
			this.tickStep(node.entryA, time);
		}

		if(node.entryB instanceof AbstractPanelController) {
			this._renderer.drawPanel(node.entryB);
		} else {
			this.tickStep(node.entryB, time);
		}
	}

	// saving / loading
	////////////////////////////////////////////////////////////////////////////
	loadWorkspace(name) {
		this._model = new DefaultScreen();
		this._root = this._model._root;
	}
}
