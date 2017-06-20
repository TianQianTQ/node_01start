//delete方法
//app.delete(path,callback);
//注：指定表时需指定哪个数据库的表    test.users;

var express = require('express');
var fs = require('fs');
var app = express();
var mysql = require('mysql');
var pool = mysql.createPool({
	host:'localhost',
	port:3306,
	basename:'test',
	user:'root',
	password:'111111',
});
app.get('/index8.html',(req,res)=>{
	res.sendFile(__dirname+'/index8.html');
});
app.delete('/index8.html',(req,res)=>{
	req.on('data',(data)=>{
		var obj = JSON.parse(data.toString());
		pool.getConnection((err,connection)=>{
			if(err) {res.send('与MySQL数据库连接失败');
	            console.log(err);
	        }
			else{
				var str='';
				connection.query('DELETE FROM test.users where username=? and firstname=?',
					[obj.username,obj.firstname],
					(err,result)=>{
						if(err){
							console.log(err);
							str='在服务器中删除数据失败';
						} 
						else str='在服务端MySQL数据库中删除数据成功';
						connection.release();
						res.send(str);
					});
			}
		});
	});
});
app.listen(1337,'127.0.0.1');