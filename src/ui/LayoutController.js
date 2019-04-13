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
		this.resizeStep(this._model._root, 0,0, width, height);
	}

	resizeStep(node, x, y, width, height) {
		let isVert = node.isVertical;
		let splitVal = node.value;
		let outSize, srcVal = isVert ? height : width;
		let widthA = width, heightA = height, widthB = width, heightB = height;
		let xA = x, yA = y, xB = x, yB = y;

		switch(node.type) {
			case BinaryLayoutSplit.TYPE_ABS:
				if(node.pin === BinaryLayoutSplit.PIN_A) {
					outSize = splitVal;
				} else {
					outSize = srcVal - splitVal;
				}
				break;
			case BinaryLayoutSplit.TYPE_PER:
				splitVal /= 100;
				if(node.pin === BinaryLayoutSplit.PIN_A) {
					outSize = Math.floor(srcVal * splitVal);
				} else {
					outSize = Math.floor(srcVal * (1.0 - splitVal));
				}
				break;
		}

		if(isVert) {
			yB = y + outSize;
			heightA = outSize;
			heightB = height - outSize;
		} else {
			xB = x + outSize;
			widthA = outSize;
			widthB = width - outSize;
		}

		if(node.entryA instanceof BinaryLayoutSplit) {
			this.resizeStep(node.entryA, xA, yA, widthA, heightA);
		} else {
			node.entryA.resize(xA, yA, widthA, heightA);
		}

		if(node.entryB instanceof BinaryLayoutSplit) {
			this.resizeStep(node.entryB, xB, yB, widthB, heightB);
		} else {
			node.entryB.resize(xB, yB, widthB, heightB);
		}
	}

	tick(time) {
		let panels = this._model._panels;
		for(let i=0; i<panels.length; i++) {
			this._renderer.drawPanel(panels[i]);
		}
		//this.tickStep(this._model._root, time);
	}

	tickStep(node, time) {
		if(node.entryA instanceof BinaryLayoutSplit) {
			this.tickStep(node.entryA, time);
		} else {
			this._renderer.drawPanel(node.entryA._zone);
		}

		if(node.entryB instanceof BinaryLayoutSplit) {
			this.tickStep(node.entryB, time);
		} else {
			this._renderer.drawPanel(node.entryB._zone);
		}
	}

	// saving / loading
	////////////////////////////////////////////////////////////////////////////
	loadWorkspace(name) {
		this._model = new DefaultScreen();
		this._root = this._model._root;
	}
}
