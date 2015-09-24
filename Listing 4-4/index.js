// node_modules/bar/bar1.js
module.exports = function () {
    console.log('bar1 was called');
}

// node_modules/bar/bar2.js
module.exports = function () {
    console.log('bar2 was called');
}

//node_modules/bar/index.js
exports.bar1 = require('./bar1');
exports.bar2 = require('./bar2');

// foo.js
var bar = require('./bar'); // look for a node_modules module named bar
bar.bar1();
bar.bar2();

