var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.post('../public', passport.authenticate('local', { successRedirect: '../public', successFlash: true, successFlash: 'Erik Note: Success flash!', failureRedirect: '../public', failureFlash: 'Erik Note: Failure flash!', failureFlash: true })
);

module.exports = router;