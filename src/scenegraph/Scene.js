/**
 * A SceneGraph represents all objects that exist in a scene in a treelike setup. There is only 1 scene at a time
 * A Scene is the root element of all other elements so is an ideal place to store information about the whole scene.
 * Otherwise it is functionally identical to a regular `scenegraph/Container`.
 */
class Scene extends Container {
	// capability deifnitions
	////////////////////////////////////////////////////////////////////////////
	static get SUPPORTED_VTX_PROPS(){ return [
		Number,
		vec2,
		vec3,
		vec4
	]; }

	static get SUPPORTED_VTX_PROP_OPTIONS(){ return [
		"normalize",
		"integer",
		"clamp"
	]; }

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor() {
		super();

		// world
		this._background = {
			r: 0.4,    g: 0.4,    b: 0.4
		};
		this._vertexProperties = { // without position a lot of assumptions fall apart
			position: {type: vec3, options: undefined, init: undefined}
		};
	}

	////////////////////////////////////////////////////////////////////////////
	// world

	/**
	* return success
	*/
	addVertexProperty(name, type, options, init) {
		let vp = this._vertexProperties;
		if(vp[name]){ return false; }
		if(Scene.SUPPORTED_VTX_PROPS.indexOf(type) === -1){ return false; }

		this._vertexProperties[name] = {
			type: type,
			options: options || {},
			init: init || (function(){ return 0; })
		};
		return true;
	}
}
