var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const session = require('express-session');
const options = {secret: 'The cake is a lie', resave: false, saveUninitialized: true, cookie: {secure: false}};
app.use(session(options));

// /*require modules for user login*/
// var bcrypt = require('bcrypt');
// var passportModule = require('passport');
// var flash = require('express-flash');
// var session = require('express-session');

// /*passport handling*/
// app.use(flash());
// app.use(session({
//   secret: "secret",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passportModule.initialize());
// app.use(passportModule.session());

/*require router files*/
var indexRouter = require('./routes/indexRouter');
var descriptionRouter = require('./routes/descriptionRouter');
var usersRouter = require('./routes/usersRouter');
// var loginRouter = require('./routes/userloginRouter');
// var signupRouter = require('./routes/usersignupRouter');
var databaseRouter = require('./routes/databaseRouter');

var fs = require("fs");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movie', descriptionRouter);
app.use('/users', usersRouter);
// app.use('/login', loginRouter);
// app.use('/signup', signupRouter);
app.use('/db', databaseRouter);

//database setup
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
