//routing and express requirements
var express = require('express');
var router = express.Router();



var dbfill = require("./dbfill");
dbfill.regenerateDatabase();
    
    
    

module.exports = router;