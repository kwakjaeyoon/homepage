var express=require('express');
var fs=require("fs");
var session=require('express-session');
var bodyParser=require('body-parser');
var history=require('history');

var login=require('./login');


var router= express.Router();
router.use(bodyParser.urlencoded({extended : true}));
router.use('/',login);


router.get("/",function(req,res){                       //리디렉션 시  무한루프 안걸리도록 할것
    res.redirect('/index.html');
});

router.get("/index.html",function(req,res){
        var sess=req.session.name;
        var main=fs.readFileSync('html/index.html','utf8');
        res.send(main);
        console.log("main page");
});

router.get("/award.html",function(req,res){  
        var main=fs.readFileSync('html/award.html','utf8');
        res.send(main);
        console.log("history page");        
});


router.get("/location.html",function(req,res){   
        var main=fs.readFileSync('html/location.html','utf8');
        res.send(main);
        console.log("location page");
});

router.get("/member.html",function(req,res){   
        var main=fs.readFileSync('html/member.html','utf8');
        res.send(main);
        console.log("member&photo page");      
});

router.get("/project.html",function(req,res){
        var main=fs.readFileSync('html/project.html','utf8');
        res.send(main);
        console.log("project page");
});

router.get("/schedule.html",function(req,res){
    var main=fs.readFileSync('html/schedule.html','utf8');
    res.send(main);
    console.log("schedule page");
});





module.exports = router;
