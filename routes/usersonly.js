var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', checkAuthentication, function(req,res){
    router.use(express.static('usersonly'));
    res.sendFile((path.join(__dirname, '../usersonly/index2.html')));
});

function checkAuthentication(req,res,next){
	if(req.isAuthenticated()){

        next();
    } else {
        res.redirect("/");
    }
};

module.exports = router;
