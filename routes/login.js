var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.post('/', passport.authenticate('local', { successRedirect: '/', successFlash: true, successFlash: 'Erik Note: Success flash!', failureRedirect: '/', failureFlash: 'Erik Note: Failure flash!', failureFlash: true })
);

module.exports = router;