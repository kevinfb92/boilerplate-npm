require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
console.log("Hello World");

app.use("/public", express.static(__dirname+"/public"));

app.use(function(req, res, next){
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
})

app.use(bodyParser.urlencoded({extended: false}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/views/index.html");
})

app.get("/json", function(req, res){
    res.json(process.env.MESSAGE_STYLE == "uppercase" ? {"message":"HELLO JSON"} : {"message":"Hello json"} );
})

app.get("/:word/echo", function(req,res){
    res.json({"echo":req.params.word});
})

app.get("/now", function(req, res, next){
        req.time = new Date().toString();
        next();
    },
    function(req, res){
        res.json({"time": req.time});
    }
);

app.route("/name")
    .get(function(req,res){
        res.json({"name": req.query.first+" "+req.query.last});
    })
    .post(function(req,res){

    });




 module.exports = app;
