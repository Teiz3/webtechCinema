/*
    router to route the /movies url
*/
var express = require('express');
var router = express.Router();
var path = require('path');

var sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.join(__dirname, '../database/cinema.db'));

/* GET request to /movies/nameofthemovie listing. */
router.get('/:movie', function(req, res, next) {
    if(req.session.user){
        res.render('description', {title: req.params.movie, loggedIn: true});
    }
    else{
        res.render('description', {title: req.params.movie, loggedIn: false});
    }
        
});

module.exports = router;
