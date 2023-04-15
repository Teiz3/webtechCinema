var express = require('express');
var router = express.Router();
var path = require('path');

const jsStringify = require('js-stringify');
var sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.join(__dirname, '../database/cinema.db'));

/* GET users listing. */
router.get('/:movie', function(req, res, next) {
    if(req.session.user){
        res.render('description', {title: req.params.movie, loggedIn: true});
    }
    else{
        res.render('description', {title: req.params.movie, loggedIn: false});
    }
        
});

module.exports = router;
