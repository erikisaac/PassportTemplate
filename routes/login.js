var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var mongodb = require("mongodb");
var flash = require('connect-flash');

var app = express();
app.use(flash());

// router.get('/', function(req, res, next) {
// 	res.render('/public/index.html');
// });


router.post('/', passport.authenticate('local', { successRedirect: '/', successFlash: true, successFlash: 'Erik Note: Success flash!', failureRedirect: '/', failureFlash: 'Erik Note: Failure flash!', failureFlash: true }));

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb:Yellow1972!//heroku_3zgk6kbj:@ds155674.mlab.com:55674/heroku_3zgk6kbj", function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    };

myMongoDB = client.db("heroku_3zgk6kbj");

passport.use(new LocalStrategy({
  passReqToCallback : true
}, function(req, username, password, done) {
    myMongoDB.collection('users').findOne({ 'username': username }, function(err, user) {
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
// console.log(myMongoDB);
});

module.exports = router;