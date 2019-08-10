/**
 * Hold references to UIText to be rendered and convert them into renderable info
 */
class UITextStore extends AbstractStore{
	// multiton
	////////////////////////////////////////////////////////////////////////////
	static _hashMap = [];

	static getInstance(id, gl) {
		if(!UITextStore._hashMap[id]) {
			UITextStore._hashMap[id] = new UITextStore(true, gl);
		}

		return UITextStore._hashMap[id];
	}
	
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(iKnowWhatASingletonIs, gl) {
		super(gl);
	}
}