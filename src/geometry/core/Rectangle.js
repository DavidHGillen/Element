/**
 * Flexible basic 2D rectangle class for use in UI layout and info
 */
class Rectangle {
	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(x=0, y=0, w=1, h=1) {
		this._x = x;
		this._y = y;

		this._width = w;
		this._height = h;
	}

	// object
	////////////////////////////////////////////////////////////////////////////
	/**
	 * x,y,w,h: work as a solid moveable object with fixed size.
	 * Adjusting position does not change size.
	 */
	get x() { return this._x; }
	get y() { return this._y; }
	get w() { return this._w; }
	get h() { return this._h; }

	set x(val) { this._x = val; }
	set y(val) { this._y = val; }
	set w(val) { this._w = val; }
	set h(val) { this._h = val; }

	// bounds
	////////////////////////////////////////////////////////////////////////////
	/**
	 * t,l,b,r: work as a bounding area with defined edges.
	 * Adjusting boundries will the change size.
	 */
	get t() { return this._y; }
	get l() { return this._x; }
	get b() { return this._y + this._h; }
	get r() { return this._x + this._w; }

	set t(val) { this._y = val; this._h += val; }
	set l(val) { this._x = val; this._w += val; }
	set b(val) { this._h -= val; }
	set r(val) { this._w -= val; }

	// utility
	////////////////////////////////////////////////////////////////////////////
	testHit(x, y) {
		return (x >= this._x && x <= this._x + this._w) && (y >= this._y && y <= this._y + this._h);
	}

	resize(x,y, w,h) {
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
	}

	cover(t,l, b,r) {
		this._x = t;
		this._y = l;
		this._w = b - t;
		this._h = r - l;
	}
}