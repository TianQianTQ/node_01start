/**
 * Created by 田倩 on 2017/5/22.
 */
/*显示歌词*/
// 动态显示歌词

// [00:32.67] 也许我告别 将不再回来
  //1导入模块
/* const fs=require('fs');
 //const iconv=require('iconv-lite');
const iconv = require('iconv-lite');
 const path=require('path');
 fs.readFile(path.join(__dirname,'./../lyrics/血染的风采.lrc'),(error,data)=>{
     var lines=iconv.decode(data,'gbk').split('\n');
     var regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
     var begin=new Date().getTime();
     lines.forEach((line)=>{
         var matches=regex.exec(line);   //exec(未找到返回null,找到返回一个数组，匹配的字符串，匹配的各个分组)
         if(matches){
             var m=matches[1];
             var s=matches[2];
             var a=matches[3];
             var lyric=matches[4];
             var offset=new Date().getTime()-begin;
             setTimeout(()=>{
                 console.log(lyric);
             },m*60000+s*1000+a-offset);
         }else{
             console.log(line);
         }
     });
 });*/
//readline   动态显示歌词
   /* const fs=require('fs');
    const path=require('path');
    const iconv=require('iconv-lite');
    const readline=require('readline');
    var filename = path.join(__dirname, './../lyrics/血染的风采.lrc');
    var streamReader=fs.createReadStream(filename).pipe(iconv.decodeStream('gbk'));
    //利用readline读取
    var rl=readline.createInterface({input:streamReader});
    var begin=new Date().getTime();
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

  const fs=require('fs');
  const path=require('path');
  fs.writeFile(path.join(__dirname,'../temp'),JSON.stringify({id:10}),(err)=>{
      if(err){
          //读取文件不存在报错  意外错误  文件权限问题  文件夹找不到（不会自动创建文件夹）
          console.log(err);
      }else{
          console.log('success');
      }
  });
  fs.writeFilesync();   //同步
   fs.createWriteStream()
   var streamWriter=fs.createWriteStream(path.join(__dirname,'../temp.txt'));
   setInterval(()=>{
       streamWriter.write('hello',()=>{
           console.log('+1');
       });
   },1000);
//fs.appendFile(file, data[, options], callback);
//异步地追加数据到一个文件，如果文件不存在则创建文件。 data 可以是一个字符串或 buffer。
eg:fs.appendFile('message.txt', 'data to append', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
});
//如果 options 是一个字符串，则它指定了字符编码。例如：

fs.appendFile('message.txt', 'data to append', 'utf8', callback);

// JSON.stringify 序列化
// JSON.parse 反序列化















