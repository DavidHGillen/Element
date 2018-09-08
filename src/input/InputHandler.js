/**
 * Standardize and coral all inputs into a controlled and expected behaviour system.
 * Sends resolved and corrected inputs to the `input/CommandQueue` to activate.
 */
class InputHandler extends Evee {

	// static
	////////////////////////////////////////////////////////////////////////////

	// ctor
	////////////////////////////////////////////////////////////////////////////
	constructor(canvas, command) {
		super();

		// public

		// configured

		// private
		this._canvas = canvas;
		this._command = command;

		this._mouseX = 0;		this._mouseY = 0;
		this._panX = 0;			this._panY = 0;
		this._held = false;

		this._keyMap = {};
		this._keyResponse = {};
		this._holdKeyDelay = 100;

		// start
		window.addEventListener("mousemove", this._updateMousePosition.bind(this));
		this._canvas.addEventListener("mousedown", this._updateMousePress.bind(this));
		this._canvas.addEventListener("mouseup", this._updateMouseRelease.bind(this));

		document.addEventListener("keydown", this._updateKeyDown.bind(this));
		document.addEventListener("keyup", this._updateKeyUp.bind(this));
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
				if(!( buttonCount === 1 )){
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
	tick(now) {
		this._mouseTick(now);
		this._keyboardTick(now);
	}

	// mouse
	////////////////////////////////////////////////////////////////////////////
	registerMouseInputs(buttonAxisList, command) {
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
		// HERE
	}

	_updateMousePosition(e) {
		let newX = e.clientX;
		let newY = e.clientY;

		if(this._held) {
			this._panX += this._mouseX - newX;
			this._panY += this._mouseY - newY;
		}

		this._mouseX = newX;
		this._mouseY = newY;
	}
	_updateMousePress(e) {
		this._held = true;
	}
	_updateMouseRelease(e) {
		this._held = false;
	}

	_mouseTick(now) {
		// poll for deltas

		// apply deltas
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
