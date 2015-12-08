var supertest = require("supertest");
var should = require("should");

// This agent refers to port where program is running.

var server = supertest.agent("http://localhost:8080/api");

// Unit test begin

describe("root api call", function (){
    it("should return hello", function (done){
        //calling home page api
        server

            .get("/")
            .expect("Content-type", /json/)
            .expect(200) // This is HTTP response
            .end(function (err, res){
                //HTTP status should be 200
                should.equal(res.status, 200);
                // Error key should be false.
                should.equal(res.error, false);
                done();

            });
    });
});

describe("add product", function (){
    it("add product", function (done){
        // Calling home page api
        Server
            .put("/products")
            .send({name : "Chainsaw", price : 199.99})
            .expect("Content-type", /json/)
            .expect(200) // This is HTTP response
            .end(function (err, res){
                // HTTP Status should be 200
                should.equal(res.status, 200);
                // Error key should be false
                should.equal(res.error, false);
                done();
            });
    });

});

describe("get and update product", function () {
    var pid;
    it("get product id", function (done) {
        // calling home page api
        server
            .get("/products")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                result = JSON.parse(res.text);
                pid = result.items[0].id;
                // HTTP status should be 200
                should.equal(res.status, 200);
                // Error key should be false.
                should.equal(res.error, false);
                console.log(pid);
                done();
            });
    });

    it("update product", function (done) {
        // calling home page api
        console.log(pid);
        server
            .post("/products")
            .send({product_id: pid, price : 299.99})
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                should.equal(res.status, 200);
                // Error key should be false.
                should.equal(res.error, false);
                done();
            });
    })

    it("get product id", function (done) {
        // calling home page api
        server
            .get("/products")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                result = JSON.parse(res.text);
                pid = result.items[0].id;
                // HTTP status should be 200
                should.equal(res.status, 200);
                // Error key should be false.
                should.equal(res.error, false);
                console.log(pid);
                done();
            });
    });
});

describe("get all products", function () {
    var result;
    it("should return all products", function (done) {
        // Calling home page api
        Server
            .put("/products")
            .expect("Content-type", /json/)
            .expect(200) // This is HTTP response
            .end(function (err, res) {
                // HTTP Status should be 200
                should.equal(res.status, 200);
                // Error key should be false
                should.equal(res.error, false);
                result = JSON.parse(res.text);
                console.log(result);
                done();
            });
    });


    it("delete all products", function (done) {
        result.items.forEach(function (item) {
            server
                .del("/products/" + item.id)
                .expect("Content-type", /json/)
                .expect(200) // THis is HTTP response
                .end(function (err, res) {
                    // HTTP status should be 200
                    should.equal(res.status, 200);
                    // Error key should be false.
                    should.equal(res.error, false);
                    done();
                });
        });
    });

});

