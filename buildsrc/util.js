const fs = require("fs");

let arrToStr = function(arr) {
	if(!(typeof arr === "object" && Array.isArray(arr))){ return arr; }

	let output = "[";
	let count = arr.length;
	for(let i=0; i<count; i++) {
		output += arrToStr(objToStr(arr[i])) + ((i < count-1) ? ", " : "]");
	}
	return output;
}
exports.arrToStr = arrToStr;

let objToStr = function(obj) {
	if(!(typeof obj === "object" && !Array.isArray(obj))){ return obj; }

	let next = false;
	let output = "{";
	for(let n in obj) {
		output += `${next ? ", " : ""}${n}: "${arrToStr(objToStr(obj[n]))}"`;
		next = true;
	}
	return output + "}";
}
exports.objToStr = objToStr;

exports.copyArray = (src, dst, arr) => {
	let count = arr.length;
	for(let i=0; i<count; i++) {
		let loc = arr[i];
		fs.copyFileSync(src+loc, dst+loc);
	}
}

exports.getParams = (arr) => {
	if(!arr) { arr = []; }

	return {
		type: (arr.some((val) => val.slice(-7) === "release")) ? "release" : "dev"
	}
}

exports.prepIndex = (target, options) => {
	let data = fs.readFileSync("./buildsrc/index.template.html", "utf-8");

	var count = 0;
	for(let n in options) {
		let start = -1;
		do {
			start = data.indexOf("\{\{"+ n +"\}\}");
			if(start !== -1) {
				data = data.slice(0, start) +
					arrToStr(objToStr(options[n])) +
					data.slice(start + n.length+4);
			}
		} while(start !== -1);
	}

	fs.writeFileSync(target+"index.html", data, "utf-8");
}
