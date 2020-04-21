var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var mongodb = require("mongodb");
// var flash = require('connect-flash');


router.post('/', passport.authenticate('local', { successRedirect: 'usersonly/index2.html',
	failureRedirect: '/'})
);

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb:Yellow1972!//heroku_3zgk6kbj:@ds155674.mlab.com:55674/heroku_3zgk6kbj", function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    };

myMongoDB = client.db("heroku_3zgk6kbj");

passport.use(new LocalStrategy({
  passReqToCallback : true
}, 
function(req, username, password, done) {
    myMongoDB.collection('users').findOne({ 'username': username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  myMongoDB.collection('users').findOne({ 'id': id }, function(err, user) {
    done(err, user);
  });
});

});

module.exports = router;
