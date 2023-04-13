var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('index', { title: 'Popcorn Cinema', loggedIn: true}); 
    }
    else{
        res.render('index', { title: 'Popcorn Cinema', loggedIn: false}); 
    }
});

/* GET order page */
router.get('/order', (req, res) => {
    res.render('order');
})
module.exports = router;