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
/*
const fs=require('fs');
const path=require('path');
console.time('sync');
try{
    var data = fs.readFileSync(path.join('文件路径'));
}catch(error){
    throw error;
}
console.timeEnd('sync');
console.time('async');
fs.readFile(path.join('文件路径'),(error,data)=>{
    if(error){
        throw nee Error;
    }
});
console.timeEnd('async');

//读取文件
const fs=require('fs');
const path=require('path');
fs.readFile(path.join('文件路径'),(error,data)=>{
    console.log(data);   //此处的data是一个buffer(缓冲区)
});
//读取图片
fs.readFile(path.join('文件路径'),(error,data)=>{
    console.log(data.toString('base64'));
});
//文件编码问题   -》引入新模块   iconv
const fs=require('fs');
const path= require('path');
const iconv = require('iconv-lite');
fs.readFile(path.join('文件路径'),(error,data)=>{
    console.log(iconv.decode(data,'gbk'));
});
*/

//动态显示歌词
//小知识扩充：//exec(未找到返回null,找到返回一个数组，【匹配的字符串，匹配的各个分组】)
/*const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
fs.readFile(path.join(__dirname,'./../lyrics/血染的风采.lrc'),(error,data)=>{
    //按行分割
    var lines = iconv.decode(data,'gbk').split('\n');
    // [00:32.67] 也许我告别 将不再回来
    var regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
    var begin = new Date().getTime();   //去掉延时
    lines.forEach((line)=>{
        var matches = regex.exec(line);
        if(matches){
            var m = parseFloat(matches[1]);
            var s = parseFloat(matches[2]);
            var f = parseFloat(matches[3]);
            var lyric = matches[4];
            var offset = new Date().getTime() - begin;
            setTimeout(()=>{
                console.log(lyric);
            },m * 60 * 1000 + s*1000 +f -offset);
        }else{//或者就不是一句歌词，直接打印出来
            console.log(line);
        }
    });
});
//readline动态显示歌词
//pipe导流
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const readline = require('readline');

var filename = path.join(__dirname,'./../lyrics/血染的风采.lrc');
var streamReader = fs.createReadStream(filename).pipe(iconv.decodeStream('gbk'));

//var data = '';
//streamReader.on('data',(chunk)=>{
//    data += chunk.toString();   //chunk只是稳当的一个片段，不完整
//});
//streamReader.on('end',()=>{
//    console.log(data);
//});

var rl = readline.createInterface({input:streamReader});
var begin = new Date().getTime();
rl.on('line',(line)=>{
    task(line,begin);
});
var regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
function task(line, begin) {
    // [00:32.67] 也许我告别 将不再回来
    var matches = regex.exec(line);
    if (matches) {
        var m = parseFloat(matches[1]);
        var s = parseFloat(matches[2]);
        var f = parseFloat(matches[3]);
        var lyric = matches[4]; // 当前行歌词不是立即执行
        // 由于下达输出任务的时刻不同
        var offset = new Date().getTime() - begin;
        setTimeout(() => {
            console.log(lyric);
        }, m * 60 * 1000 + s * 1000 + f - offset);
    } else {
        // 不是一行歌词
        console.log(line);
    }
}*/

//文件写入
//小知识扩充：JSON.stringify  序列化  JSON.parse  反序列化
/*const fs = require('fs');
const path = require('path');
   //fs.writeFile();
//默认覆盖文档
fs.writeFile(path.join(__dirname,'../temp.txt'),JSON.stringify({id:10}),(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success');
    }
});
//fs.createWriteStream()*/

//移动文件  重命名
/*const fs = require('fs');
const path = require('path');
var currentPath = path.join(__dirname,'../temp1.txt');
var targetPath = path.join(__dirname,'../img/temp1.txt');
fs.rename(currentPath,targetPath);*/

//文件追加
/*
const fs = require('fs');
const path = require('path');
setInterval(()=>{
    fs.appendFileSync(path.join(__dirname,'文件地址'),`${new Date}\n`);
},1000);
*/

//打印当前目录所有文件
/*const fs = require('fs');
const path = require('path');
require('./proto.js');    //格式化日期
var target = path.join(__dirname,process.argv[2]||'./');
fs.readdir(target,(err,files)=> {
    files.forEach((file)=>{
        console.time('file');
        //判断当前遍历文件是否存在
        fs.stat(path.join(target,file),(err,stats)=>{
            console.log(`${stats.mtime.format('yyyy/MM/dd HH:mm')}\t ${stats.size}\t ${file}`);
            console.timeEnd('file');
        })
    });
});

//递归目录树
const fs = require('fs');
const path = require('path');
//获取当前有没有传入目标路径
var target = path.join(__dirname,process.argv[2]||'./');

function load(target,depth){
    //depth 0 = '';
    //depth 1 = '|';
    //depth 2 = '| |'
    var prefix = new Array(depth + 1).join('| '); //存储每一级的符号
    var dirinfos = fs.readdirSync(target);
    var dirs = [];
    var files = [];
    dirinfos.forEach(info=>{
        var stats = fs.statSync(path.join(target,info));  //每一个子文件？
        if(stats.isFile()){    //如果是文件
            files.push(info);
        }else{
            dirs.push(info);   //如果是文件夹
        }
    });
    dirs.forEach(dir=>{
        console.log(`${prefix}|-${dir}`);    //连接   树结构
        //当前是一个目录，需要遍历该目录下的文件
        load(path.join(target,dir),depth + 1);
    });
    var count = files.length - 1;
    //当前目录的子文件
    files.forEach(file=>{
        var temp = count--?'├' : '└';
        console.log(`${prefix}${temp}-${file}`);
    });
}
load(target,0);*/

//大文件拷贝

/*const fs = require('fs');
const path = require('path');
const filename ='文件地址';
fs.stat(filename,(err,stats)=>{
    if(err) throw error;
    var streamReader = fs.createReadStream(filename);
    var streamWriter = fs.createWriteStream(filename);
    var total = 0;
    streamReader.on('data',(chunk)=>{
        total += chunk.length;
        console.log(`${total / stats.size *100}%`);   //进度条
        streamWriter.write(chunk);
    }).on('end',()=>{
        process.stdout.write('ok');
    });

});
//文件流的方式复制
const  fs = require('fs');
const path = require('path');
var reader = fs.createReadStream('文件地址1');
var writer = fs.createWriteStream('文件地址2');
fs.stat('文件地址',(err,stats)=>{
    if(stats){
        var readTotal = 0;
        reader.on('data',(chunk)=>{
            writer.write(chunk,(err)=>{
                console.log('写了一点 进度：'+((readTotal += chunk.length)/stats.size*100)+'%');
            });
        });
        reader.on('end',()=>{
            //完毕
        })
    }
});*/
//控制台进度条
var ProgressBar = require('progress');
//[:bar]  占位符
var bar = new ProgressBar('progress:[:bar]',{total:50,width:10,complete:'*'});
var timer = setInterval(function(){
    bar.tick(5);
    if(bar.complete){
       console.log('\ncomplete\n');
        clearInterval(timer);
    }
},100);