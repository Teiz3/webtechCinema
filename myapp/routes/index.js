var express = require('express');
var router = express.Router();

const jsStringify = require('js-stringify');

// const { READONLY } = require("sqlite3");
var sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('database/cinema.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  //sql
  let sql = 'SELECT * FROM Movies';
  db.all(sql, [], (err, rows) => {
    if(err){
      throw(err);
    }
    // console.log(rows);
    res.render('index', { title: 'Express', dbMovies: rows, jsStringify, rows}); //jsStringify, rows
  });
});

module.exports = router;
