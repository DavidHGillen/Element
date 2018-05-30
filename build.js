const fs = require("fs-extra");
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
			{src:"node_modules/gl-matrix/dist/gl-matrix-min.js"},
			{src:"node_modules/evee/lib/evee.js", isModule:true}
		],
		ContentEntries: [
			{ src:"src/Main.js" },
			{ src:"src/input/InputHandler.js" }
		]
	}
);

server.startServer(8787, serverRoot);
