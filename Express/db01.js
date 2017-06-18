var mongo = require('mongodb');
var host = 'localhost';   //服务器所在地址
//var port = mongo.Connection.DEFAULT_PORT;  //整数值，指定服务器端口号
var port = 27017;
var server = new mongo.Server(host,port,{auto_reconnect:true});
//auto_reconnect 属性值为一个布尔值，当值为true时，
//在客户端与服务端连接过程发生错误时自动重新建立连接。默认属性值为false

//var db = new mongo.Db(databaseName,server,[options]);
//safe:属性值为布尔值，当属性值为true时，
//使用getLastError命令执行数据的存取操作，该命令返回存取操作的执行结果，默认属性值为false
var db = new mongo.Db('node-mongo-examples',server,{safe:true});
db.open((err,db)=>{
	if(err) throw err;
	else{
		console.log('成功建立连接');
		db.close();
	}
});
db.on('close',(err,db)=>{
	if(err) throw err;
	else console.log('成功关闭数据库');
});