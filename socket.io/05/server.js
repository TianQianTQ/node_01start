var http = require('http');
var express = require('express');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

server.listen(8888);
var io = sio.listen(server);
var names = [];
io.sockets.on('connection',(socket)=>{
    socket.emit('login',names);    //向客户端发送login事件，并发送所有用户名
    socket.on('login',(name)=>{    //客户端发送过来的Login事件
        names.push(name);
    });
    io.sockets.emit('login',names);//向所有用户发送login事件
    //以上代码等效于以下两行代码
    //socket.emit('login',names);
    //socket.broadcast.emit('login',names);
});
