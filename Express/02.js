//send方法
var http = require('http');
var app = express();
app.get('/index.html',(req,res)=>{
	res.send('你好');
});
app.listen(8888,'127.0.0.1');