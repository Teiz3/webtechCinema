/*
    routes on the home page and order page
*/
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
    if(req.session.user){
        //user is logged in
        res.render('order', {title: 'Popcorn Cinema', loggedIn: true});
    }
    else{
        //user is not logged in and thus has no access to order page
        res.render('index', {title: 'Popcorn Cinema'});
    }
    
})
module.exports = router;