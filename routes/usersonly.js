var express = require('express');
var router = express.Router();
var path = require('path');

// function authenticateUser(req) {
// 	if (req.isAuthenticated()) {
// 		router.use(express.static('usersonly'));
// 	};
// };

//  GET home page. 
// router.get('/index2.html', function(req, res, next) {
// 	authenticateUser(req);
// 	// res.sendFile('');
// });

router.get('/',checkAuthentication,function(req,res){
    router.use(express.static('usersonly'));
    res.sendFile((path.join(__dirname, '/usersonly')));
});
function checkAuthentication(req,res,next){
	if(req.isAuthenticated()){
    	   
        next();
    } else {
        res.redirect("/");
    }
};

module.exports = router;
