// #!/usr/bin nodejs
var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});

// var express = require("express");
// var path = require("path");
// var app = express();

// var staticPath = path.join(__dirname, "static");
// app.use(express.static(staticPath));

const express = require('express');
const app = express();

app.get('/', function(request, response){
    response.sendFile('absolutePathToYour/htmlPage.html');
});

res.end("test.html");

}).listen(8022,'localhost');


