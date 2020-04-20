var express = require('express');
var router = express.Router();

router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = router;