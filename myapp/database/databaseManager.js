var express = require('express');
var router = express.Router();

var fs = require("fs");

var file = "database/cinema.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var cinemaDb = new sqlite3.Database(file);

cinemaDb.serialize(function(){
    if(!exists){
        cinemaDb.run("CREATE TABLE Movies (movieid INT, title TEXT, desc TEXT)");
        // cinemaDb.run("CREATE Table RegisteredUsers (userid INT, name TEXT, email TEXT, street TEXT, streetno INT, login TEXT, password TEXT, creditcard INT)");
    }

    var movieAttributes = cinemaDb.prepare("INSERT INTO Movies VALUES (?, ?, ?)");
    movieAttributes.run(1, "Interstellar", "This is the interstellar movie");
    movieAttributes.finalize();
});

cinemaDb.close();

console.log("database is managed");

module.exports = router;