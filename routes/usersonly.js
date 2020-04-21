var express = require('express');
var router = express.Router();

var test = false;

if (test = true) {
	router.use(express.static('usersonly'));
};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('');
});

module.exports = router;
