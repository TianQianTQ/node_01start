/**
 * Created by 田倩 on 2017/5/31.
 */
const fs=require('fs');
const path=require('path');
const marked=require('marked');
//接收需要转换的文件路径
const target = path.join(__dirname,process.argv[2] || '../README.md');
//监视文件变化
fs.watchFile(target,{interval:200},(curr,prev)=>{
   //console.log(`current:${curr.size};previous:${prev.size}`);
    //判断文件到底有没有变化    time
    if(curr.mtime===prev.mtime){
        return false;
    }
    //读取文件，转换为新的HTML
    fs.readFile(target,'utf8',(err,content)=>{
        if(err){
            throw err;
        }
        var html=marked(content);

        fs.readFile(path.join(__dirname,'github.css'),'utf8',(err,css)=>{
            html = template.replace('{{{content}}}',html).replace('{{{styles}}}',css);
            fs.writeFile(target.replace(path.extname(target),'.html'),html,'utf8',(err)=>{
                console.log('updated@'+new Date());
            });
        });

      //  console.log(html);

    });
});
var template=`
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<style>{{{styles}}}</style>
		<title></title>
	</head>
	<body>
	  <div class="vs">
	       {{{content}}}
	  </div>
	</body>
</html>
`;