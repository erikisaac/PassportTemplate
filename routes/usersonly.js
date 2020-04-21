var express = require('express');
var router = express.Router();

router.use(express.static('usersonly'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index2.html', { root: __dirname });
});

module.exports = router;
