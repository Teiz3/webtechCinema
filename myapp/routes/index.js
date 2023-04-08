console.log("index.js router start file");
var express = require('express');
var router = express.Router();
var path = require('path');

const jsStringify = require('js-stringify');

// const { READONLY } = require("sqlite3");
var sqlite3 = require("sqlite3").verbose();
console.log("index.js database access");
const file = path.join(__dirname, '../database/cinema.db');
console.log("index.js router file: " + file);
const db = new sqlite3.Database(file);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Popcorn Cinema'}); 
});



module.exports = router;
