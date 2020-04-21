var express = require('express');
var router = express.Router();

var text = true;

if (test = true) {
	router.use(express.static('usersonly'));
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('usersonly/index2.html');
});

module.exports = router;
