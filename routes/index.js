var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/index2', function(req, res, next) {
  res.sendFile('/usersonly/index2.html');
});

module.exports = router;
