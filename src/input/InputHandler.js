/**
 * Standardize and coral all inputs into a controlled and expected behaviour system.
 * Sends resolved and corrected inputs to the `input/CommandQueue` to activate.
 *
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
		this._mouseXCur = 0;		this._mouseYCur = 0;
		this._mouseXLast = 0;		this._mouseYLast = 0;
		this._mouseXResponse = [];	this._mouseYResponse = [];
		this._held = false;

		// keyboard
		this._keyMap = {};
		this._keyResponse = {};
		this._holdKeyDelay = 100;

		// function attachments
		this._internalBinds["evtMouseLost"] = this._evtMouseLost.bind(this);
		this._internalBinds["updateMousePosition"] = this._updateMousePosition.bind(this);
		this._internalBinds["updateMousePress"] = this._updateMousePress.bind(this);
		this._internalBinds["updateMouseRelease"] = this._updateMouseRelease.bind(this);
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
		document.addEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.addEventListener("keyup", this._internalBinds["updateKeyUp"]);
	}

	detachDefaultListeners() {
		window.removeEventListener("mouseout", this._internalBinds["evtMouseLost"]);
		window.removeEventListener("mousemove", this._internalBinds["updateMousePosition"]);
		this._canvas.removeEventListener("mousedown", this._internalBinds["updateMousePress"]);
		this._canvas.removeEventListener("mouseup", this._internalBinds["updateMouseRelease"]);
		document.removeEventListener("keydown", this._internalBinds["updateKeyDown"]);
		document.removeEventListener("keyup", this._internalBinds["updateKeyUp"]);
	}

	// commands
	////////////////////////////////////////////////////////////////////////////
	register(inputType, buttonAxisList, command) {
		let buttonCount = buttonAxisList && buttonAxisList.length;

		switch(inputType) {
			case "keyboard":
				if(!( buttonCount === 1 || buttonCount === 2 )){
					Logger.warn(`Incorrect input(${buttonAxisList}) for command(${command}) on ${inputType}`);
					return;
				}
				this.registerKeyboardInputs(buttonAxisList, command);
				break;

			case "mouse":
				if(!( buttonCount === 2 )){
					Logger.warn(`Incorrect input(${buttonAxisList}) for command(${command}) on ${inputType}`);
					return;
				}
				this.registerMouseInputs(buttonAxisList, command);
				break;

			default:
				Logger.warn(`Attempt to register unknown input type(${inputType})`);
				return;
		}
	}

	// apply updates for all delta based inputs and poll non updating inputs
	update(now) {
		this._mouseTick(now);
		this._keyboardTick(now);
	}

	// mouse
	////////////////////////////////////////////////////////////////////////////
	registerMouseInputs(buttonAxisList, command) {
		let style = buttonAxisList[0];
		switch(style) {
			case "Axis": break;
			case "Drag": break;
			default:
				Logger.warn(`Attempt to register unknown input type(${buttonAxisList[0]})`);
				return;
		}

		let axis = buttonAxisList[1];
		switch(axis) {
			case "X": break;
			case "Y": break;
			case "XY": break;
			default:
				Logger.warn(`Attempt to register unknown input type(${buttonAxisList[0]})`);
				return;
		}

		if(axis === "X" || axis === "XY") {
			this._mouseXResponse.push({cmd: command, style: style, sens: 1});
		}

		if(axis === "Y" || axis === "XY") {
			this._mouseYResponse.push({cmd: command, style: style, sens: 1});
		}
	}

	_updateMousePosition(e) {
		this._mouseXCur = e.clientX;
		this._mouseYCur = e.clientY;
	}
	_updateMousePress(e) {
		this._held = Date.now();
	}
	_updateMouseRelease(e) {
		this._held = undefined;
	}
	_evtMouseLost(e) {
		this._held = undefined;
	}

	_mouseTick(now) {
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
	}

	// keyboard
	////////////////////////////////////////////////////////////////////////////
	registerKeyboardInputs(buttonAxisList, command) {
		if(buttonAxisList.length === 1) {
			this.addKeyboardResponse(buttonAxisList[0], {cmd: command, val: 1});
		} else {
			this.addKeyboardResponse(buttonAxisList[0], {cmd: command, val: -1});
			this.addKeyboardResponse(buttonAxisList[1], {cmd: command, val: 1});
		}
	}

	addKeyboardResponse(key, val) {
		if(this._keyResponse[key] === undefined) {
			this._keyResponse[key] = [];
		}
		this._keyResponse[key].push(val);
	}

	_updateKeyDown(e) {
		let now = Date.now();
		let keyCode = e && e.code;
		let lastActive = this._keyMap[keyCode];
		let response = this._keyResponse[keyCode];

		if(response === undefined || lastActive !== undefined) { return; }
		Logger.log(`keyDown: ${keyCode}`);

		this._keyMap[keyCode] = now;
		response.forEach((o) => {this._command.performCommand(o.cmd, o.val, false)});
	}
	_updateKeyUp(e) {
		this._keyMap[e.code] = undefined;
	}

	_keyboardTick(now) {
		for(let n in this._keyMap) {
			let lastActive = this._keyMap[n];
			if(lastActive === undefined){ continue; }

			let response = this._keyResponse[n];
			if(response === undefined || (now - lastActive) < this._holdKeyDelay) { return; }

			response.forEach((o) => {this._command.performCommand(o.cmd, o.val, true)});
		}
	}
}
