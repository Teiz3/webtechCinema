console.log("index.js router start file");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Popcorn Cinema'}); 
});

module.exports = router;