// First you need to create a connection to the db
var mysql = require('mysql');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "newsh!t247",
    database: 'store'
});
module.exports.pool = pool;