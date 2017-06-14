var http = require('http');
var express = require('express');
var sio = require('socket.io');
var app = express();
var server = http.createServer(app);
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

server.listen(8888);
var socket = sio.listen(server);
socket.on('connection',(socket)=>{
    socket.emit('news',{hello:'你好'});
     socket.on('my other event',(data)=>{
        console.log('服务器端接收到数据：%j',data);
    });
});
