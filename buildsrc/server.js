const http = require("http");
const url = require("url");
const fs = require("fs");

const hostname = "127.0.0.1";
let server;

exports.startServer = (port, rootStr) => {
	const root = rootStr;

	function handleRequest(req, res) {
		let file =  (url.parse(req.url, true).pathname).slice(1);
		let requestURL = root + (file ? file : "index.html");
		findFile(requestURL, res);
	}

	function findFile(requestURL, res) {
		try{
			let type = getType(requestURL);
			let data = fs.readFileSync(requestURL);
			if(data) {
				processFile(res, data, type);
			} else {
				rejectRequest(res);
			}
		} catch(e) {
			console.error(e);
			rejectRequest(res);
		}
	}

	function processFile(res, data, type) {
		res.statusCode = 200;
		res.setHeader("Content-type", type);
		res.end(data);
	}

	function rejectRequest(res) {
		res.statusCode = 404;
		res.end();
	}

	function getType(url) {
		switch(url.slice(url.lastIndexOf(".")+1)) {
			case "html": return "text/html";
			case "js": return "text/html";
			case "bmp":
			case "png": return "text/html";
			default: return "text/plain";
		}
	}

	// activate
	server = http.createServer(handleRequest);
	server.listen(port, hostname, () => {
		console.log(`http://${hostname}:${port}`);
	})
}
