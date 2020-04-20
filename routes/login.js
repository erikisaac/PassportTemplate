var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res, next) {
	path.join(__dirname, '/public');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', successFlash: true, successFlash: 'Erik Note: Success flash!', failureRedirect: '/', failureFlash: 'Erik Note: Failure flash!', failureFlash: true })
);

module.exports = router;