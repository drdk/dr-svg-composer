var fs = require("fs");

function mkdirRecursive (dir) {
	if (dir && !fs.existsSync(dir)) {	
		var parent = dir.replace(/(^|\/)[^\/]*$/, "");
		if (dir != parent && parent && parent != "./" && parent != "../" && !fs.existsSync(parent)) {
			mkdirRecursive(parent);
		}
		fs.mkdirSync(dir);
	}
}

module.exports.mkdirRecursive = mkdirRecursive;