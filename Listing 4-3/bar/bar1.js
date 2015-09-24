// bar/bar1.js
module.exports = function () {
    console.log('bar1 was called');
}

// bar2.js
module.exports = function () {
    console.log('bar2 was called');
}

//bar/index.js
exports.bar1 = require('./bar1');
exports.bar2 = require('./bar2');

// foo.js
var bar = require('./bar');
bar.bar1();
bar.bar2();
