/**
 * Created by 田倩 on 2017/5/20.
 */
/*异步回调    错误优先*/
/*node    多线程部分*/
// Node如何充分利用单线程

/*const fs = require('fs');

console.time('timer');

// 判断是否存在list文件
fs.stat('./list.md', (err, stats) => {
    if (err) {
        console.log('文件不存在');
        // 创建
        fs.writeFile('./list.md', new Date(), (err) => {
            if (err) {console.error(err);return false;}
            console.log('文件创建成功');
        });
        return false;
    }
    // 存在删除
    fs.unlink('./list.md', (err) => {
        if (err) {console.error(err);return false;}
        // 创建
        fs.writeFile('./list.md', new Date(), (err) => {
            if (err) {console.error(err);return false;}
            console.log('文件删除后创建成功');
        });
    });
});

console.timeEnd('timer');*/
/*事件队列*/
// Node开发服务器的阻塞情况
/*'use strict';
// V8 对 ES6支持情况分为三个级别：根本不支持，直接支持，严格模式支持
const http=require('http');
let count=0;
const server=http.createServer((request,response)=>{
     response.write(`你是第${count++}个访问用户`);
    response.end();
});
server.listen(2080,(error)=>{
    if(error){
        throw error;
    }
    console.log('成功启动web服务,端口2080');
});*/

//实现命令行计算器
/*'use strict';
const args=process.argv.slice(2);
if(args.length!==3){
    console.log('参数不合法');
    throw new Error('参数不合法');
}
let parameter1=args[0];
let operator=args[1];
let parameter2=args[2];
let result;
switch(operator){
    case '+':
        result=parseFloat(parameter1)+parseFloat(parameter2);
        break;
    case '-':
        result=parseFloat(parameter1)-parseFloat(parameter2);
        break;
    case '*':
    case '×':
        result=parseFloat(parameter1)*parseFloat(parameter2);
        break;
    case '/':
    case '÷':
        result=parseFloat(parameter1)/parseFloat(parameter2);
        break;
    default:
        throw new Error('不被支持的操作符'+operator);
}
console.log(result);*/
//导入模块实现命令行计算器





























