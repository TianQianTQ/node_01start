//由于网络中断及数据库服务器断电、崩溃或重启等原因而丢失与数据库服务器之间的连接
var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	database:'mysql',
	user:'root',
	password:'111111',
});
//创建连接池
var pool = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'mysql',
    user:'root',
    password:'111111',
});
function handleDisconnect(){
    connection.connect((err)=>{
        if(err) console.log('与MySQL数据库建立连接失败');
        else{
            console.log('与MySQL数据库建立连接成功');
        }
    });
}
connection.on('err',(err)=>{
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.log('与MySQL数据库之间的连接被丢失');
        setTimeout(()=>{
            handleDisconnect();
        },10000);
    }
    else{
        throw err;
    }
});
handleDisconnect();