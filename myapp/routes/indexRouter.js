var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Popcorn Cinema'}); 
});

/* GET order page */
router.get('/order', (req, res) => {
    res.render('order');
})
module.exports = router;