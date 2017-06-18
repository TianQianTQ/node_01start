//在mongodb中删除与更新数据
/*更新
  1、mongo.update(selector,document,[options],[callback]);    eg:1
  document:对象，用于指定用来更新的数据文档
  options:
          multi:布尔值 默认为false(只更新第一条符合查询条件的数据文档)
          upsert:布尔值，用于指定是否在更新数据时执行upsert操作，默认为false

  $set原子操作符

                                                               eg:2
  2、使用collection.findAndModify(selector,sort,document,[options],callback);
  sort:数组，指定当存在多条符合查询条件的数据文档时这些数据文档的排序方式
        包含两个元素【用于排序的字段名，1/-1】
  options:
        new:布尔值，为true时查询结果返回更新后的数据，默认为false
*/
/*
    删除  
   1、 collection.remove([selector],[options],[callback]);         eg:3
    options:
            single:布尔值，默认为false，用于指定是否只删除第一条满足查询条件的数据文档
   2、collection.findAndRemove(selector,sort,[options],callback);  eg:4
*/

/*eg:1  update方法的使用示例
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open((err,db)=>{
    db.collection('users',(err,collection)=>{
        if(err) throw err;
        else{
            //collection.update({},{username:'test',firstname:'test'},(err, result)=>{ 
            //collection.update({},{$set:{username:'test',firstname:'test'}},{multi:true},(err,result)=>{ 
            collection.update({username:'aaa'},{username:'aaa',firstname:'aaa'},{upsert:true},(err, result)=>{ 
                if(err) throw err;
                else{  
                    console.log('成功更新%d条数据文档',result);
                    collection.find({}).toArray((err, docs)=>{ 
                        if(err) throw err;
                        else{  
                            console.log('更新后的数据：');
                            console.log(docs);
                            db.close();
                        }
                    });
                }
            });
        }
    });
});*/

/*eg:2  findAndModify方法使用

var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
var docs=[{type:'food',price:11},
          {type:'food',price:10},
          {type:'food',price:9},
          {type:'food',price:8},
          {type:'book',price:9}];
db.open(function(err,db) {
    db.collection('goods',(err,collection)=>{
        collection.insert(docs,(err, docs)=>{
            if(err) throw err;
            else{         
               collection.findAndModify({type:'food'},[['type',1],['price',-1]],{type:'food',price:100},{new:true},(err, doc)=>{ 
                    if(err) throw err;
                    else{  
                        console.log(doc);
                        db.close();
                    }
                });
            }
        });
    });
});
*/

/*eg:3   remove使用方法
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open((err,db)=>{
    db.collection('users',(err,collection)=>{
        if(err) throw err;
        else{
            //collection.remove({username:'aaa'},(err,result)=>{ 
            collection.remove({username:'test'},{single:true},(err,result)=>{ 
                if(err) throw err;
                else{  
                    console.log('成功删除 %d 条数据文档',typeof(result));
                    collection.find({}).toArray((err, docs)=>{ 
                        if(err) throw err;
                        else{  
                            console.log('删除后的数据：');
                            console.log(docs);
                            db.close();
                        }
                    });
                }
            });
        }
    });
});
*/

/*eg:4    findAndRemove
var mongo = require('mongodb');
var host = "localhost";
var port = 27017;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
var docs=[{type:'food',price:11},
          {type:'food',price:10},
          {type:'food',price:9},
          {type:'food',price:8},
          {type:'book',price:9}];
db.open((err,db)=>{
    db.collection('goods21',(err,collection)=>{
        collection.insert(docs,(err,docs)=>{
            if(err) throw err;
            else{         
               collection.findAndRemove({type:'food'},[['type',1],['price',-1]],(err,doc)=>{ 
                    if(err) throw err;
                    else{  
                        console.log(doc);
                        db.close();
                    }
                });
            }
        });
    });
});
*/