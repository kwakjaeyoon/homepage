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
        cb(null,file.originalname+ newDate.toFormat('YYYY-MM-DD HH24 MI'));
    }
});

var upload=multer({storage: storage});




var connection = mysql.createConnection({
    host     : '192.168.99.100',
    user     : 'root',
    password : '123456',
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
        var sql2="select *from lab.category;";
        connection.query(sql2,function(err,rows2){
        connection.query(sql,[id],function(err,rows){
            if(err) console.log(err);
            console.log(id);
            res.render('../html/create_out.html',{rows:rows,rows2:rows2,id:id} );
            console.log("write page");
        });
    });
    }
    });
        



router.post('/write',upload.single('file'),function(req,res){
    if(!req.file){
    var order=req.body.order;
    var username=req.body.username;
    var title=req.body.title;
    var content=req.body.content;
    var date= newDate.toFormat('YYYY-MM-DD HH24 MI');
    var category=req.body.category;
    var sql='INSERT INTO info  VALUES(?,?,?,?,?,?,?,?);';
    var param=[order,username,title,content,date,null,null,category];
    }else{
        var order=req.body.order;
        var username=req.body.username;
        var title=req.body.title;
        var content=req.body.content;
        var file= req.file.originalname+ newDate.toFormat('YYYY-MM-DD HH24 MI');
        var date= newDate.toFormat('YYYY-MM-DD HH24 MI');
        var category=req.body.category;
        var sql='INSERT INTO info  VALUES(?,?,?,?,?,?,?,?);';
        var param=[order,username,title,content,date,null,file,category];
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
    var sql='select * from lab.info ;';
    var sql2='select * from lab.category';
    connection.query(sql2,function(err,rows2){
        connection.query(sql,function(err,rows){
            if(err) console.log(err);
            res.render('../html/read_out.html',{rows:rows, rows2:rows2, page:page, length:rows.length-1, page_num:6, pass:true});
            console.log("list page");
        });
    });    
}
});

router.get('/list',function(req,res){
    res.redirect('./list/1');
});



router.get('/category/:cat_no/:page',function(req,res,next){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    order=req.params.order;
    username=req.body.username;
    title=req.body.title;
    content=req.body.content; 
    cat_no=req.params.cat_no;
    page=req.params.page;
    var sql='select * from lab.info ;';
    var sql2='select * from lab.category';
    connection.query(sql2,function(err,rows2){
        connection.query(sql,function(err,rows){
            if(err) console.log(err);
            res.render('../html/category.html',{rows:rows, rows2:rows2, cat_no:cat_no});
            console.log("category page");
        });
    });    
}
});





router.get('/detail/:board_no/:order',function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    order=req.params.order;
    username=req.body.username;
    title=req.body.title;
    content=req.body.content;
    file=req.body.file;
    comment=req.body.comment;
    date= req.body.date;
    var board_no=req.params.board_no;
    var sql='select * from info';
    var sql2='select *from comment  where `order`=?';

        connection.query(sql,[parseInt(board_no)],function(err,rows){
            connection.query(sql2,[parseInt(order)],function(err,result){
            if(err) console.log(err);
            res.render('../html/detail_out.html',{rows:rows[board_no-1], result:result, board_no:board_no, file:file, id:id});
            console.log("세부정보");
        });
    });
}
});



router.get('/update/:username/:board_no/:order',function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    order=req.body.order;
    title=req.body.title;
    content=req.body.content;
    username=req.params.username;
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
    var sql2= 'delete from comment where `order`=?;';
    var param=[order];

   

        if(id==username ){
            connection.query(sql2 ,param,function(err,rows){
            connection.query(sql,param,function(err,rows){
            if(err) console.log(err);
            fs.unlinkSync(__dirname+'/upload/'+ req.params.file);
            res.redirect('/board/list');
            console.log(rows.affectedRows);
            });
        }); 
        }else{
            res.send('<script>alert("삭제할 수 없습니다.");location.href="/board/list"</script>');
        }
       
});


router.post('/:username/:order/delete',function(req,res){
    var order=parseInt(req.params.order);
    var username= req.params.username;
    var sql='delete  from  info where `order`=?;' 
    var sql2= 'delete from comment where `order`=?;';
    var param=[order];

        if( id==username ){
            connection.query(sql2 ,param,function(err,rows){
                connection.query(sql ,param,function(err,result){
                 if(err) console.log(err);  
                res.redirect('/board/list');
            }); 
        });
        }else{
            res.send('<script>alert("삭제할 수 없습니다.");location.href="/board/list"</script>');
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


router.post('/:id/:order/comment',function(req,res){
    var id=req.params.id;
    var order=req.params.order;
    var comment=req.body.comment;
    var com_no=req.body.com_no;
    var date= newDate.toFormat('YYYY-MM-DD HH24:MI');

    sql='INSERT INTO comment VALUE(?,?,?,?,?);';
    param=[id,order,comment,date,com_no];

    connection.query(sql,param,function(err,rows){
        if(err) console.log(err);
        console.log(param);
        res.redirect('back');
    });
});



router.get('/:id/:com_no/:board_no/:order/comment/update',function(req,res){
    if(!req.session.name){
        console.log("접속실패");
        res.send('<script>alert("로그인 해주세요.");location.href="/login.html"</script>');
    }else{
    order=req.params.order;
    username=req.body.username;
    title=req.body.title;
    content=req.body.content;
    file=req.body.file;
    comment=req.body.comment;
    date= req.body.date;
    board_no=req.params.board_no;
    com_no=req.params.com_no;
    var board_no=req.params.board_no;
    var sql='select * from info';
    var sql2='select *from comment where `order`=?';
        connection.query(sql,[parseInt(board_no)],function(err,rows){
            connection.query(sql2,[parseInt(order),com_no],function(err,result){
            if(err) console.log(err);
            res.render('../html/com_update.html',{rows:rows[board_no-1], result:result, board_no:board_no, file:file, id:id, com_no:com_no});
            console.log("세부정보");
        });
    });
}
});



router.post('/:id/:com_no/:board_no/:order/comment/update',function(req,res){
        var id=req.params.id;
        var order=req.params.order;
        var com_no=req.params.com_no;
        var content=req.body.content;
        var board_no=req.params.board_no;
        comment=req.body.comment;
        var date= newDate.toFormat('YYYY-MM-DD HH24:MI');
        var sql= 'update comment set com_content=?, com_date=?  where `com_no`=?';
        params=[comment,date,com_no];

        connection.query(sql,params,function(err,rows){
            if(err) console.log(err);
            else{
             res.redirect('/board/detail/'+board_no+'/'+order);
             console.log(rows);
        }
        });
});


router.get('/:id/:com_no/:order/comment/delete',function(req,res){
    com_id=req.params.id;
    com_no=req.params.com_no;
    order=req.params.order;
    sql='delete from comment where `com_no`=?';
    var param=[com_no];
 
    if(auth=="admin" || id==com_id ){
        connection.query(sql,param,function(err,rows){
        if(err) console.log(err);
        res.redirect('back');
        console.log(rows.affectedRows);
    });
    }else{
        res.send('<script>alert("삭제할 수 없습니다.");location.href="/board/list"</script>');
    }
});
});



module.exports =function(app){
   return router ;  
}
