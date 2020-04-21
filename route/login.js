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
    host     : 'localhost',
    user     : 'root',
    password : 'rokmc171016',
    database : 'lab',
    port     : '3306'
});

router.use(session({
    secret:'!@#$%loginsession!@#$%',
    resave:false,
    saveUninitialized:true
}));

router.use(express.static(__dirname +'/')); 

router.get("/login.html",function(req,res){
    var main=fs.readFileSync('html/login.html','utf8');
    res.send(main);
    console.log("login page");
});

router.post("/login",function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    if(username&&password){
        connection.query('select *from login where id=? and password=?',[username,sha256(password)],function(err,rows){
            if(rows.length>0){console.log(rows);
                req.session.loggedin =true;
                req.session.name=username;
                global.id=req.session.name;
                console.log(id);
                 res.redirect('/');
            }else{
                res.send('<script>alert("아이디 또는 비밀번호가 잘못되었습니다.");location.href="/cite.html"</script>');
            }
            res.end();
        });
     } else{
            res.send('<script>alert("입력해주세요.");location.href="/cite.html"</script>')
        }

        router.get("/logout",function(req,res){
            req.session.destroy();
            res.send('<script>alert("로그아웃 되었습니다.");location.href="/cite.html"</script>')
             console.log("logout success");
             
        });
    
});

module.exports = router;


