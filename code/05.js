/**
 * Created by 田倩 on 2017/5/24.
 */
/*打印目录树*/
//检查一个文件存在与否且不操作它使用fs.access()
   const fs=require('fs');
   const path=require('path');
   require('../proto.js');
   var target=path.join(__dirname,process.argv[2]||'./');
   fs.readdir(target,(err,files)=>{
       files.forEach((file)=>{
           console.time('file');
           fs.stat(path.join(target,file),(err,stats)=>{
               console.log(`${stats.mtime.format('yyyy/MM/dd HH:mm')}\t${stats.size}\t${file}`);
               console.timeEnd('file');
           });
       });
   });