//设置路由
var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html/:id/:name',(req,res)=>{
	var str = "";
	for(key in req.params){
		if(str!='')  
			str += '<br/>';
		str += "参数名："+key;
		str += String.fromCharCode(9)+"参数值:"+req.params[key];
	}
	res.send(str);
});
app.listen(8888,'127.0.0.1');
//http://localhost:8888/index.html/1001/qq