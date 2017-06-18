//插入数据
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
db.open((err,db)=>{
	db.collection('users',(err,collection)=>{
		collection.insert({username:'张三',firstName:'张'},(err,docs)=>{
			console.log(docs);
			db.close();
		});
	})
});  