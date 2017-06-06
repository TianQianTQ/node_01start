/**
 * Created by 田倩 on 2017/6/5.
 */
/*第一天代码总结*/
/**/

/*    var argv=process.argv;
    console.log(argv);
//小知识扩充：
// argv 返回一个数组，
//slice(start,[end]);返回一个新的数组。
var argvs = process.argv.slice(2);
switch (argvs[0]) {
    case 'init':
         console.log('你需要INIT');
         break;
    case 'install':
         var installPackageName = argvs[1];
         console.log('你在安装'+installPackageName);
         break;
}*/


//输入输出流(后续补充)
process.stdout.write('hello world');
//模板字符串
var msg = 'hello';
var number = 1;
process.stdout.write(`${msg} world ${number}`);

//小demo ==》切换动画
var frames=[];
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
//当前显示哪一帧
var current = 0;
//替换的时间
var fps = 10;
var render = () => {
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');
    if(current === frames.length) current=0;
    process.stdout.write(frames[current++]);
};
setInterval(render,1000/fps);

var fs = require('fs');
var frames = [];
for(var i = 1; i < 7; i++){
    frames[frames.length]=fs.readFileSync(`./frames/${i}.txt`, 'utf8');
}
var fps = 10;
var current = 0;
var render = () =>{
    //将当前控制台内容清空
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');
    //输入新的内容

  if(current === frames.length)  current=0;
    process.stdout.write(frames[current++]);
};
setInterval(render,1000/fps);

//process.stdin.setEncoding('utf8');
//process.stdin.on('readable',()=>{
//    var chunk = process.stdin.read();
//    if(chunk !== null) {
//        process.stdout.write(`data: ${chunk}`);
//    }
//});

//小demo ==》简单模拟用户登录
var users = {
    'admin': '123',
    'user1': '321',
    'user2': '213'
};
process.stdout.write('请输入用户名');
var isInputUsername = true;
var username='';
process.stdin.on('data',(input)=>{
    //input实质是一个流（二进制数组）
    input=input.toString().trim();
    if(!username){
        if(Object.keys(users).indexOf(input) === -1) {
            process.stdout.write('用户名不存在'+'\n');
            process.stdout.write('请输入用户名'+'\n');
            username='';
        }else{
            process.stdout.write('请输入密码');
            username = input;
        }
    }else{
        //传入的是密码
        if(input === users[username]){
            console.log('登陆成功');
        }else{
            process.stdout.write('请输入密码'+'\n');
        }
    }
});

/*//回调函数
function getFileAsync(path, callback){
    if(error){
        callback(new Error('xxx错误'));
    }else{
        callback(null,data);
    }
}

//小demo ==》判断一个数的奇偶性
function isEvenOrOdd(number,callback){
    if(typeof(number) === 'number'){
        if(number % 2){
            callback(null,'当前传入的数是奇数');
        }else{
            callback(null,'当前传入的数是偶数');
        }
    }else{
        throw new Error('你传入的不是数字');
        callback(new Error('你传入的不是数字'));
    }
}

isEvenOrOdd('sdf',(error,data)=>{
        if(error) throw error;
        console.log(data);
});*/

