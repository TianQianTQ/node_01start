//next使用方法
var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html/:id(\\d+)',(req,res,next)=>{
	if(req.params.id > 10)  next();
	else res.send('id参数值必须大于10');
});
app.get('/index.html/:id(\\d+)',(req,res)=>{
	res.send('你好');
});
app.listen(8888,'127.0.0.1');
//http://localhost:8888/index.html/1