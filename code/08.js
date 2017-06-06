/**
 * Created by 田倩 on 2017/6/6.
 */
    //模块引入
    //http 模块负责创建 Web 服务器及 HTTP 相关服务，url 模块负责解析 URL 地址，querystring 模块负责处理请求参数
var http=require('http');
var url=require('url');
var qs=require('querystring');
    //数据存储    这里为了方便，使用全局变量 proverbs存储已有谚语，在正式的应用中，应该考虑使用文件或数据库存储。
var proverbs=[
    "The turtle wins the race.",
    "God hides in the details.",
    "There are two ways to write error-free programs; only the third one works.",
    "Perfect practice makes perfect."
];
    //创建web服务器
http.createServer(onRequest).listen(8888);
console.log('server is running...');
    //请求处理函数        该函数负责分发请求，将接收到的 URL 根据规则转发至对应的请求处理模块。
function onRequest(request,response){
    var pathname=url.parse(request.url).parsename;
    console.log('Request for '+pathname + 'received.');
    if(pathname === '/'||pathname ==='/index'||pathname ==='/proverb'){
        getProverb(response);
    }else if(pathname === '/add'){
        if(request.method.toLowerCase() == 'post'){
            var body = '';
            request.on('data',function(data){
                body+=data;
            })
            request.on('end',function(){
                var POST=qs.parse(body);
                add(POST.text,response);
            });
        }else{
            addProverb(response);
        }
    }else{
        response.writeHead(404,{
            "Content-Type":"text/plain"
        });
        response.write('404 Not found');
        response.end();
    }
}
//get请求
//该函数负责处理 GET 请求，随机向用户返回一条谚语。细心的读者可能会发现该函数将 HTML，CSS 以及数据混在一起，
// 显然不符合 MVC 的编程模式。Node.js 有很多第三方开发的模块，其中 express就是一款优秀的 Web 开发框架，有兴趣的读者可以研究一下。
function getProverb(response){
    var body = '<html>'
        + '<head>'
        + '<meta http-equiv="Content-Type" content="text/html; '
        + 'charset=UTF-8" />'
        + '</head>'
        + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
        + '<blockquote>'+ proverbs[Math.floor(Math.random()* proverbs.length)]
        + '</blockquote>' + '</body>'
        + '</html>';

    response.writeHead(200, {
        "Content-Type" : "text/html"
    });
    response.write(body);
    response.end();
}
//用户输入表单
//该函数返回一个 HTML 表单，允许用户输入自己喜欢的谚语或格言。
function addProverb(response){
    var body = '<html>'
        + '<head>'
        + '<meta http-equiv="Content-Type" content="text/html; '
        + 'charset=UTF-8" />'
        + '</head>'
        + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
        + '<form action="/add" method="post">'
        + '<textarea name="text" rows="10" cols="60"></textarea><p>'
        + '<input type="submit" value="Submit" />' + '</form>' + '</body>'
        + '</html>';

    response.writeHead(200, {
        "Content-Type" : "text/html"
    });
    response.write(body);
    response.end();
}
//POST请求
function add(proverb, response) {
    proverbs.push(proverb);

    var body = '<html>'
        + '<head>'
        + '<meta http-equiv="Content-Type" content="text/html; '
        + 'charset=UTF-8" />'
        + '</head>'
        + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
        + '<blockquote>' + proverb + '</blockquote>' + '</body>'
        + '</html>';

    response.writeHead(200, {
        "Content-Type" : "text/html"
    });
    response.write(body);
    response.end();

}
//该函数负责用户的 POST 请求，将用户输入保存到服务器端，并返回给用户结果。