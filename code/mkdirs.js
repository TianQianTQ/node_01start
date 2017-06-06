/**
 * Created by 田倩 on 2017/6/8.
 */
//创建文件目录
 //  创建文件   定义模块成员  导出模块成员  载入模块  使用模块
 function mkdirs(pathname,callback){
     //module.parent拿到的是调用我的对象
     var root = path.dirname(module.parent.filename);
    //判断传入路径
    pathname = path.isAbsolute(pathname) ? pathname :path.join(__dirname,pathname);
    //获取要创建的部分
    // pathname = pathname.replace(__dirname,'');
    var relativepath = path.relative(root,pathname);
     // 获取当前操作系统中默认用的路径成员分隔符 windows:\ linux:/
    var folders = relativepath.split(path.sep);
     //如['demo2','demo3']
    try{
     var pre = '';
     folders.forEach(forder => {
      try{
       fs.statSync(path.join(root,pre,folder));
      }catch(error) {
       fs.mkdirSync(path.join(root, pre, folder));
      }
      pre = path.join(pre,folder);    //demo2/
     });
     callback && callback(null);
    }catch(error){
     callback && callback(error);
    }
}
module.exports = mkdirs;