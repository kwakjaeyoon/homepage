var express=require('express');
var fs=require("fs");
var session=require('express-session');
var bodyParser=require('body-parser');
//var FileStore = require('session-file-store')(session);
var mysql=require("mysql");
var sha256=require('sha256');

var router= express.Router();
router.use(bodyParser.urlencoded({extended : true}));


var connection = mysql.createConnection({
    host     : '192.168.99.100',
    user     : 'root',
    password : '123456',
    database : 'lab',
    port     : '3306'
});

router.use('/',session({
    secret:'ics@#!$lab@#$!',
    resave:false,
    saveUninitialized:true
}));



router.get("/admin.html",function(req,res){
    var main=fs.readFileSync('html/admin.html','utf8');
    res.send(main);
    console.log("admin page");
});


 router.post("/admin",function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var auth="Admin";
    if(username&&password){
        connection.query('select *from login where id=? and password=? and auth=? ',[username,sha256(password),auth],function(err,rows){
            if(rows.length>0){
                if(auth=="Admin"){
                req.session.loggedin =true;
                req.session.name=username;
                global.id=req.session.name;
                req.session.admin="admin";
                global.auth=req.session.admin;
                console.log(id);
                console.log(req.session);
                 res.redirect('/');
            }
        }else{
        res.send('<script>alert("관리자 권한이 없는 계정입니다.");location.href="/cite.html"</script>');
        }}); 
     }else{
            res.send('<script>alert("입력해주세요.");location.href="/cite.html"</script>')
        }
    }); 

        router.get("/logout",function(req,res){
            req.session.destroy();
            res.send('<script>alert("로그아웃 되었습니다.");location.href="/cite.html"</script>')
             console.log("logout success");
             
        });


 

        
    
    

    module.exports = router;