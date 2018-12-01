/**
 * A SceneGraph represents all objects that exist in a scene in a treelike setup. There is only 1 scene at a time
 * A Scene is the root element of all other elements so is an ideal place to store information about the whole scene.
 * Otherwise it is functionally identical to a regular `scenegraph/Container`.
 */
class Scene extends Container {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(bgColor) {
		super();

		// world
		this._background = {
			r: bgColor.r,    g: bgColor.g,    b: bgColor.b
		};
	}
}
