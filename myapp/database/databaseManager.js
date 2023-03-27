var express = require('express');
var router = express.Router();

var fs = require("fs");

var file = "database/cinema.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var cinemaDb = new sqlite3.Database(file);

console.log("database is managed");

module.exports = router;