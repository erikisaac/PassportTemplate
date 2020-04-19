var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Erik added this for Passport
// var passport = require('passport')
// var Strategy = require('passport-local').Strategy;
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
// var userDB = require('./userDB/users');
// var User = require('./userDB');
// var passport = require('passport')
//   , OAuthStrategy = require('passport-oauth').OAuthStrategy;
// var passport = require('passport');
// var Strategy = require('passport-local').Strategy;
var session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var loginRouter = require('./routes/login');

var app = express();

// Erik added this for Passport
// app.use(express.session({ secret: 'secret' }));
app.use(passport.initialize());
// app.use(express.session());
// app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// var LocalUserSchema = new mongoose.Schema({
// username: String,
// salt: String,
// hash: String
// });

var User = {"username" : "erik", "password" : "1234"};

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//     User.findOne({
//         _id: id
//     }, '-password -salt', function(err, user) {
//         done(err, user);
//     });
// });

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  userDB.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// view engine setup
app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);

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
