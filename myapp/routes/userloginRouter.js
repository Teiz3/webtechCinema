var express = require('express');
var router = express.Router();

/* GET Userlogin page. */
router.get('/', function(req, res, next) {
  res.render('userlogin', {title: 'Express'});
});

module.exports = router;