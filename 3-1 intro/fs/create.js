var fs = require('fs');

// Write
fs.writeFileSync('test.txt', 'Hello fs!');

// Read
console.log(fs.readFileSync('test.txt').toString());