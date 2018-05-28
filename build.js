const fs = require("fs");
const util = require("./buildsrc/util.js");
const server = require("./buildsrc/server.js");

let serverRoot = "./";
let buildParams = util.getParams(process.argv.slice(2));

if(buildParams.type == "dev") {
	console.log("-dev-");
} else if(buildParams.type == "release") {
	console.log("-release-");
	serverRoot = "./build/";
	util.copyArray("./", serverRoot, ["images", "libs", "src"]);
}

util.prepIndex(
	serverRoot, {
		ResourceEntries: [
			// https://www.npmjs.com/package/uglify-es
			{src:"libs/evee.js" } // https://www.npmjs.com/package/evee
			// https://www.npmjs.com/package/gl-matrix)
		],
		ContentEntries: [
			{ src:"src/Main.js" },
			{ src:"src/input/InputHandler.js" }
		]
	}
);

server.startServer(8787, serverRoot);
