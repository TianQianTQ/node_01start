//mongodb查询
//Collection对象的find方法
//Collection.find(selector,[options])。toArray(callback);
/*selector:参数值为一个对象，用于指定查询数据时使用的查询条件
* options:参数值为一个对象，用于指定查询数据时使用的选项
* find方法返回一个代表游标的Cursor对象，在游标中包含了所有查询到的数据文档信息，
* 可用Cursor对象的Array方法获取所有查询到的数据文档
*/

/*
   1、指定需要查询的字段及字段值
      {<字段名>:<字段值>}
      collection.find({username:'张三'})
   2、制定需要查询的字段并限定字段值范围
      (<字段名>:{$in:[<字段值1>,<字段值2>...]});
      collection.find({username:{$in:['张三','凌牛']}});
   3、type值为'food'且price值<10
      collection.find({type:'food',price:{$lt:10}})
   4、或关系
      collection.find({$or: [ {type:'food'},(或){price: {$lt:10} } ]} );
   5、且与或
      collection.find({type:'food',$or:[{price:11},{priice:{$lt:9}}]});
   6、含有子文档时  						       eg:3
      {<子文档名>:<子文档值>}
      ({goods:{type:'food',price:8}})
      collection.find({'goods.type':'food','goods.price':8});
   7、当一个数据文档的字段值为数组时，             eg:4
      可指定数组的完整内容将该数据文档查询出来
      可单独指定字段值数组中需要包含的某个元素
      collection.find({tags:'citrus'});
      可使用数组的序号精确指定字段值数组中某一个元素的值
      collection.find({'tags.0':'fruit'});
   8、指定某个子数据文档的某个元素的查询条件        eg:5
   9、options:
      fields 显示指定在查询结果中需要包含或排除的字段，属性值为一个对象。
             对象中的数字那个值为1（包含该字段）或0（排除该字段）
             ({username:'张三'},{fields:{username:1}}); //结果中只包含username与id
             ({username:'张三'},{fields:{username:1,id:0}});//结果只包含username
      sort  指定需要排序的字段，属性值为一个数组或对象
            数组：每一个元素为一个数组，该数组包含两个元素（用于排序的字段名，1/-1[1升序]）
            对象：各属性名为用于排序的字段名
            ({},{sort:[['type',1],['price',-1]]});
            ({},{sort:{type:1,price:-1}});
      limit  限定查询结果条数，属性值为一个整数，用来指定查询结果条数
            ({type:'food'},{limit:1});
      skip   限定在从符合查询条件的数据文档中抽取数据文档时需要跳过前面多少条数据文档
             属性值为一个整数，用于指定跳过的数据文档条数
             ({type:'food'},{limit:1,skip:1}); //第二条符合的数据文档
      hint    强迫在查询时利用一个已存在的索引对象   eg:6
      returnKey  指定是否还在查询结果中包含索引字段值
      max    限定在查询结果中索引字段的最大值
      		 ({type:'food'},{max:{price:10}})
      min
      explain   查看在执行一个find方法查询时的详细性能信息   eg:7
                 使用该属性后，find方法并不真正执行数据的查询操作，
                 该方法只返回在查询数据时的性能信息
      raw     指定在查询数据时是否将二进制BSON数据文档存放在缓存区中，然后将该缓存区作为查询结果进行返回
             ({},{raw:true});
      collection的方法：
      findOne(selector,callback);
      默认只返回第一条数据文档
*/
/*eg:1
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples',
	new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
db.open((err,db)=>{
	db.collection('users',(err,collection)=>{
		if(err) throw err;
		else{
			collection.find({username:{$in:['张三','凌牛']}}).toArray((err,docs)=>{
				if(err) throw err;
				else{
					console.log(docs);
					db.close();
				}
			});
		}
	});
});*/
/*eg:2
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples',
	new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
var docs=[{type:'food',price:11},
		  {type:'food',price:10},
		  {type:'food',price:9},
		  {type:'food',price:8},
		  {type:'book',price:9}];
db.open((err,db)=>{
	db.collection('goods',(err,collection)=>{
		// collection.insert(docs,(err,docs)=>{
		// 	if(err) throw err;
		// 	else{
				collection.find({},{sort:{type:1,price:-1}}).toArray((err,docs)=>{
					if(err) throw err;
					else{
						console.log(docs);
						db.close();
					}
				});
			// }
		// });
	});
});*/

