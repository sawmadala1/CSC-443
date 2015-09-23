var http = require('http');

var prod1234567 = {product_id:'1234567', price: '$99.99'};
var prod5555555 = {product_id:'5555555', price: '$4.99'};
var prod8888888 = {product_id:'8888888', price: '$19.99'};

var requestListener = function (req, res) {
    res.writeHead(200);
    var result = {error: "Product ID not found."};
    if (req.url == "/1234567"){
        result = prod1234567;
    }
    else if (req.url == '/5555555') {
        result = prod5555555;
    }
    else if (req.url == '/8888888') {
        result = prod8888888;
    }
    res.end(JSON.stringify(result));
}
var server = http.createServer(requestListener);
server.listen(8080);

