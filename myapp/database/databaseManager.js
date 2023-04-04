//routing and express requirements
var express = require('express');
var router = express.Router();

var fs = require("fs");

//getting/creating database
var file = "database/cinema.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var cinemaDb = new sqlite3.Database(file);

//accessing the db
cinemaDb.serialize(function(){
    console.log(exists);
    // if(!exists){
        console.log("db setup run");
        //creating the tables
        cinemaDb.run("CREATE TABLE Movies (movieid INT UNIQUE, title TEXT NOT NULL UNIQUE, desc TEXT, image TEXT, PRIMARY KEY(movieid))");
        // cinemaDb.run("CREATE TABLE RegisteredUsers (userid INT, name TEXT, email TEXT, street TEXT, streetno INT, login TEXT, password TEXT, creditcard INT)");
        
        //connecting dbfill file to fill the database with data
        var dbfill = require("./dbfill");
        dbfill.fillMovies();
    // }
});

cinemaDb.close();

module.exports = router;