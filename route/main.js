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
    res.redirect('/cite.html');
});

router.get("/cite.html",function(req,res){
    if(!req.session.name){
        var sess=req.session.name;
        var main=fs.readFileSync('html/cite.html','utf8');
        res.send(main);
        console.log("main page");
    }
    else{
        res.redirect('/logout.html');
    }
});

router.get("/history.html",function(req,res){
    if(!req.session.name){
        var main=fs.readFileSync('html/history.html','utf8');
        res.send(main);
        console.log("history page");
        }
        else{
            res.redirect('/history_out.html');
        }
});

router.get("/info.html",function(req,res){
    if(!req.session.name){
        var main=fs.readFileSync('html/info.html','utf8');
        res.send(main);
        console.log("information page");
        }
        else{
            res.redirect('/info_out.html');
        }
});

router.get("/location.html",function(req,res){
    if(!req.session.name){
        var main=fs.readFileSync('html/location.html','utf8');
        res.send(main);
        console.log("location page");
    }
    else{
        res.redirect('/location_out.html');
    }
});

router.get("/member.html",function(req,res){
    if(!req.session.name){
        var main=fs.readFileSync('html/member.html','utf8');
        res.send(main);
        console.log("member page");
        }
        else{
            res.redirect('/member_out.html');
        }
});

router.get("/photo.html",function(req,res){
    if(!req.session.name){
        var main=fs.readFileSync('html/photo.html','utf8');
        res.send(main);
        console.log("lab photo page");
        }
        else{
            res.redirect('/photo_out.html');
        }
});

router.get("/project.html",function(req,res){
    if(!req.session.name){
        var main=fs.readFileSync('html/project.html','utf8');
        res.send(main);
        console.log("project page");
        }
        else{
            res.redirect('/project_out.html');
        }
});

router.get("/create.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
        }
        else{
            res.redirect('/create_out.html');
        }
});


router.get("/logout.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인이 되어있지 않습니다.");location.href="/cite.html"</script>');
        }else{
    var main=fs.readFileSync('html/logout.html','utf8');
    res.send(main);
    console.log("main page");
    }
});

router.get("/history_out.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인이 되어있지 않습니다.");location.href="/history.html"</script>');
    }else{
    var main=fs.readFileSync('html/history_out.html','utf8');
    res.send(main);
    console.log("history page");
    }
});

router.get("/info_out.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인이 되어있지 않습니다.");location.href="/info.html"</script>');
        }else{
    var main=fs.readFileSync('html/info_out.html','utf8');
    res.send(main);
    console.log("information page");
    }
});

router.get("/location_out.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인이 되어있지 않습니다.");location.href="/location.html"</script>');
        }else{
    var main=fs.readFileSync('html/location_out.html','utf8');
    res.send(main);
    console.log("location page");
    }
});

router.get("/member_out.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인이 되어있지 않습니다.");location.href="/member.html"</script>');
        }else{
    var main=fs.readFileSync('html/member_out.html','utf8');
    res.send(main);
    console.log("member page");
    }
});

router.get("/photo_out.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인이 되어있지 않습니다.");location.href="/photo.html"</script>');
        }else{
    var main=fs.readFileSync('html/photo_out.html','utf8');
    res.send(main);
    console.log("lab photo page");
    }
});

router.get("/project_out.html",function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인이 되어있지 않습니다.");location.href="/project.html"</script>');
        }else{
    var main=fs.readFileSync('html/project_out.html','utf8');
    res.send(main);
    console.log("project page");
    }
});

router.get("/create_out.html",function(req,res){
    if(!req.session.name){
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
        }else{
    var main=fs.readFileSync('html/create_out.html','utf8');
    res.send(main);
    console.log("write page");}}
);



module.exports = router;
