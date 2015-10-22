var db = require('./db.js');

var getProduct = function getProduct(product_id, callback) {

    var get = {id: product_id};
    db.pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM PRODUCTS WHERE ?', get, function (err, results) {
            if (!err) {
                if (results[0] != null) {
                    callback(null, results);
                } else {
                    callback("Product not found.", null);
                }
            } else {
                callback(err, null);
            }
            //release
            connection.release();
        });

    });
}

var deleteProduct = function deleteProduct(product_id, callback) {

    var get = {id: product_id};
    db.pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('DELETE FROM PRODUCTS WHERE ?', get, function (err, results) {
            if (!err) {
                if (results != null) {
                    callback(null, results);
                } else {
                    callback(err, null);
                }
            } else {
                callback(err, null);
            }
            //release
            connection.release();
        });

    });
}
var getProducts = function getProducts(callback) {

    db.pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM PRODUCTS', function (err, results) {
            if (!err) {
                if (results != null) {
                    callback(null, results);
                } else {
                    callback(err, null);
                }
            } else {
                callback(err, null);
            }
            //release
            connection.release();
        });

    });
}
var insertProduct = function insertProduct(data, callback) {

    var get = {name: data.name, price: data.price};
    db.pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('INSERT INTO PRODUCTS SET ?', get, function (err, results) {
            if (!err) {
                if (results != null) {
                    callback(null, results);
                } else {
                    callback(err, null);
                }
            } else {
                callback(err, null);
            }
            //release
            connection.release();
        });

    });
}
var updateProduct = function updateProduct(data, callback) {

    var updateValues = {price: data.price,id: data.product_id};

    db.pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('UPDATE products SET price='+data.price+' WHERE id='+data.product_id, function (err, results) {
            if (!err) {
                if (results != null) {
                    callback(null, results);
                } else {
                    callback(err, null);
                }
            } else {
                callback(err, null);
            }
            //release
            connection.release();
        });

    });
}
module.exports.updateProduct = updateProduct;
module.exports.insertProduct = insertProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;

