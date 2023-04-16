/*
  Main server file
*/
//require statements
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const session = require('express-session');
const options = {secret: 'The cake is a lie', resave: false, saveUninitialized: true, cookie: {secure: false}};
app.use(session(options));

/*require router files*/
var indexRouter = require('./routes/indexRouter');
var descriptionRouter = require('./routes/descriptionRouter');
var usersRouter = require('./routes/usersRouter');
var databaseRouter = require('./routes/databaseRouter');

var fs = require("fs");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//standard settings like logging and static files
const logStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' });
app.use(logger('dev', {stream: logStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use the routers
app.use('/', indexRouter);
app.use('/movie', descriptionRouter);
app.use('/users', usersRouter);
app.use('/db', databaseRouter);

//database setup (now only used to regenerate the database during development)
var databaseManager = require('./database/databaseManager');
app.use('/', databaseManager);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
