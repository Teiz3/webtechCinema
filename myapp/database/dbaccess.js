/*
    This file is used to store functions that access the database but are not allowed to change the database
*/

var path = require('path');
const { READONLY } = require("sqlite3");

// var express = require('express');

//get the database
var sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.join(__dirname, 'database/cinema.db'), READONLY);

console.log("dbaccess");
// movieLength();

function movieLength(){
    console.log("movielengthcode");
    console.log(db.run('SELECT COUNT(*) FROM Movies'));
}

module.exports = {movieLength};