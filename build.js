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
			{ src:"node_modules/gl-matrix/dist/gl-matrix-min.js" },
			{ src:"node_modules/evee/lib/evee.js", isModule:true }
		],
		ContentEntries: [
			{ src:"src/input/InputHandler.js" },

			{ src:"src/renderer/shadersrc/UtilRepo.js" },
			{ src:"src/renderer/shadersrc/VtxRepo.js" },
			{ src:"src/renderer/shadersrc/FragRepo.js" },
			{ src:"src/renderer/shadersrc/ShaderCompiler.js" },
			{ src:"src/renderer/RenderManager.js" },

			{ src:"src/ui/LayoutManager.js" },
			{ src:"src/ui/components/modelController/AbstractComponentModel.js" },
			{ src:"src/ui/components/modelController/ViewportComponentModel.js" },
			{ src:"src/ui/components/view/AbstractComponent.js" },
			{ src:"src/ui/components/view/ViewportComponent.js" },
			{ src:"src/ui/AbstractDisplay.js" },
			{ src:"src/ui/displays/RenderDisplay.js" },

			{ src:"src/Main.js" }
		]
	}
);

server.startServer(8787, serverRoot);
