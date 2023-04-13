var express = require('express');
var router = express.Router();

// const session = require('express-session');
// const options = {secret: 'The cake is a lie', resave: false, saveUninitialized: true, cookie: {secure: false}};
// router.use(session(options));

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

router.get('/profile', function (req, res) {
  if(req.session.user){
    const username = req.session.user.username;
    res.send('Welcome ' + username);
  }
  else{
    res.status(401).send('You must be logged in to access this page');
  }
});

module.exports = router;
