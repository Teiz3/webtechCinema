/*
  Router for all requests with /db, used to get and post data from the database
*/

/*Require all needed modules*/
var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var bcrypt = require('bcrypt');

/*get the database by its file location and open it*/
const file = path.join(__dirname, '../database/cinema.db');
console.log("database.js router file: " + file);
const db = new sqlite3.Database(file);

/*get request router for /db. Used by homepage to load movies from db*/
router.get('/', function(req, res, next){
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let sql = 'SELECT * FROM Movies WHERE Movies.movieid BETWEEN ' + page*limit + ' AND ' + (page + 1)*limit;
    // console.log("database.js router sql: " + sql);
    db.all(sql, [], (err, rows) => {
      if(err){
        throw(err);
      }
      //   console.log(rows);
      res.json(JSON.stringify(rows));
    })
  })

  router.get('/schedule', function(req, res, next){
    const weekDay = req.query.weekday;
    let sqlSchedule = 'SELECT weekday, time, Schedule.movieid, title, image FROM Schedule INNER JOIN Movies ON Schedule.movieid = Movies.movieid WHERE weekday = ?';
    // console.log("database.js router sql: " + sql);
    db.all(sqlSchedule, [weekDay], (err, rows) => {
      if(err){
        throw(err);
      }
      //   console.log(rows);
      res.json(JSON.stringify(rows));
    })
  })

  
/*get router for /db/desc, used by the descriptionpage to fetch data of 1 movie from db*/
router.get('/desc', function(req, res, next){
  console.log("db/desc router activated");
  const movie = req.query.movie;
  let sql = 'SELECT * FROM Movies WHERE Movies.title = ' + '"' + movie + '"';
  console.log("database.js router sql: " + sql);
  db.all(sql, [], (err, rows) => {
    if(err){
      throw(err);
    }
    res.json(JSON.stringify(rows));
  })
})

/*POST router for /db/users/signup. Used to store new users in the database*/
router.post('/users/signup', async (req, res) => {
  try{
      console.log(req.body.username);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const sqlInsertUser = 'INSERT INTO RegisteredUsers(userid, username, email, password) VALUES (?, ?, ?, ?)';
      const prepStmt = db.prepare(sqlInsertUser);
      prepStmt.run(Date.now().toString(), req.body.username, req.body.email, hashedPassword);
      res.redirect('../../users/login')
  }catch{
    res.redirect('../../users/signup');
  }
})

router.post('/users/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userSql = 'SELECT username, password FROM RegisteredUsers WHERE username = ?';

  db.get(userSql, [username], async (err, user) => {
    if(err){
      console.error(err.message);
      res.status(500).send('Server Error');
      return;
    }
    if(!user){
      console.log('User not found');
      res.status(401).send('User not found');
      return;
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if(passwordCorrect){
      console.log('You are logged in');
      console.log(user);
      req.session.user = user; //creates session with user object
      res.redirect('../../');
    }
    else{
      console.log('You are NOT logged in');
      res.send('Login fail');
    }
  })

});

router.get('/profile', (req, res) => {
  const profileSQL = 'SELECT * FROM RegisteredUsers WHERE username = ?';
  db.all(profileSQL, req.session.user.username, (err, rows) => {
    if(err){
      throw(err);
    }
    res.json(JSON.stringify(rows));
  })
})


module.exports = router;