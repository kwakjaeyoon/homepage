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



router.get("/admin_log.html",function(req,res){
    var main=fs.readFileSync('html/admin_log.html','utf8');
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
                 res.redirect('/admin.html');
            }
        }else{
        res.send('<script>alert("관리자 권한이 없는 계정입니다.");location.href="/"</script>');
        }}); 
     }else{
            res.send('<script>alert("입력해주세요.");location.href="/"</script>')
        }
    }); 

        router.get("/logout",function(req,res){
            req.session.destroy();
            res.send('<script>alert("로그아웃 되었습니다.");location.href="/l"</script>')
             console.log("logout success");
             
        });

        router.get('/admin.html',function(req,res,next){
            if(!req.session.name && req.session.admin!="admin"){
                console.log("접속실패");
                res.send('<script>alert("접근권한이 없습니다.");location.href="/login.html"</script>');
            }else{   
            var sql='select * from lab.login';
            var sql2='select * from lab.info  ;';
            var sql3='select * from lab.comment  ;';
            var sql4='select * from lab.category ;'; 
            connection.query(sql4,function(err,rows4){        
                connection.query(sql3,function(err,rows3){         
                    connection.query(sql2,function(err,rows2){
                        connection.query(sql,function(err,rows){
                            if(err) console.log(err);
                            res.render('../html/admin.html',{rows:rows, rows2:rows2, rows3:rows3, rows4:rows4});
                            console.log("list page");
                        });
                    });  
                });
            });          
        }
        });

        router.get('/write/:table',function(req,res,next){
            var table=req.params.table;
            if(!req.session.name && req.session.admin!="admin"){
                console.log("접속실패");
                res.send('<script>alert("접근권한이 없습니다.");location.href="/login.html"</script>');
            }else{ 
            sql="select *from lab.login";
            connection.query(sql,function(err,rows){
                if(err) console.log(err);
                console.log(id);
                res.render('../html/admin_create.html',{table:table} );
                console.log("admin_write page");
            });
        }
        });

        router.post('/write/user',function(req,res){
            if(!req.session.name && req.session.admin!="admin"){
                console.log("접속실패");
                res.send('<script>alert("접근권한이 없습니다.");location.href="/login.html"</script>');
            }else{ 
                var id=req.body.id;
                var pwd=req.body.pwd;
                var auth=req.body.auth;
                var name=req.body.name;
                var sql='INSERT INTO login  VALUES(?,?,?,?);';
                var param=[id,sha256(pwd),auth,name];
        
            connection.query(sql,param,function(err,rows){
                if(err) console.log(err);
                console.log(param);
                res.redirect('/admin.html');
            });
        }
        });


        router.post('/write/category',function(req,res){
            if(!req.session.name && req.session.admin!="admin"){
                console.log("접속실패");
                res.send('<script>alert("접근권한이 없습니다.");location.href="/login.html"</script>');
            }else{ 
            var cat_num=req.body.cat_num;
            var category=req.body.category;
            var sql='INSERT INTO category  VALUES(?,?);';
            var param=[cat_num,category];
    
        connection.query(sql,param,function(err,rows){
            if(err) console.log(err);
            console.log(param);
            res.redirect('/admin.html');
        });
    }
    });

    router.get('/delete/:id',function(req,res){
        var id=req.params.id;
        var sql='delete  from login where `id`=?;' 
        var param=[id];
            if(req.session.admin=="admin"){
                    connection.query(sql ,param,function(err,rows){
                    if(err) console.log(err);  
                    res.redirect('/admin.html');
            });
            }else{
                res.send('<script>alert("삭제할 수 없습니다.");location.href="/admin.html"</script>');
            }
    });

    router.get('/delete/info/:order',function(req,res){
        var order=req.params.order;
        var sql2='delete  from comment where `order`=?;' 
        var sql='delete  from info where `order`=?;' 
        var param=[order];
            if(req.session.admin=="admin"){
                connection.query(sql2 ,param,function(err,rows3){
                    connection.query(sql ,param,function(err,rows2){
                    if(err) console.log(err);  
                    res.redirect('/admin.html');
                });
            });
            }else{
                res.send('<script>alert("삭제할 수 없습니다.");location.href="/admin.html"</script>');
            }
    });

    router.get('/delete/info/:file/:order',function(req,res){
        var order=req.params.order;
        var file=__dirname+'/upload/'+ req.params.file;
        var sql2='delete  from comment where `order`=?;' 
        var sql='delete  from info where `order`=?;' 
        var param=[order];
            if(req.session.admin=="admin"){
                connection.query(sql2 ,param,function(err,rows3){
                    connection.query(sql ,param,function(err,rows2){
                    if(err) console.log(err);  
                    fs.unlinkSync(__dirname+'/upload/'+ req.params.file);
                    res.redirect('/admin.html');
                });
            });
            }else{
                res.send('<script>alert("삭제할 수 없습니다.");location.href="/admin.html"</script>');
            }
    });

    router.get('/delete/comment/:com_no',function(req,res){
        var com_no=req.params.com_no;
        var sql='delete  from comment where `com_no`=?;' 
        var param=[com_no];
            if(req.session.admin=="admin"){
                    connection.query(sql ,param,function(err,rows3){
                    if(err) console.log(err);  
                    res.redirect('/admin.html');
            });
            }else{
                res.send('<script>alert("삭제할 수 없습니다.");location.href="/admin.html"</script>');
            }
    });
    
    router.get('/delete/category/:category',function(req,res){
        var category=req.params.category; 
        var sql='delete from category where `cat_num`=?;' 
        var param=[category];
            if(req.session.admin=="admin"){
                    connection.query(sql ,param,function(err,rows4){
                    if(err) console.log(err);  
                    res.redirect('/admin.html');
            });
            }else{
                res.send('<script>alert("삭제할 수 없습니다.");location.href="/admin.html"</script>');
            }
    });


 

        
    
    

    module.exports = router;