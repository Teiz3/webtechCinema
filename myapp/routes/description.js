var express = require('express');
var router = express.Router();

const jsStringify = require('js-stringify');
var sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('database/cinema.db');

/* GET users listing. */
router.get('/:movie', function(req, res, next) {
    console.log("req.params.movie: " + req.params.movie);
    let sql = 'SELECT * FROM Movies WHERE Movies.title =' + '"' + req.params.movie + '"';
    console.log("sql: " + sql);
    db.all(sql, [], (err, rows) => {
        if(err){
            throw(err);
        }
        res.send(rows);
        // res.render('description', {movie: req.params, title: req.params.movie});
    });
});

module.exports = router;
