var express = require('express');
var router = express.Router();

/* GET Userlogin page. */
router.route("/login").get((req, res) => {
  res.render('userlogin', {title: 'Express'})
}).post((req, res) => {

});

/* Routing for /signup page, GET and POST requests*/
router.route("/signup").get((req, res) => {
  res.render('usersignup', {title: 'Express'})
}).post((req, res) => {

});

module.exports = router;
