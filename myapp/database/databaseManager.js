/*
    Internal file, used to regenerate the database when needed during development
*/

//routing and express requirements
var express = require('express');
var router = express.Router();

//remove comment to regenerate database using dbfill
// var dbfill = require("./dbfill");
// dbfill.regenerateDatabase();
    
module.exports = router;