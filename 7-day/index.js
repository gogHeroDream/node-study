const mysql= require('mysql')
const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  port: '3306',
  password: '123456',
  database:'nodebase'
})
// 开始连接
connection.connect();
// 引入核心模块
const http=require('http');
const url=require('url');
const qs = require('querystring');
http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  if(req.method=='POST') {
    console.log('post 请求')
    let pathName=req.url;
    let tempResult='';
    req.addListener('data',function(chunk){
      tempResult+=chunk;
      // console.log(chunk)
    });
    req.addListener("end",function(){
      var result = JSON.stringify(qs.parse(tempResult));
      // console.log(tempResult,qs.parse(tempResult),result);
      if(pathName=='/sendMessage') {
        console.log('提交留言信息');
      } else if(pathName=='/login') {
        console.log('登录')
      }else if(pathName=='/register') {
        console.log('注册')
      }
      const endData={code: '1',message: '成功'}
      res.write(JSON.stringify(endData));
      res.end();
    })
  }else if(req.method=='GET') {
    console.log('get请求')
    let pathName=url.parse(req.url).pathname;
    console.log("接口为"+pathName);
    if(pathName=='/') {
      res.writeHead(200,{
        "Content-Type": "text/html;charset=UTF-8"
      });
      res.write(
        '<h1 style="text-align:center">jsliang 前端有限公司服务已开启！</h1>' +
        '<h2 style="text-align:center">' +
        '详情可见：' +
        '<a href="https://github.com/LiangJunrong/document-library/blob/master/other-library/Node/NodeBase.md" target="_blank">Node 基础</a>' +
        '</h2>' + ''
        )
      res.end();
    }
  }
}).listen(18006)

// 获取当前时间
function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var strDate = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minute = date.getMinutes(); // 分
  var second = date.getMinutes(); // 秒
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  // 返回 yyyy-mm-dd hh:mm:ss 形式
  var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
  return currentdate;
}
