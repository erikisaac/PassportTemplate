var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

module.exports = router;