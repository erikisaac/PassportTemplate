var express = require('express');
var router = express.Router();

var test = true;

if (test == true) {
	router.use(express.static('usersonly'));
};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('https://passporttemplate.herokuapp.com/usersonly/index2.html');
});

module.exports = router;
