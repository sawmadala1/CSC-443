// a string
var str = "Hello Buffer World!";

// From string to buffer
var buffer = new Buffer(str, 'utf-8');

// From buffer to string
var roundTrip = beffer.toString('utf-8');
console.log(roundTrip); // Hello

