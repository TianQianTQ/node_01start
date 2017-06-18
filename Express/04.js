//在路由中使用正则表达式
var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html/:id?/:name?',(req,res)=>{
	var str = "";
	if(req.params.id)  str +="ID参数值："+req.params.id;
	if(str!='')   str += '<br/>';
	if(req.params.name) str += "name参数值："+req.params.name;
	res.send(str);
});
app.listen(8888,'127.0.0.1');
//http://localhost:8888/index.html/1001/qq