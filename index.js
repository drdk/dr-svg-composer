/*
 * dr-svg-composer
 *
 *
 * Copyright (c) 2013 drdk
 * Licensed under the MIT license.
 */

"use strict";

/*
{
	"src": "img/_source/svg-logo-elements/",
	"dest": "img/_source/svg-logos/tv/", // dest + target
	"elements": {
		"ramasjang-ultra": [{ "name": "dr", "y": 14 }, { "name": "ramasjang", "x": -7 }, "ultra"]
	}
}
*/

module.exports = function (src, dest, elements, callback) {

	var fs = require("fs");
	var path = require("path");

	var _ = require("lodash");
	var async = require("async");
	var mkdirp = require("mkdirp");

	var svgutil = require("./lib/svgutil");

	var subElements = {};
	var names = [];

	// turn string sub-elements into objects
	_.forOwn(elements, function (subElements, name) {
		subElements.forEach(function (subElement, index) {
			if (typeof subElement == "string") {
				subElements[index] = {name: subElement};
			}
		});
	});

	// get the names of all the sub-elements
	_.forOwn(elements, function (subElements, name) {
		names = names.concat(_.flatten(subElements.map(function (subElement) {
			return subElement.name;
		})));
	});
	names = _.unique(names);

	// load svg sub-elements
	var tasks = {};

	names.forEach(function (name) {
		tasks[name] = function (callback) {
			svgutil.loadShape(src + "/" + name + ".svg", callback);
		};
	});

	async.parallel(tasks, function (err, results) {
		subElements = results;

		var subTasks = {};

		mkdirp(dest, function () {

			_.forOwn(elements, function (subElements, name) {
				subTasks[name] = function (callback) {
					composeElement(dest, subElements, name, callback);
				};
			});

			async.parallel(subTasks, function (err, subResults) {
				callback(null, "Elements composed");
			});
		});

	});

	// build element

	function composeElement (destination, _subElements, name, callback) {

		var width = 0;
		var height = 0;
		var length = _subElements.length;
		var lastElement = _subElements[length - 1];
		var fill = ("fill" in lastElement) ? lastElement.fill : null;
		var fileName = path.relative(process.cwd(), destination + "/" + name + ".svg");

		var svgElements = _subElements.map(function (subElement, i) {
			var element = subElements[subElement.name];
			var widthOffset = (width > 0) ? (subElement.x || 0) : 0;
			var _height = element.info.height + (subElement.y || 0);
			var data = svgutil.transform(element.data, width + widthOffset, subElement.y || 0, (i == length - 1) ? fill : null);
			width += element.info.width + widthOffset;
			height = (height < _height) ? _height : height;
			return data;
		});

		fs.writeFile(fileName, svgutil.wrap(Math.ceil(width), height, svgElements), "utf8", callback);
	}

};