/*eg:3
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples',
	new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
var store1 = {name:'store1',goods:{type:'food',price:11}}; 
var store2 = {name:'store2',goods:{type:'food',price:10}}; 
var store3 = {name:'store3',goods:{type:'food',price:9}}; 
var store4 = {name:'store4',goods:{type:'food',price:8}}; 
var store5 = {name:'store5',goods:{type:'book',price:9}}; 
var docs = [store1,store2,store3,store4,store5];
db.open((err,db)=>{
    db.collection('stores',(err,collection)=>{
    	collection.insert(docs,(err,docs)=>{
    		if(err) console.log(err);
    		else{
    			collection.find({goods:{type:'food',price:8}}).toArray((err,docs)=>{
                    if(err)  throw err;
                    else{
                    	console.log(docs);
                    	db.close();
                    }
    			});
    		}
    	})
    });
});*/
/*eg:4
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples',
	new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
var aricle1 = {name:'TV',tags:['device','electric equipment']};
var aricle2 = {name:'apple',tags:['fruit','food','citrues']};
var article3 = {name:'Node.js',tags:['language','web','computer']};
var docs = [aricle1,aricle2,article3];
db.open((err,db)=>{
	db.collection('articles',(err,collection)=>{
		collection.insert(docs,(err,docs)=>{
			if(err) throw err;
			else{
				collection.find({tags:['fruit','food','citrues']}).toArray((err,docs)=>{
					if(err) console.log(err);
					else{
						console.log(docs);
						db.close();
					}
				});
			}
		});
	});
});*/
/*eg:5

var mongo = require('mongodb');
var util = require('util');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples',
	new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
var food1 = {type:'food',price:11};
var food2 = {type:'food',price:10};
var food3 = {type:'food',price:9};
var food4 = {type:'food',price:8};
var foods = [food1,food2,food3,food4];
var store1 = {name:'store1',goods:foods};
var book1 = {type:'book',price:11};
var book2 = {type:'book',price:10};
var book3 = {type:'book',price:9};
var book4 = {type:'book',price:8};
var books = [book1,book2,book3,book4];
var store2 = {name:'store2',goods:books};
var storesArray = [store1,store2];
db.open((err,db)=>{
	db.collection('stores',(err,collection)=>{
		collection.insert(storesArray,(err,docs)=>{
			if(err)  throw err;
			else{
				collection.find({'goods.0.type':'book'}).toArray((err,docs)=>{
					if(err) throw err;
					else{
						console.log(util.inspect(docs,{depth:3}));
						db.close();
					}
				});
			}
		});
	});
});*/
/*eg:6
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open(function(err,db) {
    db.collection('goods',(err,collection) =>{
        if(err) throw err;
        else{
            collection.createIndex({price:1},(err,indexName)=>{
                if(err) throw err;
                else{
                    collection.find({type:'food'},{hint:{price:1}}).toArray((err, docs)=>{
                    //collection.find({type:'food'},{hint:{price:1},returnKey:true}).toArray((err, docs)=>{ 
                    //collection.find({type:'food'},{max:{price:10}}).toArray((err, docs)=>{ 
                    //collection.find({type:'food'},{min:{price:10}}).toArray((err, docs)=>{
                        if(err) throw err;
                        else{  
                            console.log(docs);
                            db.close();
                        }
                    });
                }
            });
        }
    });
});*/
/*eg:7explain属性*/
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open(function(err,db) {
    db.collection('users', function(err,collection) {
        if(err) throw err;
        else{
            collection.find({},{explain:true}).toArray(function(err, docs) {  
                if(err) throw err;
                else{  
                    console.log(docs[0]);
                    db.close();
                }
            });
        }
    });
});




