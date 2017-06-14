//使用命名空间
var http = require('http');
var express = require('express');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

server.listen(80);
var io = sio.listen(server);
var chat = io.of('/chat').on('connection',(socket)=>{
    socket.send('欢迎访问chat控件');
    socket.on('message',(msg)=>{
        console.log('chat命名空间接收到消息:',msg);
    });
});
var news = io.of('/news').on('connection',(socket)=>{
    socket.emit('send message','欢迎访问news空间');
    socket.on('send message',(data)=>{
        console.log('news命名空间接收到send message消息,数据为:',data);
    });
});