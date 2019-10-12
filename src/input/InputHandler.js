/**
 * Standardize and coral all inputs into a controlled and expected behaviour system.
 * Sends resolved and corrected input state to the `input/CommandQueue` to activate.
 *
 * TODO:: Key combos are not handled by this properly
 * TODO:: Controller APIS
 * TODO:: Non standard mice
 * TODO:: Touch inputs
 */
class InputHandler extends Evee {

	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	/**
	 * Create the input listener and pair it to a command queue, this will immeditaley attach listeners
	 * @param {HTMLCanvasElement} canvas The rendering element to attach input listeners to
	 * @param {CommandQueue} command The command queue that this input stack will feed to
	 */
	constructor(canvas, command) {
		super();

		// public

		// configured

		// private
		this._canvas = canvas;
		this._command = command;
		this._internalBinds = {};

		// mouse
		this._mouseXCur = 0;          this._mouseYCur = 0;
		this._mouseXLast = 0;         this._mouseYLast = 0;
		this._mouseXResponse = [];    this._mouseYResponse = [];
		this._mousePressTimes = {};

		// keyboard
		this._keyPressTimes = {};
		this._keyResponse = {};
		this._holdKeyDelay = 100;

		// function attachments
		this._internalBinds["evtMouseLost"] = this._evtMouseLost.bind(this);
		this._internalBinds["updateMousePosition"] = this._updateMousePosition.bind(this);
		this._internalBinds["updateMousePress"] = this._updateMousePress.bind(this);
		this._internalBinds["updateMouseRelease"] = this._updateMouseRelease.bind(this);
		this._internalBinds["blockMouseEvent"] = this._blockMouseEvent.bind(this);
		this._internalBinds["updateKeyDown"] = this._updateKeyDown.bind(this);
		this._internalBinds["updateKeyUp"] = this._updateKeyUp.bind(this);

		// start
		this.attachDefaultListeners();
	}

	// listener
	////////////////////////////////////////////////////////////////////////////
	attachDefaultListeners() {
		window.addEventListener("mouseout", this._internalBinds["evtMouseLost"]);
		window.addEventListener("mousemove", this._internalBinds["updateMousePosition"]);
		this._canvas.addEventListener("mousedown", this._internalBinds["updateMousePress"]);
		this._canvas.addEventListener("mouseup", this._internalBinds["updateMouseRelease"]);
		this._canvas.addEventListener("click", this._internalBinds["blockMouseEvent"]);
		this._canvas.addEventListener("dblclick", this._internalBinds["blockMouseEvent"]);
		this._canvas.addEventListener("contextmenu", this._internalBinds["blockMouseEvent"]);
		document.addEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.addEventListener("keyup", this._internalBinds["updateKeyUp"]);
	}

	detachDefaultListeners() {
		window.removeEventListener("mouseout", this._internalBinds["evtMouseLost"]);
		window.removeEventListener("mousemove", this._internalBinds["updateMousePosition"]);
		this._canvas.removeEventListener("mousedown", this._internalBinds["updateMousePress"]);
		this._canvas.removeEventListener("mouseup", this._internalBinds["updateMouseRelease"]);
		this._canvas.removeEventListener("click", this._internalBinds["blockMouseEvent"]);
		this._canvas.removeEventListener("dblclick", this._internalBinds["blockMouseEvent"]);
		this._canvas.removeEventListener("contextmenu", this._internalBinds["blockMouseEvent"]);
		document.removeEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.removeEventListener("keyup", this._internalBinds["updateKeyUp"]);
	}

	// commands
	////////////////////////////////////////////////////////////////////////////
	// apply updates for all delta based inputs and poll non updating inputs
	update(now) {
		this._mouseTick(now);
		this._keyboardTick(now);
	}

	// mouse
	////////////////////////////////////////////////////////////////////////////
	_blockMouseEvent(e) {
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
	}
	_updateMousePosition(e) {
		this._mouseXCur = e.clientX;
		this._mouseYCur = e.clientY;
	}
	_updateMousePress(e) {
		//this._held = Date.now();

		this._blockMouseEvent(e);
	}
	_updateMouseRelease(e) {
		//this._held = undefined;

		this._blockMouseEvent(e);
	}
	_evtMouseLost(e) {
		//this._held = undefined;

		this._blockMouseEvent(e);
	}

	_mouseTick(now) {
		/*
		let i, l, o;

		// poll for deltas
		let deltaX = this._mouseXLast === undefined ? 0 : (this._mouseXCur - this._mouseXLast);
		let deltaY = this._mouseYLast === undefined ? 0 : (this._mouseYCur - this._mouseYLast);

		// apply deltas
		if(deltaX) {
			for(i = 0, l = this._mouseXResponse.length; i < l; i++) {
				o = this._mouseXResponse[i];
				if(o.style === "Drag" && !this._held){ continue; }
				this._command.performCommand(o.cmd, deltaX * o.sens, false);
			}
		}
		if(deltaY) {
			for(i = 0, l = this._mouseYResponse.length; i < l; i++) {
				o = this._mouseYResponse[i];
				if(o.style === "Drag" && !this._held){ continue; }
				this._command.performCommand(o.cmd, deltaY * o.sens, false);
			}
		}

		// track
		this._mouseXLast = this._mouseXCur;
		this._mouseYLast = this._mouseYCur;
		*/
	}

	// keyboard
	////////////////////////////////////////////////////////////////////////////
	_updateKeyDown(e) {
		/*
		Logger.log("keydown", e);
		let now = Date.now();
		let keyCode = e && e.code;
		let lastActive = this._keyMap[keyCode];
		let response = this._keyResponse[keyCode];

		if(response === undefined || lastActive !== undefined) { return; }
		Logger.log(`keyDown: ${keyCode}`);

		this._keyMap[keyCode] = now;
		*/
	}
	_updateKeyUp(e) {
		/*
		Logger.log("keyup", e);
		this._keyMap[e.code] = undefined;
		*/
	}

	_keyboardTick(now) {
		/*
		for(let n in this._keyMap) {
			let lastActive = this._keyMap[n];
			if(lastActive === undefined){ continue; }

			let response = this._keyResponse[n];
			if(response === undefined || (now - lastActive) < this._holdKeyDelay) { return; }

			response.forEach((o) => {this._command.performCommand(o.cmd, o.val, true)});
		}
		*/
	}
}
