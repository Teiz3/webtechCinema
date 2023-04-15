/*
  Router for all requests with /db, used to get and post data from the database
*/

/*Require all needed modules*/
var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var bcrypt = require('bcrypt');
const { error } = require('console');

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
    console.log("schedule router got request: " + req.url);
    const date = req.query.date;
    const dateconverted = date.replace("-", "/").replace("-", "/");
    console.log("dateconverted: " + dateconverted);
    let sqlSchedule = 'SELECT weekday, time, Schedule.movieid, title, date, image FROM Schedule INNER JOIN Movies ON Schedule.movieid = Movies.movieid WHERE date = ?';
    console.log("sqlSchedule: " + sqlSchedule);
    db.all(sqlSchedule, [dateconverted], (err, rows) => {
      console.log("direct response, err: " + err + ", rows(JSON stringified): " + JSON.stringify(rows))
      if(err){
        console.log("error: "+err);
        throw(err);
      }
      console.log("response: " + rows);
      res.json(JSON.stringify(rows));
    })
  })

  router.get('/order/confirm', (req, res) => {
    const scheduleid = req.query.schedule;
    const ticketAmount = req.query.tickets;
    if(req.session.user){
      const userid = req.session.user.userid;
      const date = new Date(Date.now()).toLocaleDateString();
      console.log("date "+date);
      const prepStmt = db.prepare('INSERT INTO Orders(orderid, schedule, user, date, nroftickets) VALUES (?, ?, ?, ?, ?)');
      prepStmt.run(Date.now(), scheduleid, userid, date, ticketAmount);
      prepStmt.finalize();
    }else{
      res.send("you need to be logged in in order to buy tickets");
    }

    console.log("order confirmed!");
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
    let loggedIn = false;
    if(req.session.user){
      loggedIn = true;
    }
    rows[1] = {"loggedIn": loggedIn};
    res.json(JSON.stringify(rows));
  })
})

/*get router for /db/desc, used by the descriptionpage to fetch data of 1 movie from db*/
router.get('/order', (req, res, next) => {
  const movieid = req.query.movieid;
  // req.session.user.movieid = movieid;
  let ordermoviesql = 'SELECT movieid, title, image FROM Movies WHERE Movies.movieid = ' + movieid;
  let orderschedulesql = 'SELECT scheduleid, date, weekday, time FROM Schedule WHERE movieid = ' + movieid;
  let response = [];
  db.all(ordermoviesql, [], (err, rows) => {
    if(err){
      throw(err);
    }
    response[0] = rows;
  })
  db.all(orderschedulesql, [], (err, rows) => {
    if(err){
      throw(err);
    }
    response[1] = rows;
    res.json(JSON.stringify(response));
  })
})

/*POST router for /db/users/signup. Used to store new users in the database*/
router.post('/users/signup', async (req, res) => {
  try{
      console.log(req.body.username);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const hashedCreditcard = await bcrypt.hash(req.body.creditcard, 10);
      const sqlInsertUser = 'INSERT OR IGNORE INTO Users(userid, fullname, username, password, email, creditcard, street, streetno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const prepStmt = db.prepare(sqlInsertUser);
      prepStmt.run(Date.now().toString(), req.body.fullname, req.body.username, hashedPassword, req.body.email, hashedCreditcard, req.body.street, req.body.streetno);
      res.redirect('../../users/login')
  }catch{
    res.redirect('../../users/signup');
  }
})

router.post('/users/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userSql = 'SELECT * FROM Users WHERE username = ?';

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
  const profileSQL = 'SELECT * FROM Users WHERE userid = ?';
  db.all(profileSQL, req.session.user.userid, (err, rows) => {
    if(err){
      throw(err);
    }
    res.json(JSON.stringify(rows));
  })
})

router.get('/profile/orders', (req, res) => {
  const ordersSQL = 'SELECT title, weekday, Schedule.date, time, nroftickets FROM Orders INNER JOIN Schedule ON Orders.schedule = Schedule.scheduleid INNER JOIN Movies ON Schedule.movieid = movies.movieid WHERE user = ?';
  db.all(ordersSQL, req.session.user.userid, (err, rows) => {
    if(err){
      throw(err);
    }
    res.json(JSON.stringify(rows));
  })
})


router.post('/changeprofile', async (req, res) => {
  try{
  const fullName = req.body.fname;
  const userName = req.body.uname;
  const email = req.body.email;
  const street = req.body.street;
  const streetno = req.body.streetno;
  const password = req.body.password;
  const creditcard = req.body.creditcard;
  if(fullName){
    let fullNameSql = 'UPDATE Users SET fullname = ? WHERE userid = ?';
    const prepStmt = db.prepare(fullNameSql);
    prepStmt.run(fullName, req.session.user.userid);
    res.redirect('../../users/login');  
  }
  if(userName){
    let usernameSql = 'UPDATE Users SET username = ? WHERE userid = ? AND username <> ? AND NOT EXISTS (SELECT 1 FROM Users WHERE username = ?)';
    const prepStmt = db.prepare(usernameSql);
    prepStmt.run(userName, req.session.user.userid, userName, userName);
    res.redirect('../../users/login'); 
  }
  if(email){
    let emailSql = 'UPDATE Users SET email = ? WHERE userid = ?';
    const prepStmt = db.prepare(emailSql);
    prepStmt.run(email, req.session.user.userid);
    res.redirect('../../users/login'); 
  }
  if(street){
    let streetSql = 'UPDATE Users SET street = ? WHERE userid = ?';
    const prepStmt = db.prepare(streetSql);
    prepStmt.run(street, req.session.user.userid);
    res.redirect('../../users/login'); 
  }
  if(streetno){
    let streetNoSql = 'UPDATE Users SET streetno = ? WHERE userid = ?';
    const prepStmt = db.prepare(streetNoSql);
    prepStmt.run(streetno, req.session.user.userid);
    res.redirect('../../users/login'); 
  }
  if(password){
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let passwordSql = 'UPDATE Users SET password = ? WHERE userid = ?';
    const prepStmt = db.prepare(passwordSql);
    prepStmt.run(hashedPassword, req.session.user.userid);
    res.redirect('../../users/login'); 
  }
  if(creditcard){
    const hashedCreditcard = await bcrypt.hash(req.body.creditcard, 10);
    let creditcardSql = 'UPDATE Users SET creditcard = ? WHERE userid = ?';
    const prepStmt = db.prepare(creditcardSql);
    prepStmt.run(hashedCreditcard, req.session.user.userid);
    res.redirect('../../users/login');
  }
  }
  catch(error){
    console.log(error);
    res.redirect('../../users/signup');
  }
  
})


module.exports = router;