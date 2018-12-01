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
			{ src:"src/Logger.js" },

			{ src:"src/input/CommandQueue.js" },
			{ src:"src/input/InputHandler.js" },

			{ src:"src/geometry/VertexInfo.js" },

			{ src:"src/renderer/shadersrc/UtilRepo.js" },
			{ src:"src/renderer/shadersrc/VtxRepo.js" },
			{ src:"src/renderer/shadersrc/FragRepo.js" },
			{ src:"src/renderer/shadersrc/ShaderCompiler.js" },
			{ src:"src/renderer/Renderer.js" },

			{ src:"src/geometry/VertexStack.js" },
			{ src:"src/geometry/Edge.js" },
			{ src:"src/geometry/Face.js" },
			{ src:"src/geometry/MeshData.js" },

			{ src:"src/geometry/primitives/HelperUtility.js" },
			{ src:"src/geometry/primitives/CubeHelper.js" },

			{ src:"src/scenegraph/DisplayObject.js" },
			{ src:"src/scenegraph/Container.js" },
			{ src:"src/scenegraph/Scene.js" },
			{ src:"src/scenegraph/Mesh.js" },

			{ src:"src/camera/AbstractCamera.js" },
			{ src:"src/camera/Camera2D.js" },
			{ src:"src/camera/Camera3D.js" },
			{ src:"src/camera/CameraVR.js" },
			{ src:"src/camera/CameraList.js" },

			{ src:"src/ui/Layout.js" },
			{ src:"src/ui/components/modelController/AbstractComponentModel.js" },
			{ src:"src/ui/components/modelController/ViewportComponentModel.js" },
			{ src:"src/ui/components/view/AbstractComponent.js" },
			{ src:"src/ui/components/view/ViewportComponent.js" },
			{ src:"src/ui/AbstractDisplay.js" },
			{ src:"src/ui/displays/ViewportDisplay.js" },

			{ src:"src/Main.js" }
		]
	}
);

server.startServer(8787, serverRoot);
