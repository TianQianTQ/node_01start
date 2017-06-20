//all方法    app.all(path,callback);
var express = require('express');
var fs = require('fs');
var app = express();
var mysql = require('mysql');
var pool = mysql.createPool({
	host:'localhost',
	port:3306,
	database:'test',
	user:'root',
	password:'111111',
});
app.all('/index.html/:id(\\d+)',(req,res,next)=>{
     pool.getConnection((err,connection)=>{
     	if(err) res.send('与MySQL数据库建立连接失败');
     	else{
     		connection.query('select count(1) count from test.users where id=?',
     			[req.params.id],(err,result)=>{
     				if(err){
     					res.send('在服务端MySQL数据库中查询数据失败');
     					connection.release();
     				}else{
     					connection.release();
     					if(result[0].count>0) next();
     					else res.send('您没有操作数据表的权限');
     				}
     			});
     	}
     });
});
app.get('/index.html/:id(\\d+)',(req,res)=>{
    res.sendfile(__dirname+'/index.html');
});
app.post('/index.html/:id(\\d+)',(req,res)=>{
    req.on('data',(data)=>{
        var obj=JSON.parse(data.toString());
        pool.getConnection((err, connection)=>{
            if(err) res.send('与MySQL数据库建立连接失败。');
            else{
                var str;
                connection.query('update users set username=?,firstname=? where id=?',[obj.username,obj.firstname,req.params.id],function(err,result){
                    if(err) str='在服务器端MySQL数据库中更新数据失败。';
                    else    str='在服务器端MySQL数据库中更新数据成功。';
                    connection.release();
                    res.send(str);
                });
            }
        });
    });
});
app.listen(1337, "127.0.0.1");