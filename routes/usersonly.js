var express = require('express');
var router = express.Router();


function authenticateUser() {
	if (req.isAuthenticated()) {
		router.use(express.static('usersonly'));
	};
};

/* GET home page. */
router.get('/', function(req, res, next) {
	authenticateUser();
	// res.sendFile('');
});

module.exports = router;
