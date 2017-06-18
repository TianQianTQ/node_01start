//db.close([forceClose],[callback]);
//forceClose值为布尔值，true强制关闭该数据库，且不可再使用open方法打开
                      //false不强制关闭该数据库，可使用open方法打开
/*close方法中forceClose参数值使用方法*/

//###问题：该值true与false效果一样？###
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var server = new mongo.Server(host,port,{auto_reconnect:true});
var db = new mongo.Db('node-mongo-examples',server,{safe:true});
db.open((err,db)=>{
    db.collection('users',(err,collection)=>{
    	collection.insert({username:"张三",firstName:'张'},(err,docs)=>{
    		if(err) throw err;
    		else{
    			console.log(docs);
    			//db.close(true);
                db.close(false,(err)=>{
                   if(err) console.log(err);
                });
    		}
    	});
    });
});                      
db.once('close',(err,db)=>{
	if(err) throw err;
	else{
		db.open((err,db)=>{
			db.collection('users',(err,collection)=>{
				collection.insert({username:"四",firstName:'李'},(err,docs)=>{
					if(err) throw err;
					else{
						console.log(docs);
						db.close(true);
					}
				});
			});
		});
	}
});