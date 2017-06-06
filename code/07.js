/**
 * Created by 田倩 on 2017/6/6.
 */
/*第二天代码总结*/
//创建一个新的线程
/*var delegte = () =>{
     for(var i=0;i<10000000;i++){
     }
};
//var thread=new Thread(delegte);
var thread = new Thread(delegte);    //不规范
thread.execute();
console.log('end');*/

//node如何充分利用单线程
/*
//====>eg1
const fs=require('fs');
console.time('timer');
//判断是否存在list文件
fs.stat('./list.md',(err,stats)=>{
    if(err){
        console.log('文件不存在');
        //创建    fs.writeFile('文件名或文件描述符','传入的数据（默认编码格式utf8）',[options]{encoding mode flag},calback);
        //异步地写入数据到文件，如果文件已经存在，则替代文件。
        fs.writeFile('./list.md',new Date(),(err)=>{
            if(err){
                console.log(err);
                return false;
            }
            console.log('文件创建成功');
        });
        return false;
    }
    //存在删除
    fs.unlink('./list.md',(err)=>{
        if(err){
            console.error(err);
            return false;
        }
        //存在删除
        fs.writeFile('./list.md',new Date(),(err)=>{
            if(err){
                console.error(err);
                return false;
            }
            console.log('文件删除后创建成功');
        });
    });
});
console.timeEnd('timer');
//====>eg2
const fs=require('fs');
console.time('timer');
function foo(value,callback){
    callback(null,value%2);
}
fs.stat('./a.txt',function statCallback1(err,stat){
    if(sat){
        foo(stat.size,function sizeCallback(error,evenorodd){
            console.log(evenorodd);
        });
    }
});
fs.stat('./b.txt', function statCallback2(err, stat) {
    if (stat) {
        fs.readFile('./b.txt', function readFileCallback2(err, content) {
            console.log(content);
        });
    }
});
console.timeEnd('timer');*/
//事件队列
/*fs.stat(a)  阻塞
statCallback1
fs.stat(b)  阻塞
statCallback1*/

//Node开发服务器的阻塞情况
//小demo：v8对ES6的支持情况：根本不支持    直接支持    严格模式支持
// let   const    var区别
/*'use strict';
const http = require('http');
let count = 0;
const server=http.createServer((request,response)=>{
    response.write(`你是第${count++}个访问用户`);
    if(count === 10){
        while(true){}
    }
    response.end();
});
server.listen(2080,(error)=>{
    if(error) throw error;
    console.log('成功启动web服务器，端口2080');
});
*/
//小demo=======>实现命令行计算器
//输入格式   node 07 2 + 3
/*const args = process.argv.slice(2);
if(args.length != 3){
    console.log('参数不合法');
    throw new Error('输入不合法');
}
let parameter1 = args[0];
let operator = args[1];
let parameter2 = args[2];
//进行计算
let result;
switch(operator){
    //case '+':result = parameter1 + parameter2 ;
      //       break;
    case '+':result = parseFloat(parameter1) + parseFloat(parameter2);
             break;
    case '-':result = parseFloat(parameter1) - parseFloat(parameter2);
             break;
    case '*':
    case 'x':result = parseFloat(parameter1) * parseFloat(parameter2);
             break;
    case '/':
    case '÷':result = parseFloat(parameter1) / parseFloat(parameter2);
             break;
    defalut:throw new Error('不支持该操作符'+operator);
}
console.log(result);
//改进：可实现计算器抽象模块(switch)
 //接收参数
const args = process.argv.slice(2);
//分析参数
if(args.length !== 3){
    console.log('参数不合法');
    throw new Error('参数不合法');
}
let parameter1 = args[0];
let operator = args[1];
let parameter2 = args[2];
//进行运算
const calc = require('./module/calculator.js');
let result;
switch (operator) {
    case '+':
        result = calc.add(parameter1, parameter2);
        break;
    case '-':
        result = calc.subtract(parameter1, parameter2);
        break;
    case '*':
    case 'x':
        result = calc.mutiply(parameter1, parameter2);
        break;
    case '/':
    case '÷':
        result = calc.divide(parameter1, parameter2);
        break;
    default:
        throw new Error('不被支持的操作符' + operator);
}
console.log(result);

//关于模块
if(module.parent){
    //当前这个文件是被别的文件加载
}else{
    //入口文件
}*/


//模块的缓存
//自己写一个require函数
'use strict';
function $require(id){
    const fs=require('fs');
    const path=require('path');
    const filename=path.join(__dirname,id);
    $require.catch=$require.cache || {};
    if($require.cache[filename]){
        return $require.cache[filename].exports;
    }
    //没有缓存，第一次
    const dirname=path.dirname(filename);

}
