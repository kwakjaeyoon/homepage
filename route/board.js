var express=require('express');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var newDate=require('date-utils');
var login=require('./login');
var multer=require('multer');
var path=require('path');
var fs=require('fs');

var router=express.Router();
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());
router.use(express.static(__dirname +'/')); 
router.use('/',login);

var newDate=new Date();
var storage= multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'route/upload');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});

var upload=multer({storage: storage});




var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'rokmc171016',
    database : 'lab',
    port     : '3306'
});


connection.connect(function(err){
    if(err)  console.log(err);
    else  console.log("connected");

    router.get('/write',function(req,res,next){
        if(!req.session.name){
            console.log("접속실패");
            res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
        }else{
        var sql="select *from lab.login where `id`=? ;";
        connection.query(sql,[id],function(err,rows){
            if(err) console.log(err);
            console.log(id);
            res.render('../html/create_out.html',{rows:rows,id:id} );
            console.log("write page");
        });
    }
    });
        



router.post('/write',upload.single('file'),function(req,res){
    if(!req.file){
    var order=req.body.order;
    var username=req.body.username;
    var title=req.body.title;
    var content=req.body.content;
    var date= newDate.toFormat('YYYY-MM-DD HH24:MI');
    var sql='INSERT INTO info  VALUES(?,?,?,?,?,?,?);';
    var param=[order,username,title,content,date,null,null];
    }else{
        var order=req.body.order;
        var username=req.body.username;
        var title=req.body.title;
        var content=req.body.content;
        var file= req.file.originalname;
        var date= newDate.toFormat('YYYY-MM-DD HH24:MI');
        var sql='INSERT INTO info  VALUES(?,?,?,?,?,?,?);';
        var param=[order,username,title,content,date,null,file];
    }
   

    connection.query(sql,param,function(err,rows){
        if(err) console.log(err);
        console.log(param);
        res.redirect('/board/list');
    });
});


router.get('/list/:page',function(req,res,next){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    order=req.body.order;
    username=req.body.username;
    title=req.body.title;
    content=req.body.content; 
    page=req.params.page;
    var sel='select * from lab.info';
    connection.query(sel,function(err,rows){
        if(err) console.log(err);
        res.render('../html/read_out.html',{rows:rows, page:page, length:rows.length-1, page_num:6, pass:true});
        console.log("list page");
    });
}
});

router.get('/list',function(req,res){
    res.redirect('./list/1');
});



router.get('/detail/:board_no',function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    order=req.body.order;
    username=req.body.username;
    title=req.body.title;
    content=req.body.content;
    file=req.body.file;
    var board_no=req.params.board_no;
    var sql='select * from info';
    
        connection.query(sql,[parseInt(board_no)],function(err,rows){
            if(err) console.log(err);
            res.render('../html/detail_out.html',{rows:rows[board_no-1], board_no:board_no, file:file});
            console.log("세부정보");
        });
    }
});



router.get('/update/:board_no/:order',function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    order=req.body.order;
    title=req.body.title;
    content=req.body.content;
    var board_no=req.params.board_no;
    var sql='select *from info ';
    
        connection.query(sql,[parseInt(board_no)],function(err,rows){
            if(err) console.log(err);
			if(id!==username){
                res.send('<script>alert("수정할 수 없습니다.");location.href="/board/list"</script>');
            }
            res.render('../html/update_out.html',{rows:rows[board_no-1], board_no:board_no});
            console.log("update page");
        });
    }
});



router.post('/update/:board_no/:order',function(req,res){
    var order=parseInt(req.params.order);
    var username=req.body.username;
    var title=req.body.title;
    var content=req.body.content;
    var updt= newDate.toFormat('YYYY-MM-DD HH24:MI');
    var board_no=parseInt(req.params.board_no);
    var sql='update info set  username=?, title=?, content=?, updat=? where `order`=?';
    var param=[username,title,content,updt,order];

    

    connection.query(sql,param,function(err,rows){
        if(err) console.log(err);
        else{
         res.redirect('/board/list');
         console.log(rows);
        }
    });
});


router.post('/:file/:username/:order/delete',function(req,res){
    var order=parseInt(req.params.order);
    var file=__dirname+'/upload/'+ req.params.file;
    var username= req.params.username;
    var sql='delete  from  info where `order`=? ';
    var param=[order];

    if(id!==username){
        res.send('<script>alert("삭제할 수 없습니다.");location.href="/board/list"</script>');
    }else{
    connection.query(sql,param,function(err,rows){
        if(err) console.log(err);
        
        fs.unlinkSync(file);
        res.redirect('/board/list');
        console.log(rows.affectedRows);
    });  
    }
});


router.post('/:username/:order/delete',function(req,res){
    var order=parseInt(req.params.order);
    var username= req.params.username;
    var sql='delete  from  info where `order`=? ';
    var param=[order];

    if(id!==username){
        res.send('<script>alert("삭제할 수 없습니다.");location.href="/board/list"</script>');
    }else{
    connection.query(sql,param,function(err,rows){
        if(err) console.log(err);
        res.redirect('/board/list');
        console.log(rows.affectedRows);
    });  
    }
});


router.get('/search',function(req,res){
    search=req.query.search;
    if(!search) res.send('<script>alert("검색어를 입력해주세요!");location.href="/board/list"</script>');
    else{
    order=req.body.order;
    username=req.body.username;
    title=req.body.title;
    content=req.body.content;
    page=req.params.page;
    var sel='select * from lab.info';
    connection.query(sel,function(err,rows){
        if(err) console.log(err);
        res.render('../html/search.html',{rows:rows, search:search});
        console.log("search page");
        });
    }

});


router.get('/:file/download',function(req,res){
    if(!req.session.name){
        console.log("다운로드실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    filename=req.params.file;
    filepath=__dirname+'/upload/'+filename;
    res.download(filepath);
    }
});

});

module.exports =function(app){
   return router ;  
}