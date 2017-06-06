/**
 * Created by 田倩 on 2017/5/19.
 */

/*process常用成员*/
/*
* argv
* */
var argv=process.argv;
console.log(argv);
    //[ 'C:\\Program Files\\nodejs\\node.exe',
    //'h:\\n_n~_~@_@\\FiveDays\\code\\02.js' ]
    // console.log(argvs.toString());
//参数的前两个参数都没有什么意义
var argvs=process.argv.slice(2);
switch(argvs[0]){
    case'init':console.log('你需要INIT');break;
    case'install':
        var installPackageName=argvs[1];
        console.log('你在安装'+installPackageName);break;
    case'uninstall':console.log('uninstall');break;
}
/*
*   env    获取当前系统的环境变量
* */

/*
*   stdin   stdout    标准输入标准输出
* */
//process.stdout.write('hello node');
//ES6     箭头函数      模板字符串
var log=function(message){
    process.stdout.write(message+'\n');
};
var log1=(message)=>{
    process.stdout.write(message+'\n');
};
//var msg='hello';
//var a=1;
//process.stdout.write(`${msg} world ${a}`);
////此处webstorm需要支持ES6   在设置中找js语言支持修改

//动画       不断切换显示的图形（字符画）    擦除重绘
var frames=[];    //每个成员就是一帧
frames[frames.length] = `
╭~~~╮
(o^.^o)
`;
frames[frames.length] = `
╭~~~╮
(o~.~o)
`;
frames[frames.length] = `
╭~~~╮
(o@.@o)
`;
frames[frames.length] = `
╭ ﹌╮
(o'.'o)
`;
var fps=10;
var current=0;    //当前显示的帧
var render=()=>{
    process.stdout.write('\033[2J');     //控制台清空方法一
    process.stdout.write('\033[0f');
    if(current===frames.length)   current=0;
    process.stdout.write(frames[current++]);
};
//设置定时器
setInterval(render,1000/fps);

/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
                 //两次ctrl+c退出无限循环，终止进程（在控制台）
     //process.exit();    退出程序
   //eg:
   setInterval(()=>{console.log(1)},1000);
   var exiting=false;     //标记当前是否已经按下ctrl+c
   process.on('SIGINT',()=>{
       if(exiting){
           console.log('退出');
           process.exit();
       }else{
           console.log('第一次按下');
           exiting=true;
           setTimeout(()=>{exiting=false},1000);
       }
   });
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

/*^^^^^^模拟用户登录^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });



var users={   //定义用户名和密码
    'admin':'123',
    'user1':'321',
    'user2':'312'
};
//输出第一个问题
process.stdout.write('请输入用户名：\n');
var username='';
process.stdin.on('data',(input)=>{       //接收用户输入
    input=input.toString().trim();       //此处input实质是一个流（二进制数组），且输入最后是一个回车符，需去掉才能比较
    if(!username){
        if(Object.keys(users).indexOf(input)===-1){
            process.stdout.write('该用户名不存在\n');
            process.stdout.write('请重新输入用户名：\n');
            username='';
        }else{
            process.stdout.write('请输入密码：\n');
            username=input;
        }
    }else{
        if(input===users[username]){
            process.stdout.write('登陆成功');
        }else{
            process.stdout.write('请重新输入密码：');
            username='';
        }
    }
});

/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

/*^^^^^^^^^^^^^^^^^^^^判断奇偶     异步操作^^^^^^^^*/
/*代码计时器  console.time('main');  console.timeEnd('main');*/

// 1. 如果函数需要回调参数，一定是在参数的最后出现
// function getFileAsync(path, callback){
//   if(错误){
//     callback(new Error('xxx 错误'));
//   }else{
//     callback(null, data);
//   }
// }

// 2. 错误优先的回调函数
//eg:判断奇偶

    function isEvenOrOdd(number,callback){
        if(typeof number==='number'){
            if(number%2){
                callback(null,'当前传入的是奇数');
            }else{
                callback(null,'当前传入的是偶数');
            }
        }else{
            throw new Error('你传入的不是数字');
            callback(new Error('你传入的不是数字啊'));
        }
    }
    isEvenOrOdd(10,(error,data)=>{
        if(error) throw error;
        console.log(data);
    });
    isEvenOrOdd(11,(error,data)=>{
        if(error) throw error;
        console.log(data);
    });
    isEvenOrOdd('asd',(error,data)=>{
        if(error) throw error;
        console.log(data);
    });
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/














