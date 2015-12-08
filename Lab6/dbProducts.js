/**
 * Created by Vico on 10/20/2015.
 */

var db = require('./db.js');
var nodeCache = require( "node-cache" );
var dbCache = new nodeCache();

var getProduct = function getProduct(product_id, callback) {

    var sql = 'SELECT * FROM PRODUCTS WHERE ?';
    var cachedData = getFromCache(product_id);

    if(cachedData!=null){
        console.log("Getting cached data:" + cachedData);
        callback(null,cachedData);
    }else {
        var get = {id: product_id};
        db.pool.getConnection(function (err, connection) {
            // Use the connection
            connection.query(sql, get, function (err, results) {
                if (!err) {
                    if (results[0] != null) {
                        dbCache.set(sql+product_id, results, 10000 );
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
    var sql = 'SELECT * FROM PRODUCTS';
    var cachedData = getFromCache(sql);

    if(cachedData!=null){
        console.log("Getting cached data:" + cachedData);
        callback(null,cachedData);
    }else {
        db.pool.getConnection(function (err, connection) {
            // Use the connection
            connection.query(sql, function (err, results) {
                if (!err) {
                    if (results != null) {
                        dbCache.set( sql, results, 10000 );
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

var getFromCache = function (id) {
    var result = null;
    dbCache.get(id, function (err, value) {
        if (!err) {
            if (value == undefined) {
                // key not found
            } else {
                result = value;
            }
        }
    });
    return result;
};


module.exports.updateProduct = updateProduct;
module.exports.insertProduct = insertProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
