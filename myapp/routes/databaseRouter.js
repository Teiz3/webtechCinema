var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var path = require('path');

const file = path.join(__dirname, '../database/cinema.db');
console.log("database.js router file: " + file);
const db = new sqlite3.Database(file);

router.get('/', function(req, res, next){
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let sql = 'SELECT * FROM Movies WHERE Movies.movieid BETWEEN ' + page*limit + ' AND ' + (page + 1)*limit;
    // console.log("database.js router sql: " + sql);
    db.all(sql, [], (err, rows) => {
      if(err){
        throw(err);
      }
      //   console.log(rows);
      res.json(JSON.stringify(rows));
    })
  })
  
  router.get('/desc', function(req, res, next){
    console.log("db/desc router activated");
    const movie = req.query.movie;
    let sql = 'SELECT * FROM Movies WHERE Movies.title = ' + '"' + movie + '"';
    console.log("database.js router sql: " + sql);
  db.all(sql, [], (err, rows) => {
    if(err){
      throw(err);
    }
    res.json(JSON.stringify(rows));
  })
})

module.exports = router;