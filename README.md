# dr-svg-composer

> Composite and transform SVG elements

## Usage:

```js
compose(src, dest, elements, callback);
```

#### Arguments
* `src` - (string) Path to source SVG elements.
* `dest` - (string) Destination path of composed SVG elements.
* `elements` - (object) Describes the SVG elements to be composed. Each element is described by a key and an array of sub-elements. Each sub-element in turn is described as just the name of the source SVG element (a `string` minus suffix) or an object with the following properties:
  * `name` - (string) Name of the source SVG element minus suffix.
  * `x` - (number) Optional. Defines the horizontal offset from the preceding sub-element or the left-hand side of element.
  * `y` - (number) Optional. Defines the vertical offset from the preceding sub-element or the top of the element.
  * `fill` - (string) Optional. Defines a fill color to use on the sub-element.
* `callback` - (function) A function to call when done.

#### Example

```js
var compose = require("dr-svg-compose"),
    src = "img/source-shapes",
    dest = "img/composed-shapes",
    elements = {
    	circles: ["circle", {name: "circle", x: -10, y: 5, fill: "#000"}],
    	squares: [{name: "square", y: 5, fill: "#F00"}, {name: "square", x: -10, fill: "#F00"}]
    },
    callback = function () {
    	console.log("All done.");
    };

compose(src, dest, elements, callback);
```

[![Analytics](https://ga-beacon.appspot.com/UA-8318361-2/drdk/dr-svg-composer)](https://github.com/igrigorik/ga-beacon)
