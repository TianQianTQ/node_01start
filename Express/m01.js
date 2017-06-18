//mysql数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	database:'mysql',
	user:'root',
	password:'111111',
});
connection.connect((err)=>{
	if(err) console.log('与MySQL数据库建立连接失败'+err);
    else{
    	console.log('数据库建立成功');
    	connection.end((err)=>{
    		if(err) console.log('关闭数据库失败');
    		else{
    			console.log('关闭成功');
    		}
    	});
    }
});
//mysql数据库操作
//查看当前数据库 show databases;
//显示host,user  select host,user from mysql.user;