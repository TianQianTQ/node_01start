/**
 * Created by 田倩 on 2017/6/10.
 */
//建立socket客户端
const net = require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin,process.stdout);
rl.question('what is your name?',(name)=>{
    name = name.trim();
    if(!name){
        throw new Error('没名字还出来混！！！');
    }
   //创建于服务端
    var server = net.connect({port:2080},()=>{
          //  console.log('已经连接到服务端');

        //登入操作
        var user = {
          procotol:'signin',
          username:name
        };
        server.write(JSON.stringify(user));
        console.log(`welcome ${name} to 2080 chatroom`);
        //监听服务端发过来的消息
        server.on('data',(chunk)=>{
            try{
                var signal = JSON.parse(chunk.toString().trim());
                var procotol = signal.procotol;
                switch(procotol){
                    case 'boardcast':
                        console.log('\nboardcast[' + signal.from + ']> ' + signal.message + '\n');
                        rl.prompt();
                        break;
                    case 'p2p':
                        console.log('\np2p[' + signal.from + ']> ' + signal.message + '\n');
                        rl.prompt();
                        break;
                    default:
                        server.write('功能尚未完善');
                        break;
                }
            }catch(err) {
                server.write('你在干啥，数据错啦');
            }
        }).on('error',(err)=>{       //如果失败抛出异常
            console.log('断开连接');
        });
       //socket.write('world\r\n');   //发给服务端

        rl.setPrompt(name + '> ');    //此时没有写入控制台
        rl.prompt();   //写入控制台
        rl.on('line',(line)=>{
            //chunk:  {"procotol":"boardcast","from":"张三","to":"李四","message":"干什么"}
            line = line.toString().trim();
            var temp = line.split(":");
            var send;
            if(temp.length === 2){   //点对点聊天
                send = {
                    "procotol":"p2p",
                    "from":name,
                    "to":temp[0],
                    "message":temp[1]
                };
            }else{
                send = {
                    "procotol":"boardcast",
                    "from":name,
                    "message":line
                };
            }
            server.write(JSON.stringify(send));
            rl.prompt();
        }).on('close',()=>{
            //关闭
            console.log('Bye bye');
            process.exit(0);
        });
    });
});


