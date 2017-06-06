/**
 * Created by 田倩 on 2017/6/6.
 */
/*第三天代码总结*/
//PATH模块的使用
/*const path=require('path');
const temp = path.join(__dirname,'文件相对路径');
// path.basename(p[, ext])
// console.log(path.basename(temp));
// // 获取文件名
// console.log(path.basename(temp, 'rc'));
// // 获取文件名without扩展名

// path.delimiter

// 获取不同操作系统中默认的路径分隔符 Windows是; Linux是:
// console.log(path.delimiter);
// 获取环境变量
// console.log(process.env.PATH.split(path.delimiter));


// path.dirname(p)

// 获取目录名称
// console.log(path.dirname(temp));


// path.extname(p)

// 获取路径中的扩展名，包含.
// console.log(path.extname(temp));

// path.parse(pathString)

// 将一个路径字符串转换为一个对象（包含文件目录，文件名，扩展名）
//var obj = path.parse(temp);
//console.log(obj);


// path.format(pathObject)

// 将路径对象转字符串

var obj = path.parse(temp);
console.log(path.format(obj));


// path.isAbsolute(path)

// // true
// console.log(path.isAbsolute(temp));
// // true
// console.log(path.isAbsolute('../temp/1.txt'));


// path.join([path1][, path2][, ...])

// 拼合路径组成
// path.join(__dirname, '..', './temp', 'a', '../../1.txt');


// path.normalize(p)

// 常规化一个路径
// var a = path.normalize('C:/dev\\abc//cba////1.txt');
// console.log(a);




// path.relative(from, to)

// console.log(path.relative(__dirname,'C:\\Users\\iceStone\\Desktop\\fed01\\day03\\lyrics\\血染的风采.lrc'));

// 获取to 相对于from的相对路径


// path.resolve([from ...], to)


// console.log(path.resolve(__dirname, '..', './', './code'));

// 与join不同
// console.log(path.resolve(__dirname, 'c:/dev', './', './code'));


// path.sep

// 获取当前操作系统中默认用的路径成员分隔符 windows:\ linux:/
// console.log(path.sep);


// path

// 根据操作系统决定

// path.win32

// 允许在任意操作系统上使用windows的方式操作路径

// path.posix

// 允许在任意操作系统上使用Linux的方式操作路径

// var p = {
//   win32: p
// };
// p.win32 = p;

// console.log(p === p.win32);

// {
//   a

//   var a = 10;
// }


// console.log(p == p.win32);
    */
//同步调用和异步调用

