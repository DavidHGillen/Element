/**
 * Hold references to UI points and convert them into renderable info
 */
class UIPointStore extends AbstractStore{
	// multiton
	////////////////////////////////////////////////////////////////////////////
	static getInstance(id, gl) {
		if(!UIPointStore._hashMap[id]) {
			UIPointStore._hashMap[id] = new UIPointStore(true, gl);
		}

		return UIPointStore._hashMap[id];
	}
	
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(iKnowWhatASingletonIs, gl) {
		super(gl);
	}
} UIPointStore._hashMap = [];
