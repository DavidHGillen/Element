/**
 * 
 */
class LayoutZone extends Rectangle{
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(zone) {
		super();

		this._zone = null;

		this.attachZone(zone);
	}

	// object
	////////////////////////////////////////////////////////////////////////////
	attachZone(zone) {
		this._zone = zone;
		this.resize(this._x, this._y, this._w, this._h);
	}

	resize(x, y, w, h) {
		super.resize(x, y, w, h);
		if (this._zone) { this._zone.resize(this._x, this._y, this._w, this._h); }
	}
}