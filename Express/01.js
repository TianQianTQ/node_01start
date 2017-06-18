//write
var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html',(req,res)=>{
	res.writeHead(200,{'Content-type':'text/html'});
	res.write('<head><meta charset="utf-8"/></head>');
	res.end('你好');
});
app.listen(8888,'127.0.0.1');