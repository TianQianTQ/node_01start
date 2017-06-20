//put方法示例
//app.put(path,callback);
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
app.get('/index1.html',(req,res)=>{
	res.sendfile(__dirname+'/index1.html');
});
app.put('/index1.html',(req,res)=>{
	req.on('data',(data)=>{
		var obj = JSON.parse(data.toString());
		pool.getConnection((err,connection)=>{
			if(err) res.send('与MySQL数据库连接失败');
			else{
				var str;
				connection.query('INSERT INTO USERS SET ?',
					{username:obj.username,firstname:obj.firstname},
					(err,result)=>{
						if(err) str='在服务器端MySQL数据库插入数据失败';
						else str='在服务器端mysql数据库插入数据成功';
						connection.release();
						res.send(str);
					});
			}
		});
	});
});
app.listen(1337,'127.0.0.1');