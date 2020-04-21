var express = require('express');
var router = express.Router();


function authenticateUser(req) {
	if (req.isAuthenticated()) {
		router.use(express.static('usersonly'));
	};
};

/* GET home page. */
router.get('/index2.html', function(req, res, next) {
	authenticateUser(req);
	// res.sendFile('');
});

module.exports = router;
