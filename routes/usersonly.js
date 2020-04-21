var express = require('express');
var router = express.Router();


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
    //do something only if user is authenticated
    router.use(express.static('usersonly'));
});
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/");
    }
}

module.exports = router;
