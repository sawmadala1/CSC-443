var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "localhost",
    user: "Archie",
    password: "newshit247"
});

con.connect(function(err){
    if(err){
        console.log('hello world!');
        return;
    }
    console.log('Connection established');
});

con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});
