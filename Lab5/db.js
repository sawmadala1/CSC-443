// First you need to create a connection to the db
var mysql = require('mysql');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "newsh!t247",
    database: 'store'
});

pool.getConnection(function(err){
    if(err!=null){
        console.log(err.toString());
    }
});
module.exports.pool = pool;