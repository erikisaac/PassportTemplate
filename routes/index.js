var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

// router.get('/usersonly', function(req, res, next) {
//   res.sendFile('index2.html', { root: '.usersonly' });
// });

module.exports = router;
