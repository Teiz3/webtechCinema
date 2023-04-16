/*
  router for the user profile, signup and login
*/
var express = require('express');
var router = express.Router();

/* GET Userlogin page. */
router.route("/login").get((req, res) => {
  if(req.session.user){
    res.redirect('profile');
  }
  else{
    res.render('userlogin', {title: 'Express'})
  }
}).post((req, res) => {

});

/* Routing for /signup page, GET and POST requests*/
router.route("/signup").get((req, res) => {
  res.render('usersignup', {title: 'Express'})
}).post((req, res) => {

});

/* Routing for /profile page*/
router.get('/profile', function (req, res) {
  if(req.session.user){
    const username = req.session.user.username;
    res.render('profile', {loggedIn: true});
  }
  else{
    res.status(401).send('You must be logged in to access this page');
  }
});

/* Routing for /logout */
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if(err){
      console.error(err.message);
      res.status(500).send('Server Error');
      return;
    }
    res.redirect('../users/login'); // Redirect to login page after logout
  });
});

module.exports = router;
