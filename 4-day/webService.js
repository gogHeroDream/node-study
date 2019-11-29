let http = require('http')
let fs=require('fs')
// 引入 url 模块
let url = require("url");
let path = require("path");
http.createServer((req,res)=>{
  // let pathName=req.url
  // 获取响应路径
  let pathName = url.parse(req.url).pathname;
  // console.log(pathName, req.url)
   // 默认加载路径的处理
  if(pathName=='/') {
    pathName='index.html'
  }
  let extName=path.extname(pathName)
  // favicon的处理
  if(pathName!='/favicon.ico') {
    fs.readFile('./webService/'+pathName,(err,data)=>{
      if(err){
        console.log('404 not find11')
        // debugger
        fs.readFile('./webService/404.html',(errN,dataN)=>{
          if(errN) {
            // console.log('112')
            console.log(errN)
          } else {
            res.writeHead(200,{
              'Content-type':'text/html;charset="utf-8"'
            });
            res.write(dataN)
            res.end()
          }
        })
        return;
      } else {
        // 获取文件类型
        let ext = getExt(extName);
        res.writeHead(200,{
          'Content-Type': ext+';charset="utf-8"'
        })
        res.write(data)
        res.end();
      }
    })
  }
}).listen(18001)
function getExt(extName) {
  // switch(extName) {
  //   case '.html': return 'text/html';
  //   case '.css': return 'text/css';
  //   case '.js': return 'text/js';
  //   default: return 'text/html';
  // }
  let data=fs.readFileSync('./ext.json')
  let ext = JSON.parse(data.toString())
  return ext[extName]
}
