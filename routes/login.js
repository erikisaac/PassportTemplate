var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.get('/login', function(req, res, next) {
	res.render('/public/index.html');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', successFlash: true, successFlash: 'Erik Note: Success flash!', failureRedirect: '/', failureFlash: 'Erik Note: Failure flash!', failureFlash: true })
);

module.exports = router;