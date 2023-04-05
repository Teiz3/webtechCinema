//routing and express requirements
var express = require('express');
var router = express.Router();
var path = require('path');

var fs = require("fs");

//getting/creating database
console.log("dbmanger file path correction");
var file = path.join(__dirname, 'cinema.db');
console.log("file after join: " + file);
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var cinemaDb = new sqlite3.Database(file);
console.log("dbmaneger cinemaDb: " + cinemaDb);

//accessing the db
cinemaDb.serialize(function(){
    console.log(exists);
    if(!exists){
        console.log("dbmanger if(!exists) running");
        console.log("db setup run");
        //creating the tables
        cinemaDb.run("CREATE TABLE Movies (movieid INT UNIQUE, title TEXT NOT NULL UNIQUE, desc TEXT, image TEXT, trailer TEXT, PRIMARY KEY(movieid))");
        // cinemaDb.run("CREATE TABLE RegisteredUsers (userid INT, name TEXT, email TEXT, street TEXT, streetno INT, login TEXT, password TEXT, creditcard INT)");
        
        //connecting dbfill file to fill the database with data
        var dbfill = require("./dbfill");
        dbfill.fillMovies();
    }
});

console.log("dbmanger dbclose statement");
cinemaDb.close();

console.log("dbManager end file");
module.exports = router;