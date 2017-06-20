//中间件
//function middleware(req,res,next){next()};
//调用   app.use([path],function);
//           1、basicAuth中间件  
// 使用一个具有用户名参数与密码参数的回调函数作为参数，
// 如果该用户名与密码允许访问网站，那么中间件返回true
 var express = require('express');
var app = express();
var basicAuth = require('basic-auth');
var auth = function(req, resp, next) {
	function unauthorized(resp) {
		resp.set('WWW-Authenticate', 'Basic realm=Input User&Password');
		return resp.sendStatus(401);
	}
	var user = basicAuth(req);
	if (!user || !user.name || !user.pass) {
		return unauthorized(resp);
	}
	if (user.name === 'User' && user.pass === 'Password') {
		return next();
	} else {
		return unauthorized(resp);
	}
};
app.get('/auth', auth, function(req, resp) {
	resp.status(200).send('Authorization');
});
app.listen(1024);
console.log('connect to http://localhost:1024/auth');