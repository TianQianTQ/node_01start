var http = require('http');
var sio = require('socket.io');
var fs = require('fs');
var server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-type':'text/html'});
    res.end(fs.readFileSync('./index.html'));
});
server.listen(8888);
var socket = sio.listen(server);
socket.on('connection',(socket)=>{
    socket.emit('news',{hello:'你好'});
    socket.on('my other event',(data)=>{
       console.log('服务端接收到数据：%j',data);
    });
});
