//Rest HTTP stuff
var express = require('express');
var bodyParser = require('body-parser');
//DB Products
var dbProducts = require('./dbProducts.js');
var dbRatings = require('./dbRatings.js');
//Allow for xss
var cors = require('cors');

var app = express();

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080; // set our port

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Incoming request..');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'Welcome to the store api!'});
});

//API Definitions
// on routes that end in /products
// ----------------------------------------------------
router.route('/products')

    // get all the products (accessed at GET http://localhost:8080/api/products)
    .get(function (req, res) {
        dbProducts.getProducts(function (err, data) {
            if (data) {
                res.json({
                    status: '200',
                    items: data
                });
            } else {
                res.json(404, {status: err});
            }
        });
    })
    //PUT localhost:8080/api/products)
    //x-www-form-url-encoded
    //Updated by Ben 10/26/15 - put = update (not insert)
    .put(function (req, res) {
        dbProducts.updateProduct(req.body, function (err, data) {
            if (data) {
                res.json({
                    status: '200'
                });
            }
            else {
                res.json(404, {status: err});
            }
        });
    })
    //POST localhost:8080/api/products
    //x-www-form-url-encoded
    //Updated by Ben 10/26/15 - post = insert (not update)
    .post(function (req, res) {
        dbProducts.insertProduct(req.body, function (err, data) {
            if (data) {
                res.json({
                    status: '200'
                });
            }
            else {
                res.json(404, {status: err});
            }
        });
    });

// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/products/:product_id')
    //GET localhost:8080/api/products/1
    .get(function (req, res) {
        dbProducts.getProduct(req.params['product_id'], function (err, data) {
            if (data) {
                res.json({
                    status: '200',
                    item: data
                });
            }
            else {
                res.json(404, {status: err});
            }
        });
    })
    //DEL localhost:8080/api/products/1
    .delete(function (req, res) {
        dbProducts.deleteProduct(req.params['product_id'], function (err, data) {
            if (data) {
                res.json({
                    status: '200'
                });
            }
            else {
                res.json(404, {status: err});
            }
        });
    })
//POST localhost:8080/api/products
/*
 //Ben 10/26/15 - already implemented above
 .post(function (req, res) {
 dbProducts.updateProduct(req.body, function (err, data) {
 if (data) {
 res.json({
 status: '200'
 });
 }
 else {
 res.json(404, {status: err});
 }
 });
 });
 */

router.route('/ratings')
    .delete(function (req, res) {
        dbRatings.deleteRating(req.body, function (err, data)
        {
            if (data) {
                res.json({
                    status: '200'
                });
            }
            else {
                res.json(404, {status: err});
            }
        });
    })

    .post(function (req, res) {
        dbRatings.insertRating(req.body, function (err, data)
        {
            if (data) {
                res.json({
                    status: '200'
                });
            }
            else {
                res.json(404, {status: err});
            }
        });
    })

    .put(function (req, res){
        dbRatings.updateRating(req.body, function (err, data)
        {
            if (data) {
                res.json({
                    status: '200'
                });
            }
            else {
                res.json(404, {status: err});
            }
        });
    })


router.route('/ratings/:product_id')
    .get(function (req, res) {
        dbRatings.getRating(req.params['product_id'], function (err, data)
        {
            if (data) {
                res.json({
                    status: '200',
                    item: data
                });
            }
            else
            {
                res.json(404, {status: err});
            }
        });
    });

// Register routes
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Running on port ' + port);