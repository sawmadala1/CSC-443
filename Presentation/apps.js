var cache = require('memory-cache');

// now just use the cache
cache.put('foo', 'bar'); //foo is address & bar is the value
cache.put('pop', 'hop');
console.log(cache.get('foo'))

// that wasn't too interesting, here's the good part

cache.put('123-456-7890', 'Archnii', 5000) // put Archnii in cache for 5 sec //Time in ms
console.log('The Owner of this phone number is: ' + cache.get('123-456-7890'));

setTimeout(function() {
    console.log('The Owner of this number is ' + cache.get('123-456-7890'));
}, 10000);

console.log('while the setTimeOut sleeps print the owner of this number: '+ cache.get('123-456-7890'));