var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index2, {root: "/usersonly"}');
});

module.exports = router;
