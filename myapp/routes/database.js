var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var path = require('path');

const file = path.join(__dirname, '../database/cinema.db');
console.log("database.js router file: " + file);
const db = new sqlite3.Database(file);

router.get('/', function(req, res, next){
    const page = req.query.page;
    const limit = req.query.limit;
    let sql = 'SELECT * FROM Movies WHERE Movies.movieid =' + '"' + page + '"';
    db.all(sql, [], (err, rows) => {
      if(err){
        throw(err);
      }
    //   console.log(rows);
      res.json(JSON.stringify(rows));
    })
  })

module.exports = router;