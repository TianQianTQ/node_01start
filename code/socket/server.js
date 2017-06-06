/**
 * Created by 田倩 on 2017/6/10.
 */
//建立一个Socket服务端
const net = require('net');

var clients = {};   //当前连接用户   键值对集合

var server = net.createServer((socket)=> {
    //socket.address();拿到ip地址
    //console.log(`${socket.remoteAddress}:${socket.remotePort} 进来了`);
    //socket.write发给客户端的消息
    //socket.write(`hello ${socket.remoteAddress}:${socket.remotePort} 你来了`);

    //客户端登录（此时客户端早已连接进来）
    function signin(signal){
        var username = signal.username;
       // clients.push(socket);   //将当前用户加进来
        clients[username] = socket;
        console.log(`welcome ${socket.remoteAddress} to ${port} chatroom 当前在线${Object.keys(clients).length}`);
    }
    //广播消息
    function boardcast(signal) {
        //console.log(signal);
        //广播   用户名  消息
        var username = signal.from;
        var message = signal.message;
        var send = {           //要发给客户端的东西
            procotol: signal.procotol,
            from: username,
            message: message
        };
        for (var username in clients) {
            if (clients.hasOwnProperty(username)) {
                var client = clients[username];
                client.write(JSON.stringify(send));
            }
        }
        //clients.forEach(client=> {
        //    client.write(JSON.stringify(send));
        //});
    }
    // 点对点
        function p2p(signal) {
            // 肯定有用户名和消息
            var username = signal.from;
            var target = signal.to;
            var message = signal.message;
            // 我们要发给客户端的东西
            var send = {
                procotol: signal.procotol,
                from: username,
                message: message
            };
            // 发送消息
            clients[target].write(JSON.stringify(send));
        }

    //有任何客户端发送都会触发
    function receiveClientData(chunk) {
        try {
            var signal = JSON.parse(chunk.toString().trim());
            var procotol = signal.procotol;
            switch (procotol) {
                case 'signin':
                    signin(signal);
                    break;
                case 'boardcast':
                    boardcast(signal);
                    break;
                 case 'p2p':
                   p2p(signal);
                   break;
                // case 'shake':
                //   shake(signal);
                //   break;
                default:
                    socket.write('弄啥咧！你要干的我干不了');
                    break;
            }
        } catch (error) {
            socket.write('弄啥咧！');
        }
    }
    socket.on('data', receiveClientData).on('error', (err) => {
            var deleteKey;
            for (var username in clients) {
                if (clients.hasOwnProperty(username)) {
                    var client = clients[username];
                    if (socket === client) {
                        deleteKey = username;
                    }
                }
            }
            delete clients[deleteKey];
            // clients.splice(clients.indexOf(socket), 1);
            console.log(`${socket.remoteAddress}下线了 当前在线${clients.length}`);
        });
});

//// 触发多次
   // socket.on('data', clientData).on('error', (err)=> {
   //     client.splice(clients.indexOf(socket), 1);
   //     console.log(`${socket.remoteAddress} 下线了 当前在线 ${clients.length}`);
   // });
var port = 2080;
server.listen(port,(err)=>{
    //成功监听 2080 端口过后执行 如果监听失败 （端口被别人占用了）  会有error
    if(err){
        console.log('端口被占用');
        return false;
    }
    console.log(`服务端正常启动监听【${port}】端口`);
});
